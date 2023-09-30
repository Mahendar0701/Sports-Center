// /* eslint-disable @typescript-eslint/no-explicit-any */

// import React, { Fragment, useEffect, useReducer, useState } from "react";
// import { API_ENDPOINT } from "../../config/constants";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useNavigate, useParams } from "react-router-dom";
// import { Transition, Dialog } from "@headlessui/react";

// interface State {
//   match: Match | null;
//   isLoading: boolean;
// }

// interface Action {
//   type: string;
//   payload?: any;
// }

// interface Match {
//   id: number;
//   name: string;
//   location: string;
//   sportName: string;
//   endsAt: string;
//   isRunning: boolean;
//   score: Record<string, string>;
//   story: string;
// }

// const reducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "API_CALL_START":
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case "API_CALL_END":
//       return {
//         ...state,
//         isLoading: false,
//         match: action.payload,
//       };
//     case "API_CALL_ERROR":
//       return {
//         ...state,
//         isLoading: false,
//       };
//     default:
//       return state;
//   }
// };

// const MatchList: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const navigate = useNavigate();

//   function closeModal() {
//     setIsOpen(false);
//     navigate("/account/members");
//   }

//   const [showFullStory, setShowFullStory] = useState(false);

//   const [state, dispatch] = useReducer(reducer, {
//     match: null,
//     isLoading: false,
//   });
//   const { matchID } = useParams();

//   useEffect(() => {
//     const fetchMatches = async () => {
//       const token = localStorage.getItem("authToken") ?? "";

//       try {
//         dispatch({ type: "API_CALL_START" });

//         const response = await fetch(`${API_ENDPOINT}/matches/${matchID}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();
//         console.log("match data", data);

//         dispatch({ type: "API_CALL_END", payload: data });
//       } catch (error) {
//         console.log("Error fetching Matches:", error);
//         dispatch({ type: "API_CALL_ERROR" });
//       }
//     };

//     fetchMatches();
//   }, [matchID]);

//   return (
//     <>
//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto"
//           onClose={closeModal}
//         >
//           <div className="flex items-center justify-center min-h-screen">
//             <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
//               {state.isLoading ? (
//                 <div>Loading...</div>
//               ) : state.match ? (
//                 <>
//                   <h3 className="text-2xl font-bold mb-2">
//                     {state.match.name}
//                   </h3>
//                   <div className="mb-4">
//                     <p className="text-sm text-gray-700">
//                       <span>ID:</span> {state.match.id}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       <span>Location:</span> {state.match.location}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       <span>Starts At:</span>{" "}
//                       {new Date(state.match.startsAt).toLocaleString()}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       <span>Ends At:</span>{" "}
//                       {new Date(state.match.endsAt).toLocaleString()}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       <span>Sport:</span> {state.match.sportName}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       <span>Is Running:</span>{" "}
//                       {state.match.isRunning ? "Yes" : "No"}
//                     </p>
//                   </div>

//                   <div className="mb-4">
//                     <h4 className="text-lg font-semibold mb-2">Score:</h4>
//                     <ul className="list-disc list-inside">
//                       {Object.entries(state.match.score).map(
//                         ([team, score]) => (
//                           <li key={team} className="text-sm ml-2">
//                             {team}: {score}
//                           </li>
//                         )
//                       )}
//                     </ul>
//                   </div>

//                   <div className="mb-4">
//                     <h4 className="text-lg font-semibold mb-2">Story:</h4>
//                     <p className="text-sm">
//                       {!showFullStory
//                         ? `${state.match.story
//                             .split("\n")
//                             .slice(0, 2)
//                             .join("\n")}...`
//                         : state.match.story}
//                     </p>
//                     <button
//                       className="text-blue-500 hover:underline mt-2"
//                       onClick={() => setShowFullStory(!showFullStory)}
//                     >
//                       {showFullStory ? "Read Less" : "Read More"}
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="text-center text-red-600 dark:text-red-400">
//                   Failed to load article.
//                 </div>
//               )}

//               <div className="mt-4 text-center">
//                 <button
//                   type="button"
//                   className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                   onClick={closeModal}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

// export default MatchList;
