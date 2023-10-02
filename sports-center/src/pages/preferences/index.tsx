import PreferenceList from "./PreferenceList";

const Preferences = () => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return <>{isAuthenticated && <PreferenceList />}</>;
};
export default Preferences;
