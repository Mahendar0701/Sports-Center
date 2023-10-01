import FavouriteArticleList from "../articles/Favorites";
import FavouriteArticleTabList from "../articles/FavoritesTab";
import MatchList from "../matches/MatchList";

const Dashboard = () => {
  return (
    <>
      <h2>Matches</h2>
      <MatchList />
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight">Articles</h2>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full  md:w-3/4 max-h-[1500px]   ">
          <h2>Articles</h2>
          {/* <ArticleList /> */}
          <FavouriteArticleTabList />
        </div>
        <div className="w-full px-2  md:w-1/4 max-h-[1500px] ">
          <h2>Favourites</h2>
          <FavouriteArticleList />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
