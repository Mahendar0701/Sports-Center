import React, { useEffect } from "react";
import { fetchMatches } from "../../context/matches/action";
import { fetchPreferences } from "../../context/preferences/action";

// So, let's import the useProjectsDispatch custom hook.
import { useMatchDispatch } from "../../context/matches/context";
import { usePreferencesDispatch } from "../../context/preferences/context";

// I'll import the ProjectListItems component from the same folder.
// This I'll define next.
import MatchListItems from "./MatchListItems";
// import matches from ".";
// import MatchSlider from "./MatchSlider";
const MatchList: React.FC = () => {
  const dispatchMatch = useMatchDispatch();
  const dispatchPreferences = usePreferencesDispatch();

  useEffect(() => {
    fetchMatches(dispatchMatch);
    fetchPreferences(dispatchPreferences);
  }, []);
  return (
    <div className="flex flex-row ">
      <MatchListItems />
      {/* <MatchSlider /> */}
      <br />
    </div>
  );
};
export default MatchList;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useReducer } from "react";
// import { API_ENDPOINT } from "../../config/constants";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./MatchSlider.css";
// import MatchSlider from "./MatchSlider";

// // Define interfaces for state and action
// interface State {
//   matches: Match[];
//   isLoading: boolean;
// }

// interface Action {
//   type: string;
//   payload?: any;
// }

// interface Match {
//   id: number;
//   //   sport_name: string;
//   name: string;
//   location: string;
//   sportName: string;
//   endsAt: string;
//   //   teams: string;
//   isRunning: boolean;
// }

// // Reducer function to manage state updates
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
//         matches: action.payload,
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
//   // Initialize state using useReducer
//   const [state, dispatch] = useReducer(reducer, {
//     matches: [],
//     isLoading: false,
//   });

//   // Fetch projects when the component mounts
//   useEffect(() => {
//     const fetchMatches = async () => {
//       const token = localStorage.getItem("authToken") ?? "";

//       try {
//         dispatch({ type: "API_CALL_START" });

//         const response = await fetch(`${API_ENDPOINT}/matches`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         console.log("data", data);

//         dispatch({ type: "API_CALL_END", payload: data.matches });
//       } catch (error) {
//         console.log("Error fetching Matches:", error);
//         dispatch({ type: "API_CALL_ERROR" });
//       }
//     };

//     fetchMatches();
//   }, []);

//   return (
//     <div>
//       {state.isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="match-slider-container">
//           <h2>Featured Matches</h2>
//           <MatchSlider matches={state.matches} />
//         </div>
//       )}
//     </div>
//   );

//   //   return (
//   //     <div>
//   //       {state.isLoading ? (
//   //         <div>Loading...</div>
//   //       ) : (
//   //         <div className="grid gap-4 grid-cols-4 mt-5">
//   //           {state.matches.map((match) => (
//   //             <div
//   //               key={match.id}
//   //               className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
//   //             >
//   //               {/* <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
//   //               {match.name}
//   //             </h5> */}
//   //               <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
//   //                 {match.sportName}
//   //               </h5>
//   //               <p className="mb-2  font-medium tracking-tight text-gray-900 dark:text-white">
//   //                 {match.name}
//   //               </p>
//   //               <p className="mb-2  font-medium tracking-tight text-gray-900 dark:text-white">
//   //                 {match.location}
//   //               </p>
//   //               <p className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
//   //                 {new Date(match.endsAt).toLocaleDateString("en-US", {
//   //                   year: "numeric",
//   //                   month: "short",
//   //                   day: "2-digit",
//   //                 })}
//   //               </p>
//   //               {/* <img src={match.thumbnail} alt="Image Description" /> */}
//   //             </div>
//   //           ))}
//   //         </div>
//   //       )}
//   //     </div>
//   // );
// };

// export default MatchList;

// // import React, { useState, useEffect } from "react";
// import React, { useEffect, useReducer } from "react";
// import { API_ENDPOINT } from "../../config/constants";
// interface Article {
//   id: number;
//   title: string;
//   summary: string;
// }

// const ArticleList = () => {
//   //   const [Articles, setArticles] = useState<Article[]>([]);
//   //   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [state, dispatch] = useReducer(reducer, {
//     articles: [],
//     isLoading: false
//   });
//   useEffect(() => {
//     // Fetch the list of projects here
//     fetchArticles();
//   }, []);
//   const fetchArticles = async () => {
//     const token = localStorage.getItem("authToken") ?? "";

//     try {
//     //   setIsLoading(true);
//       const response = await fetch(`${API_ENDPOINT}/articles`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await response.json();
//     //   setArticles(data);
//     //   setIsLoading(false);
//     } catch (error) {
//       console.log("Error fetching articles:", error);
//     //   setIsLoading(false);
//     }
//   };
//   return (
//     <div>
//       <h2>Article List</h2>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <ul>
//           {Articles.map((article) => (
//             <li key={article.id}>{article.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
// export default ArticleList;
