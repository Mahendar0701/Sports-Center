import { Link } from "react-router-dom";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/action";
import { useEffect } from "react";

const ProfileContainer = () => {
  const userData = localStorage.getItem("userData") ?? "";
  const userProfile = JSON.parse(userData);
  const preferencesState: any = usePreferencesState();
  const dispatchPreferences = usePreferencesDispatch();
  useEffect(() => {
    fetchPreferences(dispatchPreferences);
  }, []);
  const { preferences, isLoading2, isError2, errorMessage2 } = preferencesState;
  if (isLoading2) {
    return <span>Loading preferences...</span>;
  }
  if (isError2) {
    return <span>{errorMessage2}</span>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md border-2  border-gray-300  p-6 max-w-md mx-auto mt-8">
      <div className="text-center mb-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="User Profile"
          className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500"
        />
        <h1 className="text-2xl font-semibold text-gray-800 mt-2">
          {userProfile.name}
        </h1>
      </div>

      <p className="text-gray-600 text-center">{userProfile.email}</p>

      <div className="flex justify-around mt-8">
        <div>
          <h2 className="mx-3 text-lg font-semibold text-gray-800 mb-2">
            Favorite Teams:
          </h2>
          {preferences && preferences.teams && preferences.teams.length > 0 ? (
            <ul className="text-gray-600 ml-4">
              {preferences.teams.map((team, index) => (
                <li key={index}>{team}</li>
              ))}
            </ul>
          ) : (
            <p>No favorite teams</p>
          )}
        </div>

        <div>
          <h2 className=" mx-3 text-lg font-semibold text-gray-800 mb-2">
            Favorite Sports:
          </h2>
          {preferences &&
          preferences.sports &&
          preferences.sports.length > 0 ? (
            <ul className="text-gray-600 ml-4">
              {preferences.sports.map((sport, index) => (
                <li key={index}>{sport}</li>
              ))}
            </ul>
          ) : (
            <p>No favorite sports </p>
          )}
        </div>
      </div>

      <Link
        to="changePassword"
        className="block text-blue-500 hover:underline mt-8 text-center"
      >
        Change Password
      </Link>
    </div>
  );
};

export default ProfileContainer;
