import React, { useEffect, useReducer } from "react";
import { API_ENDPOINT } from "../../config/constants";

// Define interfaces for state and action
interface State {
  sports: Sport[];
  isLoading: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

interface Sport {
  id: number;
  name: string;
}

// Reducer function to manage state updates
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "API_CALL_START":
      return {
        ...state,
        isLoading: true,
      };
    case "API_CALL_END":
      return {
        ...state,
        isLoading: false,
        sports: action.payload,
      };
    case "API_CALL_ERROR":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const SportList: React.FC = () => {
  // Initialize state using useReducer
  const [state, dispatch] = useReducer(reducer, {
    sports: [],
    isLoading: false,
  });

  // Fetch projects when the component mounts
  useEffect(() => {
    const fetchSports = async () => {
      const token = localStorage.getItem("authToken") ?? "";

      try {
        dispatch({ type: "API_CALL_START" });

        const response = await fetch(`${API_ENDPOINT}/sports`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        dispatch({ type: "API_CALL_END", payload: data.sports });
      } catch (error) {
        console.log("Error fetching Sports:", error);
        dispatch({ type: "API_CALL_ERROR" });
      }
    };

    fetchSports();
  }, []);

  return (
    <div>
      {state.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4 grid-cols-4 mt-5">
          {state.sports.map((Sport) => (
            <div
              key={Sport.id}
              className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                {Sport.name}
              </h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SportList;
