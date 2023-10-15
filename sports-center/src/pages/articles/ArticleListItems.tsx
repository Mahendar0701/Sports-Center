/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useState } from "react";
import { useArticleState } from "../../context/articles/context";
// import { useArticleDispatch } from "../../context/articles/context";
import { Link } from "react-router-dom";
import { usePreferencesState } from "../../context/preferences/context";
import { useSportState } from "../../context/sports/context";
import { Dialog, Transition } from "@headlessui/react";
import ArticleDetails from "../article_details/ArticleDetailsContainer";

export default function ArticleListItems() {
  const [selectedSport, setSelectedSport] = useState<string | null>("Trending");
  let [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const state: any = useArticleState();
  const state1: any = useSportState();
  const state2: any = usePreferencesState();

  const { articles, isLoading, isError, errorMessage } = state;
  console.log(articles);

  if (articles.length === 0 && isLoading) {
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

  const isAuthenticated = !!localStorage.getItem("authToken");

  const filteredArticles = articles.filter(
    (article: { sport: { name: string }; teams: any[] }) => {
      if (selectedSport === "Trending" && !isAuthenticated) {
        return true;
      }

      if (selectedSport === "Trending" && isAuthenticated) {
        if (
          preferences &&
          preferences.sports &&
          preferences.sports.length > 0
        ) {
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

  return (
    <div>
      <div className="sticky">
        {isAuthenticated &&
        preferences &&
        preferences.sports &&
        preferences.sports.length > 0 ? (
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
            {preferences &&
              preferences.sports &&
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

                {/* <Link key={article.id} to={`${article.id}`}> */}
                <button
                  className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={openModal}
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
                {/* <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeModal}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-transparent bg-opacity-25" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="text-lg font-medium leading-6 text-gray-900"
                            >
                              Favorite Sport
                            </Dialog.Title>
                            <div className="mt-2">
                              <h1>Hiii</h1>
                              Articles details
                              {article.summary}
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition> */}
                {/* </Link> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useArticleState } from "../../context/articles/context";
// // import { useArticleDispatch } from "../../context/articles/context";
// import { Link } from "react-router-dom";

// export default function ArticleListItems() {
//   const state: any = useArticleState();

//   const { articles, isLoading, isError, errorMessage } = state;
//   console.log(articles);

//   if (articles.length === 0 && isLoading) {
//     return <span>Loading...</span>;
//   }

//   if (isError) {
//     return <span>{errorMessage}</span>;
//   }

//   return (
//     <>
//       {articles.map((article: any) => (
//         <div
//           key={article.id}
//           className="member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
//         >
//           <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
//             {article.sport.name}
//           </h5>
//           <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
//             {article.title}
//           </h5>
//           <p className="mb-2  font-medium tracking-tight text-gray-900 dark:text-white">
//             {article.summary}
//           </p>
//           <p className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
//             {new Date(article.date).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "short",
//               day: "2-digit",
//             })}
//           </p>
//           <img
//             src={article.thumbnail}
//             className="w-52 float-right float-top h-48"
//             alt="Image Description"
//           />
//           <h1>Teams</h1>
//           <ul>
//             {article.teams.map((team: any) => (
//               <li key={team.id}>{team.name}</li>
//             ))}
//           </ul>

//           <Link key={article.id} to={`${article.id}`}>
//             <button
//               id="delete-member-btn"
//               type="submit"
//               className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//             >
//               read more
//             </button>
//           </Link>
//         </div>
//       ))}
//     </>
//   );
// }
