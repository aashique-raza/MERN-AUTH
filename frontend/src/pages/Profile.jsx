import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className=" mx-auto my-7 border-2 border-teal-600 px-6  py-3 shadow-lg font-extrabold w-96 ">
      <h1 className=" text-center uppercase text-3xl text-teal-800 font-mono mb-6">
        profile
      </h1>

      <div className="flex justify-center items-center ">
        <img
          src={currentUser.profilePicture}
          alt="proifle"
          className=" rounded-full h-24 w-24 "
        />
      </div>

      <form action="" className="w-full  mt-4 ">
        <input
          type="text"
          className=" w-full py-2 px-3 bg-slate-200 text-teal-800 text-xl font-mono font-medium mb-3"
          placeholder="username"
          value={currentUser.username}
        />
        <input
          type="text"
          className=" w-full py-2 px-3 bg-slate-200 text-teal-800 text-xl font-mono font-medium mb-3"
          placeholder="email"
          value={currentUser.email}
        />
        <input
          type="text"
          className=" w-full py-2 px-3 bg-slate-200 text-teal-800 text-xl font-mono font-medium mb-3"
          placeholder="password"
        />
        <button
          type="button"
          className=" w-full py-2 px-3 bg-slate-900 b text-teal-100 text-1xl font-serif   mb-3  uppercase"
        >
          update
        </button>
      </form>
      <div className="flex  justify-between items-center">
        <Link className=" text-red-600 capitalize font-medium text-1xl">
          delete account
        </Link>
        <Link className=" text-red-600 capitalize font-medium text-1xl">
          {" "}
          sign out
        </Link>
      </div>
    </div>
  );
}

export default Profile;
