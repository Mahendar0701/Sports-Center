/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useMatchDetailsState } from "../../context/match_details/context";
// import { useMatchDispatch } from "../../context/match_details/context";
import { Transition, Dialog } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";
import { usePreferencesState } from "../../context/preferences/context";
import { API_ENDPOINT } from "../../config/constants";
import { toast } from "react-toastify";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function MatchItems() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string[]>([]);

  // Set isOpen to true when component mounts
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const state: any = useMatchDetailsState();
  const preferencesState: any = usePreferencesState();

  //   const dispatchArticle = useArticleDispatch();

  const { matches, isLoading, isError, errorMessage } = state;
  const { preferences, isLoading2, isError2, errorMessage2 } = preferencesState;
  console.log("matches detailss", matches);
  // console.log(user);

  useEffect(() => {
    if (preferences && preferences.sports && preferences.teams) {
      setSelectedSports(preferences.sports || []);
      setSelectedTeams(preferences.teams || []);
      setSelectedArticle(preferences.articles || []);
      setSelectedMatch(preferences.matches || []);
    }
  }, [preferences]);

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken") ?? "";

    const updatedPreferences = {
      sports: selectedSports,
      teams: selectedTeams,
      articles: selectedArticle,
      matches: selectedMatch,
    };

    try {
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          preferences: updatedPreferences,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save : ${errorData.message}`);
      }

      console.log("saved successfully!");
      console.log("updatedPreferences", updatedPreferences);
      toast.success("Changes Saved successfully!", {
        autoClose: 3000,
      });
      // window.location.reload();
    } catch (error: any) {
      console.error("Failed to save :", error.message);
      toast.error("Changes failed. Please try again.", {
        autoClose: 3000,
      });
    }
  };
  function calculateDuration(
    startDate: string | number | Date,
    endDate: string | number | Date
  ) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const durationInMilliseconds = end - start;
    const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = durationInSeconds % 60;

    return `${hours} hours ${minutes} minutes `;
  }
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10  overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
              {state.isLoading ? (
                <div>Loading...</div>
              ) : state.matches ? (
                <>
                  <h3 className="text-2xl font-bold mb-2">
                    {state.matches.name}
                  </h3>
                  <div className="mb-4">
                    <p className="text-sm text-gray-700">
                      <span>ID:</span> {state.matches.id}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span>Location:</span> {state.matches.location}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span>Starts At:</span>{" "}
                      {new Date(state.matches.startsAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span>Ends At:</span>{" "}
                      {new Date(state.matches.endsAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span>Sport:</span> {state.matches.sportName}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span>Is Running:</span>{" "}
                      {state.matches.isRunning ? "Yes" : "No"}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Score:</h4>
                    <ul className="list-disc list-inside">
                      {Object.entries(state.matches.score).map(
                        ([team, scores]: [any, any]) => (
                          <li key={team} className="text-sm ml-2">
                            {team}: {scores}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Story:</h4>
                    <p className="text-sm">
                      {!showFullStory
                        ? `${state.matches.story
                            .split("\n")
                            .slice(0, 2)
                            .join("\n")}...`
                        : state.matches.story}
                    </p>
                    <button
                      className="text-blue-500 hover:underline mt-2"
                      onClick={() => setShowFullStory(!showFullStory)}
                    >
                      {showFullStory ? "Read Less" : "Read More"}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-red-600 dark:text-red-400">
                  Failed to load article.
                </div>
              )}

              <div className="mt-4 flex justify-center">
                <form>
                  <div className="flex">
                    {isAuthenticated && (
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            value={state.matches.id}
                            className="text-blue-500 focus:ring-blue-500"
                            onChange={(e) => {
                              const value = e.target.value;
                              setSelectedMatch((prev) =>
                                prev.includes(value)
                                  ? prev.filter((item) => item !== value)
                                  : [...prev, value]
                              );
                            }}
                            checked={selectedMatch.some(
                              (id) => id == state.matches.id
                            )}
                          />
                          <span>Save Match</span>
                        </label>
                        <button
                          type="button"
                          className="mx-5 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={handleSubmit}
                        >
                          Save
                        </button>
                      </div>
                    )}
                    <div>
                      <button
                        type="button"
                        className="mx-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
