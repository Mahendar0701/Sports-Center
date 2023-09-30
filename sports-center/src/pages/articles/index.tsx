import MatchList from "../matches/MatchList";
import Preferences from "../preferences";
import ArticleList from "./ArticleList";
import FavouriteArticleList from "./Favorites";
import { TabsDefault } from "./Tabs";
//dont use
// import NewArticle from "./NewArticle";
// import SportList from "./SportList";
// import TeamList from "./TeamList";

const Articles = () => {
  return (
    <>
      <h2>Matches</h2>
      <MatchList />
      {/* <h2>Sports</h2>
      <SportList /> */}
      {/* <h2>TeamList</h2>
      <TeamList /> */}
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight">Articles</h2>
        {/* <NewArticle /> */}
        <Preferences />
      </div>
      {/* <ProjectList /> */}
      <h2>Favourites</h2>
      <FavouriteArticleList />
      <TabsDefault />

      <h2>Articles</h2>
      <ArticleList />
    </>
  );
};
export default Articles;
