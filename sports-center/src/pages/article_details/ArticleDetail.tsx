import React, { useEffect } from "react";
// import { getArticle } from "../../context/articles/action";
// import { useArticleDispatch } from "../../context/articles/context";
import { getArticle } from "../../context/article_details/action";
import { useArticleDispatch } from "../../context/article_details/context";

import ArticleItems from "./ArticleDetailsItems";
import { useParams } from "react-router-dom";
const ArticleDetail: React.FC = () => {
  const dispatchArticle = useArticleDispatch();
  const { articleID } = useParams();

  useEffect(() => {
    if (articleID) {
      getArticle(dispatchArticle, articleID);
    }
  }, [dispatchArticle, articleID]);
  return <ArticleItems />;
};
export default ArticleDetail;
