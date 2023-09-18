// import React, { useState } from "react";
// import { API_ENDPOINT } from "../../config/constants";
// import { useNavigate } from "react-router-dom";

// const SigninForm: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   // Then we will define the handle submit function
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const response = await fetch(`/${API_ENDPOINT}users/sign_in`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error("Sign-in failed");
//       }

//       console.log("Sign-in successful");

//       // Extract the response body as JSON data
//       const data = await response.json();
//       console.log("data", data);

//       // After successful signin, first we will save the token in localStorage
//       localStorage.setItem("authToken", data.auth_token);
//       localStorage.setItem("userData", JSON.stringify(data.user));
//       // navigate("/dashboard");
//       navigate("/account");

//       // After successful signin we have to redirect the user to the secured page. We will do that later.
//     } catch (error) {
//       console.error("Sign-in failed:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">Email:</label>
//         <input
//           type="email"
//           name="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//         />
//       </div>
//       <div>
//         <label className="block text-gray-700 font-semibold mb-2">
//           Password:
//         </label>
//         <input
//           type="password"
//           name="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
//       >
//         Sign In
//       </button>
//     </form>
//   );
// };

// export default SigninForm;

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
  preferences?: {
    sports: string[]; // Assuming sports are represented as strings
    teams: string[]; // Assuming teams are represented as strings
  };
};

const SigninForm = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [error] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, password, preferences } = data;
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, preferences: ["cricket"] }),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed");
      }
      // console.log("Sign-in successful",data);

      const data = await response.json();
      console.log("Sign-in successful", data);
      // After successful signin, first we will save the token in localStorage
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      // return navigate("/dashboard");
      navigate("/account");
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };
  return (
    // <form onSubmit={handleSubmit}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {error && <span>{error}</span>}
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        {/* <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        /> */}
        <input
          id="email"
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
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        /> */}
        <input
          id="password"
          type="password"
          placeholder="Enter project name..."
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
        Sign In
      </button>
    </form>
  );
};

export default SigninForm;
