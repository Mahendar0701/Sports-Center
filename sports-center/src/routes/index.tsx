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
import Favourites from "../pages/favourites";
// import ArticleList from "../pages/articles/ArticleList";
// import FavouriteArticleTabList from "../pages/articles/FavoritesTab";
import Dashboard from "../pages/dashboard";
import ArticleTabList from "../pages/dashboard/ArticleContainerTab";
// import Article from "../pages/article_detail/Article";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/account/projects" replace /> },
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
      { index: true, element: <Navigate to="/account/projects" replace /> },
      {
        path: "projects",
        // element: <ArticleContainer />,
        children: [
          // { index: true, element: <Articles /> },
          { index: true, element: <Dashboard /> },
          {
            path: ":articleID",
            // element: <ArticleDetails />,
            element: <ArticleDetailsIndex />,
            // element: <Article />,
          },
        ],
      },
      {
        path: "members",
        // element: <Matches />,
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
        element: <Favourites />,
      },
      {
        path: "articles",
        element: <ArticleTabList />,
      },
    ],
  },
]);
export default router;
