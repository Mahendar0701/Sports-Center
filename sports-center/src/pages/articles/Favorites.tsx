/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import { API_ENDPOINT } from "../../config/constants";

// import { fetchSports } from "../../context/sports/action";
// import { useSportDispatch, useSportState } from "../../context/sports/context";
import { fetchArticles } from "../../context/articles/action";
import {
  useArticleDispatch,
  useArticleState,
} from "../../context/articles/context";
// import { fetchTeams } from "../../context/teams/action";
// import { useTeamDispatch, useTeamState } from "../../context/teams/context";

import { fetchPreferences } from "../../context/preferences/action";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { fetchSports } from "../../context/sports/action";
import { fetchTeams } from "../../context/teams/action";
import { useSportDispatch, useSportState } from "../../context/sports/context";
import { useTeamDispatch, useTeamState } from "../../context/teams/context";
import { Link } from "react-router-dom";

const FavouriteArticleList: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  // const [selectedTeam, setSelectedTeam] = useState<string>("");

  const dispatchSport = useSportDispatch();
  const state1: any = useSportState();

  const dispatchTeam = useTeamDispatch();
  const state2: any = useTeamState();

  const dispatchArticle = useArticleDispatch();
  const state3: any = useArticleState();

  const dispatchPreferences = usePreferencesDispatch();
  const state4: any = usePreferencesState();

  useEffect(() => {
    fetchSports(dispatchSport);
  }, []);

  useEffect(() => {
    fetchTeams(dispatchTeam);
  }, []);

  useEffect(() => {
    fetchArticles(dispatchArticle);
  }, []);
  useEffect(() => {
    fetchPreferences(dispatchPreferences);
  }, []);

  const { sports, isLoading, isError, errorMessage } = state1;
  console.log("favorite sport", sports);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const { teams, isLoading1, isError1, errorMessage1 } = state2;

  if (isLoading1) {
    return <span>Loading...</span>;
  }

  if (isError1) {
    return <span>{errorMessage1}</span>;
  }
  const { articles, isLoading2, isError2, errorMessage2 } = state3;

  console.log(teams, articles);

  if (isLoading2) {
    return <span>Loading...</span>;
  }

  if (isError2) {
    return <span>{errorMessage2}</span>;
  }
  const { preferences, isLoading3, isError3, errorMessage3 } = state4;

  if (isLoading3) {
    return <span>Loading...</span>;
  }

  if (isError3) {
    return <span>{errorMessage3}</span>;
  }

  const filteredArticles = state3.articles.filter(
    (article: { sport: { name: any }; teams: any[] }) =>
      !selectedSport ||
      (article.sport.name === selectedSport && !selectedTeam) ||
      article.teams.some((team: { name: string }) => team.name === selectedTeam)
  );
  console.log("sekected sports", selectedSport);
  console.log("sekected teams", selectedTeam);

  const storedValue = localStorage.getItem("authenticated");
  const isAuthenticated = storedValue === "true";

  return (
    <div>
      <div>
        {/* {preferences.sports.length} */}
        {isAuthenticated &&
        preferences.sports &&
        preferences.sports.length > 0 ? (
          <div>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="">Select Favorite Sport</option>
              {preferences.sports &&
                preferences.sports.length > 0 &&
                preferences.sports.map((sport: string, index: number) => (
                  <option key={index} value={sport}>
                    {sport}
                  </option>
                ))}
            </select>
            <br />
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="">Select Favorite Team</option>
              {preferences.teams &&
                preferences.teams.length > 0 &&
                preferences.teams.map((team: string, index: number) => (
                  <option key={index} value={team}>
                    {team}
                  </option>
                ))}
            </select>
          </div>
        ) : (
          <div>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option value="">Select Favorite Sport</option>
              {state1.sports &&
                state1.sports.length > 0 &&
                state1.sports.map((sport: any, index: number) => (
                  <option key={index} value={sport.name}>
                    {sport.name}
                  </option>
                ))}
            </select>
            <br />
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="">Select Favorite Team</option>
              {state2.teams &&
                state2.teams.length > 0 &&
                state2.teams.map((team: any, index: number) => (
                  <option key={index} value={team.name}>
                    {team.name}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>

      {state3.isLoading ? (
        <div>Loading...</div>
      ) : (
        selectedSport && (
          <div className="w-full my-5  max-h-[1500px] relative overflow-y-scroll">
            {filteredArticles.map((article: any) => (
              <div>
                {/* card */}
                <div
                  key={article.id}
                  style={{ height: "700px", width: "280px" }}
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

export default FavouriteArticleList;
