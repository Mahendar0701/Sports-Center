import Articles from "../articles";
import ArticleContainer from "../articles/ArticleContainer";
import ArticleFilter from "../filter";
import Matches from "../matches";

const Dashboard = () => {
  return (
    <>
      <div className=" p-5 border border-gray-100 shadow-sm rounded-md ">
        <Matches />
      </div>

      <div className=" mt-5 p-5 border border-gray-100 shadow-sm rounded-md">
        <div className="flex flex-wrap">
          <div className="w-full  md:w-3/4 max-h-[1300px]   ">
            <h2 className="text-2xl font-medium tracking-tight">Your News</h2>
            <Articles />
          </div>
          <div className="w-full px-0  md:w-1/4 max-h-[1300px] ">
            <h2 className="text-2xl font-medium tracking-tight mb-5">Filter</h2>
            <ArticleFilter />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
