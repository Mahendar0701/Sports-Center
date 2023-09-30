/* eslint-disable @typescript-eslint/no-explicit-any */
//not using

import React, { Fragment, useEffect, useReducer, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

interface State {
  article: Article | null;
  isLoading: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

interface Article {
  sport: any;
  id: number;
  sportName: string;
  content: string;
  title: string;
  summary: string;
  date: string;
  thumbnail: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "API_CALL_START":
      return { ...state, isLoading: true };
    case "API_CALL_END":
      return { ...state, isLoading: false, article: action.payload };
    case "API_CALL_ERROR":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const ArticleDetails: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Set isOpen to true when component mounts
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }
  const [state, dispatch] = useReducer(reducer, {
    article: null,
    isLoading: false,
  });

  const { articleID } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem("authToken") || "";

      try {
        dispatch({ type: "API_CALL_START" });

        const response = await fetch(`${API_ENDPOINT}/articles/${articleID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(data);
        dispatch({ type: "API_CALL_END", payload: data });
      } catch (error) {
        console.log("Error fetching Article:", error);
        dispatch({ type: "API_CALL_ERROR" });
      }
    };

    fetchArticle();
  }, [articleID]);

  //   return (
  //     <div>
  //       {state.isLoading ? (
  //         <div>Loading...</div>
  //       ) : state.article ? (
  //         <div className="grid gap-4 grid-cols-1 mx-48 mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
  //           <h5 className="text-xl font-medium tracking-tight">
  //             {state.article.sport.name}
  //           </h5>
  //           <h5 className="text-xl font-medium tracking-tight">
  //             {state.article.title}
  //           </h5>
  //           <p className="text-xl  tracking-tight">{state.article.content}</p>
  //           <p className="font-medium tracking-tight">
  //             {new Date(state.article.date).toLocaleDateString("en-US", {
  //               year: "numeric",
  //               month: "short",
  //               day: "2-digit",
  //             })}
  //           </p>
  //           <div className="my-4">
  //             <img
  //               src={state.article.thumbnail}
  //               alt={state.article.title}
  //               className="w-full h-auto rounded-lg max-w-full"
  //             />
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="text-center text-red-600 dark:text-red-400">
  //           Failed to load article.
  //         </div>
  //       )}
  //     </div>
  //   );
  return (
    <>
      {/* <button onClick={openModal} className="bg-blue-500 text-white p-2">
        Open Modal
      </button> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Modal Title
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <div>
                      {state.isLoading ? (
                        <div>Loading...</div>
                      ) : state.article ? (
                        <div className="grid gap-4 grid-cols-1  mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                          <h5 className="text-xl font-medium tracking-tight">
                            {state.article.sport.name}
                          </h5>
                          <h5 className="text-xl font-medium tracking-tight">
                            {state.article.title}
                          </h5>
                          <p className="text-xl  tracking-tight">
                            {state.article.content}
                          </p>
                          <p className="font-medium tracking-tight">
                            {new Date(state.article.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }
                            )}
                          </p>
                          <div className="my-4">
                            <img
                              src={state.article.thumbnail}
                              alt={state.article.title}
                              className="w-full h-auto rounded-lg max-w-full"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-red-600 dark:text-red-400">
                          Failed to load article.
                        </div>
                      )}
                    </div>
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ArticleDetails;
