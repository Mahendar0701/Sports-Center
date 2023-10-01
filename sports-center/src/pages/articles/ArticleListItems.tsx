/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useArticleState } from "../../context/articles/context";
// import { useArticleDispatch } from "../../context/articles/context";
import { Link } from "react-router-dom";

export default function ArticleListItems() {
  const state: any = useArticleState();

  const { articles, isLoading, isError, errorMessage } = state;
  console.log(articles);

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

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
          <h1>Teams</h1>
          <ul>
            {article.teams.map((team: any) => (
              <li key={team.id}>{team.name}</li>
            ))}
          </ul>

          <Link key={article.id} to={`${article.id}`}>
            <button
              id="delete-member-btn"
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              read more
            </button>
          </Link>
        </div>
      ))}
    </>
  );
}
