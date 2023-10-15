/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";

// First, I'll import the useProjectsState custom hook to access projects state.
import { useSportState } from "../../context/sports/context";
import { useTeamState } from "../../context/teams/context";
import { usePreferencesState } from "../../context/preferences/context";
// import { SubmitHandler } from "react-hook-form";
// import { useSportDispatch } from "../../context/sports/context";
// import { usePreferencesDispatch } from "../../context/preferences/context";

export default function PreferenceListItems() {
  let [isOpen, setIsOpen] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const state1: any = useSportState();
  const state2: any = useTeamState();
  const state3: any = usePreferencesState();

  // const dispatchSport = useSportDispatch();
  // const dispatchPrerences = usePreferencesDispatch();

  const { sports, isLoading1, isError1, errorMessage1 } = state1;
  const { teams, isLoading, isError, errorMessage } = state2;
  const { preferences, isLoading2, isError2, errorMessage2 } = state3;

  console.log("preferences in form", preferences);

  useEffect(() => {
    if (preferences && preferences.sports && preferences.teams) {
      setSelectedSports(preferences.sports || []);
      setSelectedTeams(preferences.teams || []);
    }
  }, [preferences]);

  if (sports.length === 0 && isLoading1) {
    return <span>Loading sports...</span>;
  }

  if (teams.length === 0 && isLoading) {
    return <span>Loading teams...</span>;
  }

  if (isError1 || isError) {
    return <span>{errorMessage1 || errorMessage}</span>;
  }

  if (isLoading2) {
    return <span>Loading...</span>;
  }

  if (isError2) {
    return <span>{errorMessage2}</span>;
  }

  const user = localStorage.getItem("userData") ?? "";
  console.log("user", user);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken") ?? "";
    console.log("authToken", token);

    const updatedPreferences = {
      sports: selectedSports,
      teams: selectedTeams,
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
        throw new Error(`Failed to update preferences: ${errorData.message}`);
      }

      console.log("Preferences updated successfully!");
      console.log("selectedSports", updatedPreferences);
      window.location.reload();
    } catch (error: any) {
      console.error("Failed to update preferences:", error.message);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Preferences
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Favorite Sport
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit}>
                      {/* {preferences.sports} */}
                      {sports &&
                        sports.length > 0 &&
                        sports.map((sport: any) => (
                          <div key={sport.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`sport-${sport.id}`}
                              name={`sport-${sport.id}`}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              value={sport.name}
                              onChange={(e) => {
                                const value = e.target.value;
                                setSelectedSports((prev) =>
                                  prev.includes(value)
                                    ? prev.filter((item) => item !== value)
                                    : [...prev, value]
                                );
                              }}
                              checked={selectedSports.includes(sport.name)}
                            />
                            <label
                              htmlFor={`sport-${sport.id}`}
                              className="ml-2 text-gray-700"
                            >
                              {sport.name}
                            </label>
                          </div>
                        ))}
                      <h1>Favourite Teams</h1>

                      {teams.map((team: any) => (
                        <div key={team.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`team-${team.id}`}
                            name={`team-${team.id}`}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            value={team.name}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSelectedTeams((prev) =>
                                prev.includes(value)
                                  ? prev.filter((item) => item !== value)
                                  : [...prev, value]
                              );
                            }}
                            checked={selectedTeams.includes(team.name)}
                          />
                          <label
                            htmlFor={`team-${team.id}`}
                            className="ml-2 text-gray-700"
                          >
                            {team.name}
                          </label>
                        </div>
                      ))}

                      <button
                        type="submit"
                        onClick={closeModal}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
