import React, { useEffect } from "react";
// import { getArticle } from "../../context/articles/action";
// import { useArticleDispatch } from "../../context/articles/context";
import { getArticleDetails } from "../../context/article_details/action";
import { useArticleDetailsDispatch } from "../../context/article_details/context";

import ArticleItems from "./ArticleDetailsItems";
import { useParams } from "react-router-dom";
const ArticleDetail: React.FC = () => {
  const dispatchArticleDetails = useArticleDetailsDispatch();
  const { articleID } = useParams();

  useEffect(() => {
    if (articleID) {
      getArticleDetails(dispatchArticleDetails, articleID);
    }
  }, [dispatchArticleDetails, articleID]);
  return <ArticleItems />;
};
export default ArticleDetail;
