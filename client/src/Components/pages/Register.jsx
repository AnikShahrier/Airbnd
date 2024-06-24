import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    ev.preventDefault();
    await axios.post("http://localhost:4000/register", {
      name,
      email,
      password,
    });
  }
  return (
    <div className="p-4 py-6 grow flex items-center justify-around">
      <div className="mb-28">
        <h1 className="text-4xl text-center w-full py-4">Sign Up</h1>
        <form className="mt-2 max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button
            className="bg-black text-white primary border-2 border-black rounded-2xl py-2 px-3 my-2 w-full
       shadow-gray-300 hover:scale-x-90 shadow-lg transition duration-300 ease-in-out"
          >
            Sign up
          </button>
          <div className="text-center text-gray-500">
            Already have an account? Click here to{" "}
            <Link className="text-black underline" to={"/login"}>
              Log In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
