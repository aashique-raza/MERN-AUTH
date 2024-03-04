import React from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { useState } from "react";
import {signInFailure,signInStart,signInSuccess} from '../features/userSlice'
import {useDispatch,useSelector} from "react-redux"
import Oauth from "../components/Oauth";


function SignUp() {
  const [formData, setformData] = useState({});
  const [error, setEroor] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const handleOnchange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
    // console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await resp.json();
      if (result.success===false) {
        setLoading(false);
        setEroor(result.message);
        return
      }

      
      
      navigate('/sign-in')

      console.log(result);
    } catch (error) {
      console.log(`signup data sending failed`);
      setEroor(error.message);
    }
  };

  return (
    <div className=" max-w-96 mx-auto   shadow-lg mt-8 px-5  my-3 py-4">
      <h1 className="text-center text-slate-600 font-mono font-bold uppercase text-2xl mb-7">
        create acoount
      </h1>

      <form
        action=""
        className="flex gap-4  flex-col  mb-5 "
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="py-2 px-4 bg-slate-300 text-gray-700   capitalize border-none outline-none  placeholder:text-slate-800  w-full"
          placeholder="username"
          id="username"
          onChange={handleOnchange}
        />

        <input
          type="email"
          className="py-2 px-4 bg-slate-300 text-gray-700 lowercase border-none outline-none w-full placeholder:text-slate-800"
          placeholder="email"
          id="email"
          onChange={handleOnchange}
        />
        <input
          type="password"
          className="py-2 px-4 bg-slate-300 text-gray-700  border-none outline-none w-full placeholder:text-slate-800"
          placeholder="password"
          id="password"
          onChange={handleOnchange}
        />
        <button className="w-full  py-3 px-4  bg-slate-900 text-white capitalize text-1xl font-mono font-semibold">
          {loading ? "creating..." : "create account"}
        </button>
      </form>
      <Oauth/>
      {error ? (
        <p className="my-3 text-red-600 text-center text-pretty capitalize font-bold text-xs">
          {error}
        </p>
      ) : (
        <p className="my-3 text-red-600 text-center text-pretty capitalize font-bold text-xs"></p>
      )}

      <div>
        have an account?
        <NavLink className="font-bold text-gray-400">click here</NavLink>
      </div>
    </div>
  );
}

export default SignUp;
