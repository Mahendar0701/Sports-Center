// /* eslint-disable @typescript-eslint/no-explicit-any */
// //not using

// import React, { Fragment, useEffect, useReducer, useState } from "react";
// import { API_ENDPOINT } from "../../config/constants";
// import { useNavigate, useParams } from "react-router-dom";
// import { Dialog, Transition } from "@headlessui/react";

// interface State {
//   article: Article | null;
//   isLoading: boolean;
// }

// interface Action {
//   type: string;
//   payload?: any;
// }

// interface Article {
//   sport: any;
//   id: number;
//   sportName: string;
//   content: string;
//   title: string;
//   summary: string;
//   date: string;
//   thumbnail: string;
// }

// const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "API_CALL_START":
//       return { ...state, isLoading: true };
//     case "API_CALL_END":
//       return { ...state, isLoading: false, article: action.payload };
//     case "API_CALL_ERROR":
//       return { ...state, isLoading: false };
//     default:
//       return state;
//   }
// };

// interface ArticleDetailsProps {
//   articleSelectId: number | null;
//   isOpen: boolean;
//   closeModal: () => void;
// }
// const ArticleDetails: React.FC<ArticleDetailsProps> = ({
//   articleSelectId,
//   isOpen,
//   closeModal,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Set isOpen to true when component mounts
//   useEffect(() => {
//     setIsOpen(true);
//   }, []);

//   const navigate = useNavigate();

//   function closeModal() {
//     setIsOpen(false);
//     navigate("../../");
//   }
//   const [state, dispatch] = useReducer(reducer, {
//     article: null,
//     isLoading: false,
//   });

//   //   const { articleID } = useParams();
//   const articleID = articleSelectId;

//   useEffect(() => {
//     const fetchArticle = async () => {
//       const token = localStorage.getItem("authToken") || "";

//       try {
//         dispatch({ type: "API_CALL_START" });

//         const response = await fetch(`${API_ENDPOINT}/articles/${articleID}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (isOpen) {
//           fetchArticle();
//         }

//         const data = await response.json();
//         console.log(data);
//         dispatch({ type: "API_CALL_END", payload: data });
//       } catch (error) {
//         console.log("Error fetching Article:", error);
//         dispatch({ type: "API_CALL_ERROR" });
//       }
//     };

//     fetchArticle();
//   }, [articleID, isOpen]);

//   //   return (
//   //     <div>
//   //       {state.isLoading ? (
//   //         <div>Loading...</div>
//   //       ) : state.article ? (
//   //         <div className="grid gap-4 grid-cols-1 mx-48 mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
//   //           <h5 className="text-xl font-medium tracking-tight">
//   //             {state.article.sport.name}
//   //           </h5>
//   //           <h5 className="text-xl font-medium tracking-tight">
//   //             {state.article.title}
//   //           </h5>
//   //           <p className="text-xl  tracking-tight">{state.article.content}</p>
//   //           <p className="font-medium tracking-tight">
//   //             {new Date(state.article.date).toLocaleDateString("en-US", {
//   //               year: "numeric",
//   //               month: "short",
//   //               day: "2-digit",
//   //             })}
//   //           </p>
//   //           <div className="my-4">
//   //             <img
//   //               src={state.article.thumbnail}
//   //               alt={state.article.title}
//   //               className="w-full h-auto rounded-lg max-w-full"
//   //             />
//   //           </div>
//   //         </div>
//   //       ) : (
//   //         <div className="text-center text-red-600 dark:text-red-400">
//   //           Failed to load article.
//   //         </div>
//   //       )}
//   //     </div>
//   //   );
//   return (
//     <>
//       {/* <button onClick={openModal} className="bg-blue-500 text-white p-2">
//         Open Modal
//       </button> */}

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-10 overflow-y-auto"
//           onClose={closeModal}
//         >
//           <div className="min-h-screen px-4 text-center">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
//             </Transition.Child>

//             <span
//               className="inline-block h-screen align-middle"
//               aria-hidden="true"
//             >
//               &#8203;
//             </span>

//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
//                 <Dialog.Title
//                   as="h3"
//                   className="text-lg font-medium leading-6 text-gray-900"
//                 >
//                   Modal Title
//                 </Dialog.Title>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500">
//                     <div>
//                       {state.isLoading ? (
//                         <div>Loading...</div>
//                       ) : state.article ? (
//                         <div className="grid gap-4 grid-cols-1  mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
//                           <h5 className="text-xl font-medium tracking-tight">
//                             {state.article.sport.name}
//                           </h5>
//                           <h5 className="text-xl font-medium tracking-tight">
//                             {state.article.title}
//                           </h5>
//                           <p className="text-xl  tracking-tight">
//                             {state.article.content}
//                           </p>
//                           <p className="font-medium tracking-tight">
//                             {new Date(state.article.date).toLocaleDateString(
//                               "en-US",
//                               {
//                                 year: "numeric",
//                                 month: "short",
//                                 day: "2-digit",
//                               }
//                             )}
//                           </p>
//                           <div className="my-4">
//                             <img
//                               src={state.article.thumbnail}
//                               alt={state.article.title}
//                               className="w-full h-auto rounded-lg max-w-full"
//                             />
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="text-center text-red-600 dark:text-red-400">
//                           Failed to load article.
//                         </div>
//                       )}
//                     </div>
//                   </p>
//                 </div>

//                 <div className="mt-4">
//                   <button
//                     type="button"
//                     className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                     onClick={closeModal}
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// export default ArticleDetails;

import React, { Fragment, useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

interface ArticleDetailsProps {
  articleSelectId: number;
}

const ArticleDetails: React.FC<ArticleDetailsProps> = ({ articleSelectId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [article, setArticle] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    navigate("../../");
  };

  useEffect(() => {
    const fetchArticle = async () => {
      const token = localStorage.getItem("authToken") || "";

      try {
        const response = await fetch(
          `${API_ENDPOINT}/articles/${articleSelectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setArticle(data);
        }
      } catch (error) {
        console.log("Error fetching Article:", error);
      }
    };

    fetchArticle();
  }, [articleSelectId]);

  return (
    <>
      {/* <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-transparent opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={React.Fragment}
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
                  Article Details
                </Dialog.Title>
                <div className="mt-2">
                  {article ? (
                    <div className="grid gap-4 mt-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                      <h5 className="text-xl font-medium tracking-tight">
                        {article.sport.name}
                      </h5>
                      <h5 className="text-xl font-medium tracking-tight">
                        {article.title}
                      </h5>
                      <p className="text-xl tracking-tight">
                        {article.content}
                      </p>
                      <p className="font-medium tracking-tight">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </p>
                      <div className="my-4">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
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
      </Transition> */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="sticky inset-0 bg-transparent" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-gray-900 mb-4"
                >
                  {/* {article.sport.name} */}
                </Dialog.Title>

                {article ? (
                  <div className="grid gap-4 mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="text-xl font-bold">{article.title}</h5>
                    <p className="font-medium">{article.summary}</p>
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    <p className="font-medium">
                      {new Date(article.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </p>
                    <p className="text-lg">{article.content}</p>
                    {article.teams.length > 0 ? (
                      <ul className="text-gray-600">
                        <li>Teams:</li>
                        {article.teams.map((team) => (
                          <li>{team.name}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : (
                  <div className="text-center text-red-600 dark:text-red-400">
                    Failed to load article.
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
