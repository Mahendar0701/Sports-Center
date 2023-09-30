// import React from "react";

const NotFound = () => {
  return (
    <div>
      <h2>404 Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <button className="w-15 bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4">
        <a href="/">Return to homepage</a>
      </button>
    </div>
  );
};

export default NotFound;
