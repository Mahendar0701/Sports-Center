interface Team {
  id: number;
  name: string;
}

interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  startsAt: string;
  endsAt: string;
  isRunning: boolean;
  score: Record<string, string>;
  story: string;
  teams: Team[];
}

export interface MatchState {
  matches: Match;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type MatchActions =
  | { type: "FETCH_MATCHES_REQUEST" }
  | { type: "FETCH_MATCHES_SUCCESS"; payload: Match }
  | { type: "FETCH_MATCHES_FAILURE"; payload: string };
//   | { type: "ADD_MEMBERS_SUCCESS"; payload: Article }
//   | { type: "DELETE_MEMBER_SUCCESS"; payload: Article[] };

export const initialState: MatchState = {
  matches: {
    id: 0,
    name: "",
    location: "",
    sportName: "",
    endsAt: "",
    isRunning: false,
    startsAt: "",
    score: {},
    story: "",
    teams: [],
  },
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Then we will pass the `initialState` object to the `state` of reducer function.

export const reducer = (
  state: MatchState = initialState,
  action: MatchActions
): MatchState => {
  switch (action.type) {
    case "FETCH_MATCHES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_MATCHES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
      };
    case "FETCH_MATCHES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
