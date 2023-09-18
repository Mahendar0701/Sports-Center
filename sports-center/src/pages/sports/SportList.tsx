import React, { useEffect } from "react";
import { fetchSports } from "../../context/sports/action";

// So, let's import the useProjectsDispatch custom hook.
import { useSportDispatch } from "../../context/sports/context";

// I'll import the ProjectListItems component from the same folder.
// This I'll define next.
import SportListItems from "./SportListItems";
// import matches from ".";
// import SportSlider from "./SportSlider";
const SportList: React.FC = () => {
  // I'll define a new constant called dispatchProjects,
  // to call the useProjectsDispatch() hook.
  const dispatchSport = useSportDispatch();

  useEffect(() => {
    // And I'll pass the `dispatchProjects` to `fetchProjects` function.
    fetchSports(dispatchSport);
  }, []);
  return (
    <div className="grid gap-4 grid-cols-4 mt-5 mr-52">
      {/*To keep this file clean, I'll move all the logic to access the projects
       from our app-state, to a new component ProjectListItems */}
      <SportListItems />
      {/* <MatchSlider /> */}
      <br />
    </div>
  );
};
export default SportList;
