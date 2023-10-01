/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from "react";
// import { API_ENDPOINT } from "../../config/constants";
// import { useNavigate } from "react-router-dom";

// const SignupForm: React.FC = () => {
//   //   const [organisationName, setOrganisationName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userPassword, setUserPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`${API_ENDPOINT}/users`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: userName,
//           email: userEmail,
//           password: userPassword,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Sign-up failed");
//       }
//       console.log("Sign-up successful");
//       // extract the response body as JSON data
//       const data = await response.json();

//       // if successful, save the token in localStorage
//       localStorage.setItem("authToken", data.token);
//       localStorage.setItem("userData", JSON.stringify(data.user));
//       navigate("/account");
//     } catch (error) {
//       console.error("Sign-up failed:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">
//           Your Name:
//         </label>
//         <input
//           type="text"
//           name="userName"
//           id="userName"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Email:</label>
//         <input
//           type="email"
//           name="userEmail"
//           id="userEmail"
//           value={userEmail}
//           onChange={(e) => setUserEmail(e.target.value)}
//           className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">
//           Password:
//         </label>
//         <input
//           type="password"
//           name="userPassword"
//           id="userPassword"
//           value={userPassword}
//           onChange={(e) => setUserPassword(e.target.value)}
//           className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
//       >
//         Sign up
//       </button>
//     </form>
//   );
// };

// export default SignupForm;

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  // user_name: string;
  email: string;
  password: string;
  preferences?: {
    sports: string[]; // Assuming sports are represented as strings
    teams: string[]; // Assuming teams are represented as strings
  };
};

const SignupForm = () => {
  const [error] = useState(null);
  console.log(error);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, email, password, preferences } = data;
    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          // user_name,
          email,
          password,
          preferences,
        }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      console.log("Sign-up successful");

      // After successful signup we have to redirect the user to the secured page. We will do that later.
      // extract the response body as JSON data
      const data = await response.json();
      // if successful, save the token in localStorage
      //   localStorage.setItem("authenticated", "true");
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("authenticated", "true");
      // return navigate("/dashboard");
      navigate("/account");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    <div>
      <div>
        <h1>Have an account </h1>
        <a
          href="/signin"
          id="logout-link"
          className="px-3 py-1 my-3 bg-red-200 hover:bg-red-300 rounded"
          // onClick={logoutHandle}
        >
          Sign in
        </a>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div>
        {error && <span>{error}</span>}
        <label className="block text-gray-700 font-semibold mb-2">Name:</label> */}
        {/* <input
          type="text"
          name="organisationName"
          id="organisationName"
          value={organisationName}
          onChange={(e) => setOrganisationName(e.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        /> */}
        {/* <input
          id="organisationName"
          type="text"
          placeholder="Enter Organization name..."
          autoFocus
          {...register("name", { required: true })}
          className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
            errors.name ? "border-red-500" : ""
          }`}
        />
      </div> */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Your Name:
          </label>
          {/* <input
          type="text"
          name="userName"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        /> */}
          <input
            id="userName"
            type="text"
            placeholder="Enter User name..."
            autoFocus
            {...register("name", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.name ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Email:
          </label>
          {/* <input
          type="email"
          name="userEmail"
          id="userEmail"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        /> */}
          <input
            id="userEmail"
            type="text"
            placeholder="Enter email..."
            autoFocus
            {...register("email", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.email ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Password:
          </label>
          {/* <input
          type="password"
          name="userPassword"
          id="userPassword"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        /> */}
          <input
            id="userPassword"
            type="password"
            placeholder="Enter password..."
            autoFocus
            {...register("password", { required: true })}
            className={`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.password ? "border-red-500" : ""
            }`}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
