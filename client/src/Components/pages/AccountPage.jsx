import React from "react";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import BookingsPage from "./BookingsPage";
import PlacesPage from "./PlacesPage";

const AccountPage = () => {
  const { ready, user } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!ready) {
    return "Loading....";
  }
  if (ready && !user) {
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
  return (
    <div className="p-4 ">
      <nav className="w-full flex justify-center mt-10 gap-2">
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
      <div>{renderSubpage()}</div>
    </div>
  );
};

export default AccountPage;
