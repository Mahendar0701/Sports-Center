import React from "react";

import ArticleDetails from "./ArticlesDetails";

import { Outlet } from "react-router-dom";

const ArticleDetailsIndex: React.FC = () => {
  return (
    <>
      <ArticleDetails />
      <Outlet />
    </>
  );
};

export default ArticleDetailsIndex;
