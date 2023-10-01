/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useArticleState } from "../../context/articles/context";
// import { useArticleDispatch } from "../../context/articles/context";
import { Link } from "react-router-dom";

export default function ArticleListItems() {
  const state: any = useArticleState();

  // const dispatchArticle = useArticleDispatch();

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
        <div key={article.id} className="mb-8 w-full">
          {/* card */}
          <div
            key={article.id}
            style={{ height: "345px" }}
            className="relative flex w-full max-w-[76rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
          >
            <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
              <img
                src={article.thumbnail}
                alt="image"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                {article.sport.name}
              </h6>
              <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {article.title}
              </h4>
              <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                {article.summary}
              </p>
              <Link key={article.id} to={`${article.id}`}>
                <button
                  className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
                    className="h-4 w-4"
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
        </div>
      ))}
    </>
  );
}
