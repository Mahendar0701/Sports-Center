import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import Signin from "../pages/signin";
import Signup from "../pages/signup";
import AccountLayout from "../layouts/account";
import ProtectedRoute from "./ProtectedRoute";
import Articles from "../pages/articles";
import Matches from "../pages/matches";
import Logout from "../pages/logout";
import Sports from "../pages/sports";
import ArticleContainer from "../pages/articles/ArticleContainer";
import MatchDetailsIndex from "../pages/match_details";
import ArticleDetailsIndex from "../pages/article_details";
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
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/account/projects" replace /> },
      {
        path: "projects",
        element: <ArticleContainer />,
        children: [
          { index: true, element: <Articles /> },
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
    ],
  },
]);
export default router;
