/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   useArticleDispatch,
//   useArticleState,
// } from "../../context/articles/context";
// import { fetchArticles } from "../../context/articles/action";
// import { usePreferencesState } from "../../context/preferences/context";
// import { useSportDispatch, useSportState } from "../../context/sports/context";
// import { fetchSports } from "../../context/sports/action";

// const FavouriteArticleTabList: React.FC = () => {
//   const [selectedSport, setSelectedSport] = useState<string | null>(null);

//   const dispatchArticle = useArticleDispatch();

//   const state: any = useArticleState();

//   const dispatchSport = useSportDispatch();
//   const state1: any = useSportState();

//   const { articles, isLoading, isError, errorMessage } = state;

//   useEffect(() => {
//     fetchArticles(dispatchArticle);
//   }, [dispatchArticle]);

//   useEffect(() => {
//     fetchSports(dispatchSport);
//   }, []);

//   const { sports, isLoading1, isError1, errorMessage1 } = state1;
//   console.log("tab sports", sports);

//   const { preferences } = usePreferencesState();

//   console.log("prefere tab", preferences);

//   const handleSportButtonClick = (sportName: string) => {
//     setSelectedSport(sportName === selectedSport ? null : sportName);
//   };

//   const filteredArticles = articles.filter(
//     (article) =>
//       !selectedSport ||
//       article.sport.name === selectedSport ||
//       article.teams.some((team) => team.name === selectedSport)
//   );

//   const storedValue = localStorage.getItem("authenticated");
//   const isAuthenticated = storedValue === "true";

//   return (
//     <div>
//       <div className="sticky">
//         {isAuthenticated ? (
//           <div>
//             {preferences.sports &&
//               preferences.sports.map((sport: any, index: number) => (
//                 <button
//                   key={index}
//                   onClick={() => handleSportButtonClick(sport)}
//                   className={`py-2 px-4 mx-3 border ${
//                     selectedSport === sport ? "bg-gray-200" : "bg-gray-100"
//                   }`}
//                 >
//                   {sport}
//                 </button>
//               ))}
//           </div>
//         ) : (
//           <div>
//             <p>login</p>
//             {state1.sports &&
//               state1.sports.map((sport: any, index: number) => (
//                 <button
//                   key={index}
//                   onClick={() => handleSportButtonClick(sport.name)}
//                   className={`py-2 px-4 mx-3 rounded border ${
//                     selectedSport === sport.name ? "bg-gray-200" : "bg-gray-100"
//                   }`}
//                 >
//                   {sport.name}
//                 </button>
//               ))}
//             <br />
//           </div>
//         )}
//       </div>

//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         selectedSport && (
//           <div className="my-5 max-h-[1500px] relative overflow-y-scroll ">
//             {filteredArticles.map((article) => (
//               <div
//                 key={article.id}
//                 style={{ height: "345px" }}
//                 className="my-5 relative flex w-full max-w-[76rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
//               >
//                 <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
//                   <img
//                     src={article.thumbnail}
//                     alt="image"
//                     className="h-full w-full object-cover"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
//                     {article.sport.name}
//                   </h6>
//                   <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
//                     {article.title}
//                   </h4>
//                   <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
//                     {article.summary}
//                   </p>
//                   <Link key={article.id} to={`${article.id}`}>
//                     <button
//                       className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//                       type="button"
//                     >
//                       Read More
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="2"
//                         stroke="currentColor"
//                         aria-hidden="true"
//                         className="h-4 w-4"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
//                         ></path>
//                       </svg>
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default FavouriteArticleTabList;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   useArticleDispatch,
//   useArticleState,
// } from "../../context/articles/context";
// import { fetchArticles } from "../../context/articles/action";
// import { usePreferencesState } from "../../context/preferences/context";
// import { useSportDispatch, useSportState } from "../../context/sports/context";
// import { fetchSports } from "../../context/sports/action";

// const FavouriteArticleTabList: React.FC = () => {
//   const { preferences } = usePreferencesState();
//   const [selectedSport, setSelectedSport] = useState<string | null>(
//     preferences.sports ? preferences.sports[0] : "Trending"
//   );

//   const dispatchArticle = useArticleDispatch();
//   const state: any = useArticleState();

//   const dispatchSport = useSportDispatch();
//   const state1: any = useSportState();

//   const { articles, isLoading, isError, errorMessage } = state;

//   useEffect(() => {
//     fetchArticles(dispatchArticle);
//   }, [dispatchArticle]);

//   useEffect(() => {
//     fetchSports(dispatchSport);
//   }, []);

//   const { sports, isLoading1, isError1, errorMessage1 } = state1;

//   const handleSportButtonClick = (sportName: string) => {
//     setSelectedSport(sportName === selectedSport ? null : sportName);
//   };

//   const filteredArticles = articles.filter(
//     (article) =>
//       !selectedSport ||
//       article.sport.name === selectedSport ||
//       article.teams.some((team) => team.name === selectedSport)
//   );

//   const storedValue = localStorage.getItem("authenticated");
//   const isAuthenticated = storedValue === "true";

//   return (
//     <div>
//       <div className="sticky">
//         {isAuthenticated ? (
//           <div>
//             <button
//               key="trending"
//               onClick={() => handleSportButtonClick("Trending")}
//               className={`py-2 px-4 mx-3 border ${
//                 selectedSport === "Trending" ? "bg-gray-200" : "bg-gray-100"
//               }`}
//             >
//               Trending
//             </button>
//             {preferences.sports &&
//               preferences.sports.map((sport: any, index: number) => (
//                 <button
//                   key={index}
//                   onClick={() => handleSportButtonClick(sport)}
//                   className={`py-2 px-4 mx-3 border ${
//                     selectedSport === sport ? "bg-gray-200" : "bg-gray-100"
//                   }`}
//                 >
//                   {sport}
//                 </button>
//               ))}
//           </div>
//         ) : (
//           <div>
//             <p>login</p>
//             {state1.sports &&
//               state1.sports.map((sport: any, index: number) => (
//                 <button
//                   key={index}
//                   onClick={() => handleSportButtonClick(sport.name)}
//                   className={`py-2 px-4 mx-3 rounded border ${
//                     selectedSport === sport.name ? "bg-gray-200" : "bg-gray-100"
//                   }`}
//                 >
//                   {sport.name}
//                 </button>
//               ))}
//             <br />
//           </div>
//         )}
//       </div>

//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <div className="my-5 max-h-[1500px] relative overflow-y-scroll">
//           {filteredArticles.map((article) => (
//             <div
//               key={article.id}
//               style={{ height: "345px" }}
//               className="my-5 relative flex w-full max-w-[76rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
//             >
//               <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
//                 <img
//                   src={article.thumbnail}
//                   alt="image"
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//               <div className="p-6">
//                 <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
//                   {article.sport.name}
//                 </h6>
//                 <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
//                   {article.title}
//                 </h4>
//                 <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
//                   {article.summary}
//                 </p>
//                 <Link key={article.id} to={`${article.id}`}>
//                   <button
//                     className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//                     type="button"
//                   >
//                     Read More
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth="2"
//                       stroke="currentColor"
//                       aria-hidden="true"
//                       className="h-4 w-4"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
//                       ></path>
//                     </svg>
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FavouriteArticleTabList;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useArticleDispatch,
  useArticleState,
} from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/action";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { useSportDispatch, useSportState } from "../../context/sports/context";
import { fetchSports } from "../../context/sports/action";
import { fetchPreferences } from "../../context/preferences/action";

const FavouriteArticleTabList: React.FC = () => {
  // const { preferences } = usePreferencesState();
  const [selectedSport, setSelectedSport] = useState<string | null>("Trending"); // Set "Trending" as default

  const dispatchArticle = useArticleDispatch();
  const state: any = useArticleState();

  const dispatchSport = useSportDispatch();
  const state1: any = useSportState();

  const dispatchPreferences = usePreferencesDispatch();
  const state2: any = usePreferencesState();

  useEffect(() => {
    fetchArticles(dispatchArticle);
  }, [dispatchArticle]);

  useEffect(() => {
    fetchSports(dispatchSport);
  }, []);

  useEffect(() => {
    fetchPreferences(dispatchPreferences);
  }, []);

  const { articles, isLoading, isError, errorMessage } = state;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const { sports, isLoading1, isError1, errorMessage1 } = state1;
  console.log(sports);

  if (isLoading1) {
    return <span>Loading...</span>;
  }

  if (isError1) {
    return <span>{errorMessage1}</span>;
  }

  const { preferences, isLoading2, isError2, errorMessage2 } = state2;

  if (isLoading2) {
    return <span>Loading...</span>;
  }

  if (isError2) {
    return <span>{errorMessage2}</span>;
  }

  const handleSportButtonClick = (sportName: string) => {
    setSelectedSport(sportName);
  };

  const storedValue = localStorage.getItem("authenticated");
  const isAuthenticated = storedValue === "true";

  const filteredArticles = articles.filter(
    (article: { sport: { name: string }; teams: any[] }) => {
      if (selectedSport === "Trending" && !isAuthenticated) {
        return true;
      }

      if (selectedSport === "Trending" && isAuthenticated) {
        if (preferences.sports && preferences.sports.length > 0) {
          return (
            preferences.sports.includes(article.sport.name) ||
            article.teams.some((team: any) =>
              preferences.teams.includes(team.name)
            )
          );
        } else {
          return true;
        }
      }
      return !selectedSport || article.sport.name === selectedSport;
    }
  );

  // const filteredArticles = articles.filter((article) => {
  //   if (selectedSport === "Trending" && !isAuthenticated) {
  //     return true;
  //   }

  //   if (selectedSport === "Trending" && isAuthenticated) {
  //     let sportMatch = false;
  //     let teamMatch = false;

  //     if (Array.isArray(preferences.sports)) {
  //       for (const preferenceSport of preferences.sports) {
  //         if (article.sport.name === preferenceSport) {
  //           sportMatch = true;
  //           break;
  //         }
  //       }
  //     }

  //     if (!sportMatch && Array.isArray(article.teams)) {
  //       for (const team of article.teams) {
  //         if (
  //           Array.isArray(preferences.teams) &&
  //           preferences.teams.indexOf(team.name) !== -1
  //         ) {
  //           teamMatch = true;
  //           break;
  //         }
  //       }
  //     }

  //     return sportMatch || teamMatch;
  //   }

  //   if (!selectedSport) {
  //     return true;
  //   }

  //   if (article.sport.name === selectedSport) {
  //     return true;
  //   }

  //   // if (isAuthenticated && (!preferences.sports || !preferences.teams)) {
  //   //   return true;
  //   // }

  //   if (Array.isArray(article.teams)) {
  //     for (const team of article.teams) {
  //       if (team.name === selectedSport) {
  //         return true;
  //       }
  //     }
  //   }

  //   return false;
  // });

  return (
    <div>
      <div className="sticky">
        {isAuthenticated && preferences.sports ? (
          <div>
            <button
              key="trending"
              onClick={() => handleSportButtonClick("Trending")}
              className={`py-2 px-4 mx-3 border ${
                selectedSport === "Trending" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              Trending
            </button>
            {preferences.sports &&
              preferences.sports.map((sport: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleSportButtonClick(sport)}
                  className={`py-2 px-4 mx-3 border ${
                    selectedSport === sport ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  {sport}
                </button>
              ))}
          </div>
        ) : (
          <div>
            <p>login</p>
            <button
              key="trending"
              onClick={() => handleSportButtonClick("Trending")}
              className={`py-2 px-4 mx-2 border ${
                selectedSport === "Trending" ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              Trending
            </button>
            {state1.sports &&
              state1.sports.map((sport: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleSportButtonClick(sport.name)}
                  className={`py-2 px-4 mx-3 rounded border ${
                    selectedSport === sport.name ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  {sport.name}
                </button>
              ))}
            <br />
          </div>
        )}
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="my-5 max-h-[1500px] relative overflow-y-scroll">
          {filteredArticles.map((article: any) => (
            <div
              key={article.id}
              style={{ height: "345px" }}
              className="my-5 relative flex w-full max-w-[76rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            >
              <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                <img
                  src={article.thumbnail}
                  alt="image"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                  {article.sport.name}
                </h6>
                <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {article.title}
                </h4>
                <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                  {article.summary}
                </p>

                <h1>Teams</h1>
                <ul>
                  {article.teams.map((team: any) => (
                    <li key={team.id}>{team.name}</li>
                  ))}
                </ul>

                <Link key={article.id} to={`${article.id}`}>
                  <button
                    className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      ></path>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteArticleTabList;
