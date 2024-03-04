import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-300  w-full flex justify-between items-center px-20 py-3">
      <NavLink className="text-slate-800 font-bold text-2xl uppercase text-pretty font-mono">
        <h1>auth app</h1>
      </NavLink>

      <ul className="flex gap-4 items-center">
        <li className=" list-none">
          <NavLink
            className="text-slate-600  text-xl  capitalize text-pretty font-mono"
            to={"/"}
          >
            home
          </NavLink>
        </li>
        <li className=" list-none">
          <NavLink
            className="text-slate-600  text-xl capitalize text-pretty font-mono"
            to={"/about"}
          >
            about
          </NavLink>
        </li>
        <li className=" list-none">
          {currentUser ? (
            <NavLink to={'/profile'}>
                <img src={currentUser.profilePicture} alt="profile" className=" h-7 w-7 rounded-full object-cover" />
            </NavLink>
          ) : (
            <NavLink
              className="text-slate-600  text-xl capitalize text-pretty font-mono"
              to={"/sign-in"}
            >
              signin
            </NavLink>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
