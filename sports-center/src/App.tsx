// import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";

import { ArticleProvider } from "./context/articles/context";
import { MatchProvider } from "./context/matches/context";
import { SportProvider } from "./context/sports/context";
import { TeamProvider } from "./context/teams/context";
import { PreferencesProvider } from "./context/preferences/context";
import { ArticleDetailProvider } from "./context/article_details/context";
import { MatchDetailProvider } from "./context/match_details/context";

const App = () => {
  return (
    <div>
      <ArticleProvider>
        <MatchProvider>
          <SportProvider>
            <TeamProvider>
              <PreferencesProvider>
                <ArticleDetailProvider>
                  <MatchDetailProvider>
                    <RouterProvider router={router} />
                  </MatchDetailProvider>
                </ArticleDetailProvider>
              </PreferencesProvider>
            </TeamProvider>
          </SportProvider>
        </MatchProvider>
      </ArticleProvider>
    </div>
  );
};
export default App;

// // import { useState } from "react";
// // import reactLogo from "./assets/react.svg";
// // import viteLogo from "/vite.svg";
// import "./App.css";
// // import SportApp from "./SportApp";
// // import "./SportCard.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Notfound from "./pages/Notfound";
// import Signup from "./pages/signup";
// import Signin from "./pages/signin";
// import Dashboard from "./pages/dashboard";
// import ProtectedRoute from "./ProtectedRoute";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Signup />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
//   {
//     path: "/signin", // then we've added the signin route
//     element: <Signin />,
//   },
//   {
//     path: "/notfound",
//     element: <Notfound />,
//   },
//   {
//     path: "/dashboard",
//     element: (
//       <ProtectedRoute>
//         <Dashboard />
//       </ProtectedRoute>
//     ),
//   },
//   {
//     path: "*",
//     element: <Notfound />,
//   },
// ]);

// const App = () => {
//   return <RouterProvider router={router} />;
// };

// export default App;
// import SportForm from "./SportForm";

// // import Sport from "./Sport";
// import SportList from "./SportList";

// function App() {
//   return (
//     <div className="App">
//       {/* <SportList sports={[]} />
//       <SportForm /> */}
//       <SportApp />
//     </div>
//   );
// }

// export default App;