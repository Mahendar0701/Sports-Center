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

const FavouriteArticleList: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  // const [selectedTeam, setSelectedTeam] = useState<string>("");

  // const dispatchSport = useSportDispatch();
  // const state1: any = useSportState();

  // const dispatchTeam = useTeamDispatch();
  // const state2: any = useTeamState();

  const dispatchArticle = useArticleDispatch();
  const state3: any = useArticleState();

  const dispatchPreferences = usePreferencesDispatch();
  const state4: any = usePreferencesState();

  // useEffect(() => {
  //   fetchSports(dispatchSport);
  // }, []);

  // useEffect(() => {
  //   fetchTeams(dispatchTeam);
  // }, []);

  useEffect(() => {
    fetchArticles(dispatchArticle);
  }, []);
  useEffect(() => {
    fetchPreferences(dispatchPreferences);
  }, []);

  // const { sports, isLoading, isError, errorMessage } = state1;

  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }

  // if (isError) {
  //   return <span>{errorMessage}</span>;
  // }

  // const { teams, isLoading1, isError1, errorMessage1 } = state2;

  // if (isLoading1) {
  //   return <span>Loading...</span>;
  // }

  // if (isError1) {
  //   return <span>{errorMessage1}</span>;
  // }
  const { articles, isLoading2, isError2, errorMessage2 } = state3;

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
    (article) =>
      !selectedSport ||
      (article.sport.name === selectedSport && !selectedTeam) ||
      article.teams.some((team) => team.name === selectedTeam)
  );

  return (
    <div>
      {/* Dropdown/select input to choose favorite sport */}

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

      {state3.isLoading ? (
        <div>Loading...</div>
      ) : (
        // {preferences.sports}
        // Check if selectedSport is empty before rendering articles
        selectedSport && (
          <div className="grid gap-4 grid-cols-4 mt-5">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                  {article.sport.name}
                </h5>
                <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                  {article.title}
                </h5>
                <p className="mb-2  font-medium tracking-tight text-gray-900 dark:text-white">
                  {article.summary}
                </p>
                <p className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
                  {new Date(article.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </p>
                <h1>Teams</h1>
                <ul>
                  {article.teams.map((team: any) => (
                    <li key={team.id}>{team.name}</li>
                  ))}
                </ul>
                {/* <img src={article.thumbnail} alt="Image Description" /> */}
                <button
                  id="delete-member-btn"
                  type="submit"
                  // onClick={() => onSubmit({ id: article.id })}
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  read more
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default FavouriteArticleList;
