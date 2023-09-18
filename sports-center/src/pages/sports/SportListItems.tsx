/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

// First, I'll import the useProjectsState custom hook to access projects state.
import { useSportState } from "../../context/sports/context";
import { SubmitHandler } from "react-hook-form";
import { useSportDispatch } from "../../context/sports/context";
// import { removeMember } from "../../context/articles/action";

type Inputs = {
  id: number;
};
export default function SportListItems() {
  // I'll define a new constant called `state`, to call the useProjectsState() hook,
  // and get access to projects state.
  const state: any = useSportState();

  const dispatchSport = useSportDispatch();

  const { sports, isLoading, isError, errorMessage } = state;
  console.log("sports", sports.sports);
  // console.log(user);

  if (sports.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  // if (Members.length === 0) {
  //   throw Error("Error!!!");
  // }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // const { id } = data;
    // // await removeUser(dispatchUsers, 1278);
    // const response = await removeMember(dispatchMembers, { id });
    // // Then depending on response, I'll either close the modal...
    // if (response.ok) {
    //   console.log("Removeed member");
    // } else {
    //   // Or I'll set the error.
    //   console.log(" not Removeed member");
    // }
  };

  return (
    <>
      {sports.map((Sport: any) => (
        <div
          key={Sport.id}
          className="member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {Sport.name}
          </h5>
          {/* <p className="mb-2  font-medium tracking-tight text-gray-900 dark:text-white">
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
            onClick={() => onSubmit({ id: match.id })}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            refresh
          </button> */}
        </div>
      ))}
    </>
  );
}
