/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../context/articles/action";
import {
  useArticleDispatch,
  useArticleState,
} from "../../context/articles/context";

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

const FavouriteArticleFilter: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const dispatchSport = useSportDispatch();
  const dispatchTeam = useTeamDispatch();
  const dispatchArticle = useArticleDispatch();
  const dispatchPreferences = usePreferencesDispatch();

  const sportState: any = useSportState();
  const teamState: any = useTeamState();
  const articleState: any = useArticleState();
  const preferencesState: any = usePreferencesState();

  useEffect(() => {
    fetchSports(dispatchSport);
    fetchTeams(dispatchTeam);
    fetchArticles(dispatchArticle);
    fetchPreferences(dispatchPreferences);
  }, []);

  const { sports, isLoading, isError, errorMessage } = sportState;
  const { teams, isLoading1, isError1, errorMessage1 } = teamState;
  const { articles, isLoading2, isError2, errorMessage2 } = articleState;
  const { preferences, isLoading3, isError3, errorMessage3 } = preferencesState;

  if (isLoading || isLoading1 || isLoading2 || isLoading3) {
    return <span>Loading articles...</span>;
  }
  if (isError || isError1 || isError2 || isError3) {
    return (
      <span>
        {errorMessage || errorMessage1 || errorMessage2 || errorMessage3}
      </span>
    );
  }

  const filteredArticles = articleState.articles.filter((article: any) => {
    const sportMatches = !selectedSport || article.sport.name === selectedSport;
    const teamMatches =
      !selectedTeam ||
      article.teams.some(
        (team: { name: string }) => team.name === selectedTeam
      );
    return sportMatches && teamMatches;
  });

  // teamsofsports

  const getTeamsOfSelectedSport = () => {
    if (!selectedSport) return [];

    const teamsOfSelectedSport = teamState.teams.filter(
      (team: any) => team.plays === selectedSport
    );

    return teamsOfSelectedSport.map((team: any) => team.name);
  };

  const teamNames = getTeamsOfSelectedSport();

  // teamsofprefereences

  const getPreferenceTeamsOfSelectedSport = () => {
    if (!selectedSport) return [];

    return preferences.teams.filter((team) => {
      const teamDetails = teams.find((t) => t.name === team);
      return teamDetails && teamDetails.plays === selectedSport;
    });
  };

  const isAuthenticated = !!localStorage.getItem("authToken");

  let preferTeamOfSelectedSport = [];

  if (isAuthenticated) {
    preferTeamOfSelectedSport = getPreferenceTeamsOfSelectedSport();

    if (preferTeamOfSelectedSport.length === 0) {
      preferTeamOfSelectedSport = getTeamsOfSelectedSport();
    }
  }

  return (
    <div className=" p-2 rounded-xl  bg-white border border-gray-200 shadow-sm">
      <div className=" bg-white ">
        {isAuthenticated &&
        preferences &&
        preferences.sports &&
        preferences.sports.length > 0 ? (
          <div className=" ">
            <select
              className="border p-3 border-gray-200 w-80  m-2 rounded-md bg-gray-100 "
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option className="border p-3 bg-gray-100" value="">
                Select Favorite Sport
              </option>
              {preferences &&
                preferences.sports &&
                preferences.sports.length > 0 &&
                preferences.sports.map((sport: string, index: number) => (
                  <option
                    className="border p-3 bg-gray-100"
                    key={index}
                    value={sport}
                  >
                    {sport}
                  </option>
                ))}
            </select>
            <br />
            <select
              className="border p-3 border-gray-200 w-80 m-2 rounded-md bg-gray-100 "
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="">Select Favorite Team</option>
              {preferTeamOfSelectedSport.map((team: any, index: number) => (
                <option className="bg-gray-100" key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          </div>
        ) : (
          <div>
            <select
              className="border p-3 border-gray-200 w-80 m-2 rounded-md bg-gray-100 "
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              <option className="bg-gray-100" value="">
                Select Favorite Sport
              </option>
              {sportState.sports &&
                sportState.sports.length > 0 &&
                sportState.sports.map((sport: any, index: number) => (
                  <option
                    className="bg-gray-100"
                    key={index}
                    value={sport.name}
                  >
                    {sport.name}
                  </option>
                ))}
            </select>
            <br />
            <select
              className="border p-3 border-gray-200 w-80 m-2 rounded-md bg-gray-100 "
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option className="bg-gray-100" value="">
                Select Favorite Team
              </option>
              {teamNames.map((team: any, index: number) => (
                <option className="bg-gray-100" key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          </div>
        )}
      </div>

      {articleState.isLoading ? (
        <div>Loading article..</div>
      ) : selectedSport ? (
        <div className="w-full my-5  max-h-[920px] relative overflow-y-scroll">
          {filteredArticles.map((article: any) => (
            <div>
              {/* card */}
              <div
                key={article.id}
                className="my-7 mx-2 max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
                  <Link key={article.id} to={`/account/articles/${article.id}`}>
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
      ) : (
        <div className="w-full my-5  max-h-[950px] relative overflow-y-scroll">
          {articleState.articles.map((article: any) => (
            <div>
              {/* card */}
              <div
                key={article.id}
                className="my-7 mx-2 max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
                  <Link key={article.id} to={`/account/articles/${article.id}`}>
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
      )}
    </div>
  );
};

export default FavouriteArticleFilter;
