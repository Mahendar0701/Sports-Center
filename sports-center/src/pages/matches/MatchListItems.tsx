/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useMatchState } from "../../context/matches/context";
import { Link } from "react-router-dom";
import {
  CalendarDaysIcon,
  MapPinIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { API_ENDPOINT } from "../../config/constants";

export default function MemberListItems() {
  const matchState: any = useMatchState();
  const { matches, isLoading, isError, errorMessage } = matchState;

  // if (matches.length === 0) {
  //   throw Error("Error!!!");
  // }

  if (matches.length === 0 && isLoading) {
    return <span>Loading matches...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {matches
        .filter((match) => match.isRunning)
        .map((match: any) => (
          <div key={match.id} className="">
            <div className="py-3">
              {match.isRunning && <MatchCard matchID={match.id} />}
            </div>
          </div>
        ))}
    </>
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
        <Link to={`/account/matches/${match.id}`}>
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
