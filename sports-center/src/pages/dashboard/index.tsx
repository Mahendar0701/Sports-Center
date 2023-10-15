import Articles from "../articles";
import ArticleContainer from "../articles/ArticleContainer";
import Favourites from "../favourites";
import Matches from "../matches";

const Dashboard = () => {
  return (
    <>
      {/* <h2>Matches</h2> */}
      <Matches />
      {/* <ArticleContainer /> */}

      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight">Your News</h2>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full  md:w-3/4 max-h-[1500px]   ">
          <Articles />
        </div>
        <div className="w-full px-0  md:w-1/4 max-h-[1500px] ">
          <h2>Favourites</h2>
          <Favourites />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
