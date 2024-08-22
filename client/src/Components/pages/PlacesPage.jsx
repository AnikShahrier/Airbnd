import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Pearks from "../Pearks";
import PhotoUpload from "../PhotoUpload";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, settitle] = useState("");
  const [address, setaddress] = useState("");
  const [addedPhotos, setaddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState("1");

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  return (
    <div className="p-2">
      {action !== "new" && (
        <div className="text-center">
          <Link
            className=" inline-flex gap-2 bg-black text-white py-2 px-6 rounded-full shadow-sm shadow-gray-500 hover:shadow-xl transition duration-300 ease-in-out"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                clip-rule="evenodd"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            {preInput("Title", "short title for your place")}

            <input
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              style={{ transform: "scaleX(1)", transition: "none" }}
              type="text"
              placeholder="My apartment"
            />
            {preInput("Address", "Address to this place")}

            <input
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              style={{ transform: "scaleX(1)", transition: "none" }}
              type="text"
              placeholder="Address to this apartment"
            />
            {preInput("Photos", "more = better")}

            <PhotoUpload
              addedPhotos={addedPhotos}
              setAddedPhotos={setaddedPhotos}
            />
            {preInput("Description", "tell us about your place")}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              className="border bg-transparent rounded-2xl w-full my-1 px-3 py-2"
            />
            {preInput("Features", "select all the facilities you can offer")}
            <Pearks selected={features} onChange={setFeatures} />

            {preInput(
              "Extra Information",
              "tell us anything unique about your place"
            )}

            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
              className="border bg-transparent rounded-2xl w-full my-1 px-3 py-2"
            />
            {preInput("Check In & Check Out", "Tell us when it's available")}

            <div className="flex gap-2">
              <input
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                className="border bg-transparent rounded-2xl w-full my-1 px-3 py-2 "
                type="time"
                placeholder="Check In Time"
              />

              <input
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                className="border bg-transparent rounded-2xl w-full my-1 px-3 py-2 "
                type="time"
                placeholder="Check Out Time"
              />
              <input
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
                className="border bg-transparent rounded-2xl w-full my-1 px-3 py-2 "
                type="number"
                placeholder="Maximum number of guests"
                min="0"
                max="20"
              />
            </div>
            <button className="bg-black text-white w-full border my-1 py-2 px-3 rounded-2xl mt-4">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
