import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import BookingsPage from "./BookingsPage";
import PlacesPage from "./PlacesPage";
import axios from "axios";

const AccountPage = () => {
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  const [redirect, setredirect] = useState(null);
  async function logout() {
    try {
      await axios.post("/logout");

      setredirect("/");
      setUser(null);
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response ? error.response.data : error.message
      );
    }
  }
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading....";
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  const renderSubpage = () => {
    switch (subpage) {
      case "bookings":
        return <BookingsPage />;
      case "places":
        return <PlacesPage />;
      default:
        return <Link to={"/"} />;
    }
  };

  function linkClasses(type) {
    let classes = "py-2 px-6 ";
    if (type === subpage) {
      classes +=
        "text-white bg-black rounded-full shadow-md shadow-gray-300 hover:shadow-xl transition duration-300 ease-in-out";
    }
    return classes;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="p-4 ">
      <nav className="w-full flex justify-center mt-10 gap-2 mb-8">
        <Link className={linkClasses("profile")} to={"/account"}>
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center p-4 max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button
            onClick={logout}
            className="bg-black text-white primary border-2 border-black rounded-2xl py-2 px-3 my-4 w-full
         shadow-gray-300 hover:scale-x-90 shadow-lg transition duration-300 ease-in-out"
          >
            log out
          </button>
        </div>
      )}
      <div>{renderSubpage()}</div>
    </div>
  );
};

export default AccountPage;
