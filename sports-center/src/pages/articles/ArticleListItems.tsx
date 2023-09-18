/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from "react";

// First, I'll import the useProjectsState custom hook to access projects state.
import { useArticleState } from "../../context/articles/context";
import { SubmitHandler } from "react-hook-form";
import { useArticleDispatch } from "../../context/articles/context";
import { Link, useNavigate } from "react-router-dom";
import { Transition, Dialog } from "@headlessui/react";
// import { removeMember } from "../../context/articles/action";

type Inputs = {
  id: number;
};
export default function ArticleListItems() {
  // I'll define a new constant called `state`, to call the useProjectsState() hook,
  // and get access to projects state.
  const state: any = useArticleState();

  const dispatchArticle = useArticleDispatch();

  const { articles, isLoading, isError, errorMessage } = state;
  console.log(articles);
  const [isOpen, setIsOpen] = useState(false);

  // Set isOpen to true when component mounts
  // useEffect(() => {
  //   setIsOpen(true);
  // }, []);

  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }
  // console.log(user);

  if (articles.length === 0 && isLoading) {
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
      {articles.map((article: any) => (
        <div
          key={article.id}
          className="member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
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
          <img
            src={article.thumbnail}
            className="w-52 float-right float-top h-48"
            alt="Image Description"
          />
          {/* Display teams here */}
          {/* <div className="mb-2 font-medium tracking-tight text-gray-900 dark:text-white"> */}
          <h1>Teams</h1>
          <ul>
            {article.teams.map((team: any) => (
              <li key={team.id}>{team.name}</li>
            ))}
          </ul>
          {/* </div> */}

          <Link key={article.id} to={`${article.id}`}>
            <button
              id="delete-member-btn"
              type="submit"
              onClick={() => setIsOpen(true)}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              read more
            </button>
          </Link>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-50"
                leave="ease-in duration-200"
                leaveFrom="opacity-50"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-50 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-50 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Task Details
                      </Dialog.Title>
                      <div className="mt-2">
                        <h1>Arucle details</h1>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      ))}
    </>
  );
}
