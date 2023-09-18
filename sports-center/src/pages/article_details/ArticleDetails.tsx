//not working
// import React, { Fragment, useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Transition, Dialog } from "@headlessui/react";
// import {
//   useArticleState,
//   useArticleDispatch,
// } from "../../context/articles/context";
// import { fetchArticles, getArticle } from "../../context/articles/action";

// type Inputs = {
//   id: number;
// };

// // const ArticleDetails: React.FC = () => {
// //   const dispatchArticle = useArticleDispatch();

// //   useEffect(() => {
// //     fetchArticles(dispatchArticle);
// //   }, []);

// //   return (
// //     <div className="grid gap-4 grid-cols-1 mt-5 mr-52">
// //       <ArticleListItems />
// //       <br />
// //     </div>
// //   );
// // };

// const ArticleDetails = () => {
//   const state: any = useArticleState();
//   const dispatchArticle = useArticleDispatch();
//   const { articles, isLoading, isError, errorMessage } = state;
//   // const [isOpen, setIsOpen] = useState(false);
//   // const navigate = useNavigate();
//   const { articleID } = useParams();

//   useEffect(() => {
//     if (articleID) {
//       getArticle(dispatchArticle, articleID);
//     }
//   }, [articleID, dispatchArticle]);

//   // function closeModal() {
//   //   setIsOpen(false);
//   //   navigate("../../");
//   // }

//   if (articles.length === 0 && isLoading) {
//     return <span>Loading...</span>;
//   }

//   if (isError) {
//     return <span>{errorMessage}</span>;
//   }

//   return (
//     <>
//       {/* {articles.map((article: any) => ( */}
//       <div
//         key={articles.id}
//         className="member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
//       >
//         <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
//           {articles.title}
//         </h5>
//         <p className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
//           {state.articles.content}
//         </p>
//       </div>
//     </>
//   );
// };

// export default ArticleDetails;
