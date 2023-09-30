import React, { useEffect } from "react";
import { getArticle } from "../../context/article_details/action";
import { useArticleDispatch } from "../../context/article_details/context";

import ArticleItems from "./ArticleItems";
import { useParams } from "react-router-dom";
const Article: React.FC = () => {
  const dispatchArticle = useArticleDispatch();
  const { articleID } = useParams();

  useEffect(() => {
    if (articleID) {
      getArticle(dispatchArticle, articleID);
    }
  }, [dispatchArticle, articleID]);
  return (
    <div>
      <ArticleItems />
      <br />
    </div>
  );
};
export default Article;
