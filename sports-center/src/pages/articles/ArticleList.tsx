import React, { useEffect } from "react";
import { fetchArticles } from "../../context/articles/action";
import { useArticleDispatch } from "../../context/articles/context";

import ArticleListItems from "./ArticleListItems";
const ArticleList: React.FC = () => {
  const dispatchArticle = useArticleDispatch();

  useEffect(() => {
    fetchArticles(dispatchArticle);
  }, []);
  return (
    <div className="grid gap-4 grid-cols-1 mt-5 mr-52">
      <ArticleListItems />
      <br />
    </div>
  );
};
export default ArticleList;

// import React, { useEffect, useReducer } from "react";
// import { API_ENDPOINT } from "../../config/constants";

// // Define interfaces for state and action
// interface State {
//   articles: Article[];
//   isLoading: boolean;
// }

// interface Action {
//   type: string;
//   payload?: any;
// }

// interface Article {
//   id: number;
//   sportName: string;
//   title: string;
//   summary: string;
//   date: string;
//   thumbnail: string;
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
//         articles: action.payload,
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

// const ArticleList: React.FC = () => {
//   // Initialize state using useReducer
//   const [state, dispatch] = useReducer(reducer, {
//     articles: [],
//     isLoading: false,
//   });

//   // Fetch projects when the component mounts
//   useEffect(() => {
//     const fetchArticles = async () => {
//       const token = localStorage.getItem("authToken") ?? "";

//       try {
//         dispatch({ type: "API_CALL_START" });

//         const response = await fetch(`${API_ENDPOINT}/articles`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         dispatch({ type: "API_CALL_END", payload: data });
//       } catch (error) {
//         console.log("Error fetching Articles:", error);
//         dispatch({ type: "API_CALL_ERROR" });
//       }
//     };

//     fetchArticles();
//   }, []);

//   return (
//     <div>
//       {state.isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="grid gap-4 grid-cols-4 mt-5">
//           {state.articles.map((article) => (
//             <div
//               key={article.id}
//               className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
//             >
//               <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
//                 {article.sportName}
//               </h5>
//               <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
//                 {article.title}
//               </h5>
//               <p className="mb-2  font-medium tracking-tight text-gray-900 dark:text-white">
//                 {article.summary}
//               </p>
//               <p className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
//                 {new Date(article.date).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "short",
//                   day: "2-digit",
//                 })}
//               </p>
//               <img src={article.thumbnail} alt="Image Description" />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ArticleList;
