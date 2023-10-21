import { useNavigate } from "react-router-dom";
import { useArticleDetailsState } from "../../context/article_details/context";
import { Transition, Dialog } from "@headlessui/react";
import { useState, useEffect, Fragment } from "react";

export default function ArticleItems() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const navigate = useNavigate();

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  const articleDetailsState: any = useArticleDetailsState();
  const { articles, isLoading, isError, errorMessage } = articleDetailsState;

  if (articles.length === 0 && isLoading) {
    return <span>Loading article...</span>;
  }
  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 opacity-30" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-gray-900 mb-4"
                >
                  {articleDetailsState.articles.sport.name}
                </Dialog.Title>

                {articleDetailsState.isLoading ? (
                  <div className="text-center text-gray-700 dark:text-gray-300">
                    Loading article...
                  </div>
                ) : articleDetailsState.articles ? (
                  <div className="grid gap-4 mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="text-xl font-bold">
                      {articleDetailsState.articles.title}
                    </h5>
                    <p className="font-medium">
                      {articleDetailsState.articles.summary}
                    </p>
                    <img
                      src={articleDetailsState.articles.thumbnail}
                      alt={articleDetailsState.articles.title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    <p className="font-medium">
                      {new Date(
                        articleDetailsState.articles.date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      })}
                    </p>
                    <p className="text-lg">
                      {articleDetailsState.articles.content}
                    </p>
                    {articleDetailsState.articles.teams.length > 0 ? (
                      <ul className="text-gray-600">
                        <li>Teams:</li>
                        {articleDetailsState.articles.teams.map((team) => (
                          <li>{team.name}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : (
                  <div className="text-center text-red-600 dark:text-red-400">
                    Failed to load article.
                  </div>
                )}

                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center px-6 py-3 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
