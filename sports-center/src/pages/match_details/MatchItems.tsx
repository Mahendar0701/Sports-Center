/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useMatchState } from "../../context/match_details/context";
// import { useMatchDispatch } from "../../context/match_details/context";
import { Transition, Dialog } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";

export default function MatchItems() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);

  // Set isOpen to true when component mounts
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const state: any = useMatchState();

  //   const dispatchArticle = useArticleDispatch();

  const { matches, isLoading, isError, errorMessage } = state;
  console.log("matches detailss", matches);
  // console.log(user);

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  //   return (
  //     <>
  //       <div className="member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  //         <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
  //           {state.matches.name}
  //         </h2>
  //         {/* <p className="text-gray-700 dark:text-gray-300 mb-4">
  //             {state.matches.content}
  //           </p>
  //           <p className="text-gray-500 mb-2">
  //             Published Date: {new Date(state.articles.date).toLocaleDateString()}
  //           </p>
  //           <p className="text-gray-500 mb-2">Sport: {state.articles.sport.name}</p>
  //           <p className="text-gray-500 mb-4">Summary: {state.articles.summary}</p>
  //           <div className="thumbnail-container">
  //             <img
  //               src={state.articles.thumbnail}
  //               alt="Thumbnail"
  //               className="thumbnail-image"
  //             />
  //           </div> */}
  //       </div>
  //     </>
  //   );

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
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

              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
