/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useMatchState } from "../../context/matches/context";
// import { useMatchDispatch } from "../../context/matches/context";
import { Link } from "react-router-dom";

export default function MemberListItems() {
  const state: any = useMatchState();
  const [refresh, setRefresh] = useState(false);
  console.log(refresh);

  const handleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const { matches, isLoading, isError, errorMessage } = state;
  // console.log(user);

  if (matches.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {matches
        .filter((match: { isRunning: any }) => match.isRunning)
        .map((match: any) => (
          <div
            key={match.id}
            className="member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
              {match.sportName}
            </h5>
            <p className="mb-2  font-medium tracking-tight text-gray-900 dark:text-white">
              {match.name}
            </p>
            <p className="mb-2  font-medium tracking-tight text-gray-900 dark:text-white">
              {match.location}
            </p>
            <p className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
              {new Date(match.endsAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </p>
            <button
              id="delete-member-btn"
              type="submit"
              onClick={handleRefresh}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              refresh
            </button>
            <Link key={match.id} to={`/account/members/${match.id}`}>
              <button
                id="delete-member-btn"
                type="submit"
                // onClick={() => onSubmit({ id: match.id })}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                View
              </button>
            </Link>
          </div>
        ))}
    </>
  );
}
