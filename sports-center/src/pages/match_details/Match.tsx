import React, { useEffect } from "react";
import { getMatch } from "../../context/match_details/action";
import { useMatchDispatch } from "../../context/match_details/context";

import MatchItems from "./MatchItems";
import { useParams } from "react-router-dom";
const Match: React.FC = () => {
  const dispatchMatch = useMatchDispatch();
  const { matchID } = useParams();

  useEffect(() => {
    if (matchID) {
      getMatch(dispatchMatch, matchID);
    }
  }, [dispatchMatch, matchID]);
  return (
    <div>
      <MatchItems />
      <br />
    </div>
  );
};
export default Match;
