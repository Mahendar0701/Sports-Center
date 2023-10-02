import FavouriteArticleList from "../articles/Favorites";
import FavouriteArticleFilter from "./FavouriteArticleFilter";

const Favourites = () => {
  return (
    <>
      <div className="grid gap-3 grid-cols-2 mt-5">
        {/* <FavouriteArticleList /> */}
        <FavouriteArticleFilter />
      </div>
    </>
  );
};
export default Favourites;
