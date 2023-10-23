import { Fragment, useEffect, useState } from "react";
import { useArticleState } from "../../context/articles/context";
import { Link } from "react-router-dom";
import { usePreferencesState } from "../../context/preferences/context";
import { useSportState } from "../../context/sports/context";
import { useMatchState } from "../../context/matches/context";
import { API_ENDPOINT } from "../../config/constants";
import { ArrowPathIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function FavouriteListItems() {
  //   const [selectedSport, setSelectedSport] = useState<string | null>("Trending");

  const articleState: any = useArticleState();
  const sportState: any = useSportState();
  const matchState: any = useMatchState();
  const preferencesState: any = usePreferencesState();

  const { articles, isLoading, isError, errorMessage } = articleState;
  const { sports, isLoading1, isError1, errorMessage1 } = sportState;
  const { preferences, isLoading2, isError2, errorMessage2 } = preferencesState;
  const { matches, isLoading3, isError3, errorMessage3 } = matchState;

  if (isLoading || isLoading1 || isLoading2) {
    return <span>Loading articles...</span>;
  }
  if (isError || isError1 || isError2) {
    return <span>{errorMessage || errorMessage1 || errorMessage2}</span>;
  }

  let filteredArticles: any[] = [];
  preferences.articles.forEach((preferenceArticleId) => {
    articles.forEach((article) => {
      if (article.id == preferenceArticleId) {
        console.log(article);
        filteredArticles.push(article);
      }
    });
  });

  let filteredMatches = [];
  preferences.matches.forEach((preferenceMatchId) => {
    matches.forEach((match) => {
      if (match.id == preferenceMatchId) {
        console.log(match);
        filteredMatches.push(match);
      }
    });
  });

  console.log("filteredArticles", filteredArticles);
  console.log("filteredMatches", filteredMatches);

  return (
    <div className="flex ">
      <div>
        <p>Saved articles</p>
        {isLoading ? (
          <div>Loading...</div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex h-[10vh] items-center justify-center">
            <div className="text-xl font-semibold text-gray-600">
              Articles not available
            </div>
          </div>
        ) : (
          <div className="my-5 max-h-[1090px] max-w-[56rem] relative overflow-y-scroll bg-gray-50 p-5 rounded-xl">
            {filteredArticles.map((article: any) => (
              <div
                key={article.id}
                style={{ height: "300px" }}
                className="my-5 relative flex w-full max-w-[56rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
              >
                <div className="relative m-0 w-80 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
                  <Link to={`articles/${article.id}`}>
                    <img
                      src={article.thumbnail}
                      alt="image"
                      className="h-full w-80 object-cover"
                    />
                  </Link>
                </div>
                <div className="p-5 relative">
                  <p className="absolute bottom-5 left-4 font-semibold inset-x-4">
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </p>
                  <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                    {article.sport.name}
                  </h6>
                  <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    {article.title}
                  </h4>
                  <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                    {article.summary}
                  </p>

                  <Link key={article.id} to={`articles/${article.id}`}>
                    <button
                      className="absolute bottom-4 right-4 bg-white p-2  hover:bg-pink-100 focus:outline-none focus:ring-2 focus:ring-pink-200  transform hover:scale-110 active:bg-pink-200 flex items-center rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                        className="h-4 w-4 ml-1"
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
      <div className="mx-10">
        <p>saved matches</p>
        {filteredMatches
          .filter((match) => match)
          .map((match: any) => (
            <div key={match.id} className="">
              <div className="py-3">{<MatchCard matchID={match.id} />}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

const MatchCard = ({ matchID }: { matchID: number }) => {
  const [getScores, setGetScores] = useState(false);
  const [match, setMatch] = useState<string>();
  console.log(match);

  const fetchMatch = async () => {
    setGetScores(true);
    await fetch(`${API_ENDPOINT}/matches/${matchID}`)
      .then((res) => res.json())
      .then((data) => {
        setMatch(data);
        setGetScores(false);
      });
  };

  useEffect(() => {
    fetchMatch();
  }, [matchID]);

  return match ? (
    <div
      key={match.id}
      className="border p-5 h-52 w-92 rounded-md shadow-sm hover:shadow-md"
    >
      <div className="flex flex-col justify-between h-full">
        <Link to={`matches/${match.id}`}>
          <div>
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-xl font-semibold text-blue-800 uppercase antialiased">
                {match.sportName}
              </h1>

              <div className="flex items-center">
                <div className="relative inline-flex mr-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                </div>
                <p className="text-green-500 animate-pulse">Live</p>
              </div>
            </div>

            <div className="flex items-center ">
              <MapPinIcon className="w-4 h-4 mr-1" />
              <p>{match.location}</p>
            </div>

            <div className="flex space-x-4 my-5">
              <p className="text-lg font-semibold">{match?.teams[0].name}</p>
              <div className="">
                <p className="text-green-600 text-xl font-bold">
                  {match?.score[match?.teams[0].name]}
                </p>
              </div>
              <p className="font-semibold text-gray-900 p-1">VS</p>
              <div className="">
                <p className="text-green-600 text-xl font-bold">
                  {match?.score[match?.teams[1].name]}
                </p>
              </div>
              <p className="text-lg font-semibold">{match?.teams[1].name}</p>
            </div>
          </div>
        </Link>

        <div className="flex justify-between items-center">
          <p className="text-md">
            {new Date(match.endsAt).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <button onClick={fetchMatch}>
            <ArrowPathIcon
              className={`w-6 h-6 text-black transform ${
                getScores && "rotate-180"
              } transition-all`}
            />
          </button>
        </div>
      </div>
    </div>
  ) : null;
};