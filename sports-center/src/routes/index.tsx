// import { Navigate, createBrowserRouter } from "react-router-dom";

// import Signin from "../pages/signin";
// import Signup from "../pages/signup";
// import AccountLayout from "../layouts/account";
// // import ProtectedRoute from "./ProtectedRoute";
// // import Articles from "../pages/articles";
// import Matches from "../pages/matches";
// import Logout from "../pages/logout";
// import Sports from "../pages/sports";
// // import ArticleContainer from "../pages/articles/ArticleContainer";
// import MatchDetailsIndex from "../pages/match_details";
// import ArticleDetailsIndex from "../pages/article_details";
// // import FavouriteArticleList from "../pages/articles/Favorites";
// import Favourites from "../pages/filter";
// // import ArticleList from "../pages/articles/ArticleList";
// // import FavouriteArticleTabList from "../pages/articles/FavoritesTab";
// import Dashboard from "../pages/dashboard";
// import Articles from "../pages/articles";
// // import Article from "../pages/article_detail/Article";

// const router = createBrowserRouter([
//   { path: "/", element: <Navigate to="/account/dashboard" replace /> },
//   {
//     path: "/signin",
//     element: <Signin />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/logout",
//     element: <Logout />,
//   },
//   // Protected Routes
//   {
//     path: "account",
//     element: (
//       // <ProtectedRoute>
//       <AccountLayout />
//       // </ProtectedRoute>
//     ),
//     children: [
//       { index: true, element: <Navigate to="/account/dashboard" replace /> },
//       {
//         path: "dashboard",
//         // element: <ArticleContainer />,
//         children: [
//           // { index: true, element: <Articles /> },
//           { index: true, element: <Dashboard /> },
//           {
//             path: ":articleID",
//             // element: <ArticleDetails />,
//             element: <ArticleDetailsIndex />,
//             // element: <Article />,
//           },
//         ],
//       },
//       {
//         path: "members",
//         // element: <Matches />,
//         children: [
//           { index: true, element: <Matches /> },
//           {
//             path: ":matchID",
//             element: <MatchDetailsIndex />,
//           },
//         ],
//       },
//       {
//         path: "sports",
//         element: <Sports />,
//       },
//       {
//         path: "favourites",
//         element: <Favourites />,
//       },
//       {
//         path: "articles",
//         element: <Articles />,
//       },
//     ],
//   },
// ]);
// export default router;

import { Navigate, createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import AccountLayout from "../layouts/account";
// import ProtectedRoute from "./ProtectedRoute";
// import Articles from "../pages/articles";
import Matches from "../pages/matches";
import Logout from "../pages/logout";
import Sports from "../pages/sports";
// import ArticleContainer from "../pages/articles/ArticleContainer";
import MatchDetailsIndex from "../pages/match_details";
import ArticleDetailsIndex from "../pages/article_details";
// import FavouriteArticleList from "../pages/articles/Favorites";
import ArticleFilter from "../pages/filter";
// import ArticleList from "../pages/articles/ArticleList";
// import FavouriteArticleTabList from "../pages/articles/FavoritesTab";
import Dashboard from "../pages/dashboard";
import Articles from "../pages/articles";
import ArticleContainer from "../pages/articles/ArticleContainer";
import Favorites from "../pages/favourites";
import ChangePassword from "../pages/changePassword";
import Profile from "../pages/profile";
// import Article from "../pages/article_detail/Article";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/account" replace /> },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  // Protected Routes
  {
    path: "account",
    element: (
      // <ProtectedRoute>
      <AccountLayout />
      // </ProtectedRoute>
    ),
    children: [
      // { index: true, element: <Navigate to="/account" replace /> },
      { index: true, element: <Dashboard /> },
      {
        path: "articles",
        // element: <ArticleContainer />,
        children: [
          { index: true, element: <Articles /> },
          {
            path: ":articleID",
            element: <ArticleDetailsIndex />,
          },
        ],
      },
      {
        path: "matches",
        children: [
          { index: true, element: <Matches /> },
          {
            path: ":matchID",
            element: <MatchDetailsIndex />,
          },
        ],
      },
      {
        path: "sports",
        element: <Sports />,
      },
      {
        path: "favourites",
        element: <Favorites />,
      },
      {
        path: "articles",
        element: <Articles />,
      },
      {
        path: "changePassword",
        element: <ChangePassword />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
export default router;
