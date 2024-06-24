import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="p-4 py-6 grow flex items-center justify-around">
      <div className="mb-28">
        <h1 className="text-4xl text-center w-full py-4">Sign In</h1>
        <form className="mt-2 max-w-md mx-auto">
          <input type="email" placeholder="example@email.com" />
          <input type="password" placeholder="password" />
          <button
            className="bg-black text-white primary border-2 border-black rounded-2xl py-2 px-3 my-2 w-full
         shadow-gray-300 hover:scale-x-90 shadow-lg transition duration-300 ease-in-out"
          >
            Sign in
          </button>
          <div className="text-center text-gray-500">
            Don't have an account yet? Click here to{" "}
            <Link className="text-black underline" to={"/register"}>
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
