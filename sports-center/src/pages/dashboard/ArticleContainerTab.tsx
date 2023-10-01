/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchArticles } from "../../context/articles/action";
import {
  useArticleDispatch,
  useArticleState,
} from "../../context/articles/context";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { fetchSports } from "../../context/sports/action";
import { useSportDispatch, useSportState } from "../../context/sports/context";
import { fetchPreferences } from "../../context/preferences/action";

const ArticleTabList: React.FC = () => {
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
        return (
          preferences.sports.includes(article.sport.name) ||
          article.teams.some((team) => preferences.teams.includes(team.name))
        );
      }
      return (
        !selectedSport ||
        article.sport.name === selectedSport ||
        article.teams.some((team) => team.name === selectedSport)
      );
    }
  );

  return (
    <div>
      <div className="sticky">
        {isAuthenticated ? (
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
                  className={`py-2 px-4 mx-2 rounded border ${
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
        selectedSport && (
          //   <div className="w-full my-5  max-h-[1500px] relative overflow-y-scroll">
          <div className="grid gap-4 grid-cols-4 mt-5">
            {filteredArticles.map((article: any) => (
              <div>
                {/* card */}
                <div
                  key={article.id}
                  style={{ height: "700px" }}
                  className="my-7 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href="#">
                    <img
                      className="rounded-t-lg h-80 w-96"
                      src={article.thumbnail}
                      alt=""
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {article.title}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {article.summary}
                    </p>
                    <Link
                      key={article.id}
                      to={`/account/projects/${article.id}`}
                    >
                      <a className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg
                          className="w-3.5 h-3.5 ml-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default ArticleTabList;
