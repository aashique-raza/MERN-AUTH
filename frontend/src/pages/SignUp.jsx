import React from "react";
import { NavLink } from "react-router-dom";

function SignUp() {
  return (
    <div className=" max-w-96 mx-auto   shadow-lg mt-8 px-5  my-3 py-4">
      <h1 className="text-center text-slate-600 font-mono font-bold uppercase text-2xl mb-7">
        create acoount
      </h1>

      <form action="" className="flex gap-4  flex-col  mb-5 ">
        <input
          type="text"
          className="py-2 px-4 bg-slate-300 text-gray-700 capitalize border-none outline-none  placeholder:text-slate-800  w-full"
          placeholder="username"
        />
        <input
          type="email"
          className="py-2 px-4 bg-slate-300 text-gray-700 capitalize border-none outline-none w-full placeholder:text-slate-800"
          placeholder="email"
        />
        <input
          type="password"
          className="py-2 px-4 bg-slate-300 text-gray-700 capitalize border-none outline-none w-full placeholder:text-slate-800"
          placeholder="password"
        />
        <button className="w-full  py-3 px-4  bg-slate-900 text-white uppercase text-1xl font-mono font-semibold">
          create account
        </button>
      </form>
      <div className="w-full">
        <button className=" mb-4 w-full py-3 px-4  bg-red-500 text-white uppercase text-1xl font-mono font-semibold">create account with google</button>
      </div>

      <div>
        have an account?
        <NavLink className="font-bold text-gray-400">click here</NavLink>
      </div>
    </div>
  );
}

export default SignUp;
