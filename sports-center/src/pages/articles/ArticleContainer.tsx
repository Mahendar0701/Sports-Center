import { useEffect } from "react";
import { useArticleDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/action";
import { Outlet } from "react-router-dom";
import { useMatchDispatch } from "../../context/matches/context";
import { fetchMatches } from "../../context/matches/action";

const ArticleContainer = () => {
  const articleDispatch = useArticleDispatch();
  const matcheDispatch = useMatchDispatch();
  useEffect(() => {
    fetchArticles(articleDispatch);
    fetchMatches(matcheDispatch);
  }, [articleDispatch, matcheDispatch]);
  return <Outlet />;
};

export default ArticleContainer;
