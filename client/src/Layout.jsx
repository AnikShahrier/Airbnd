import React from "react";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen p">
      <Header />

      <Outlet />
    </div>
  );
};

export default Layout;
