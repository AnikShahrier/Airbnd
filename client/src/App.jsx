import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/pages/Login";
import Layout from "./Layout";
import Register from "./Components/pages/Register";
import axios from "axios";
import IndexPage from "./Components/pages/IndexPage";
import { UserContextProvider } from "./UserContext";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
function app() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default app;
