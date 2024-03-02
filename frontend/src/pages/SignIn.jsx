import React from 'react'
import { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom';

import { signInFailure,signInSuccess,signInStart } from '../features/userSlice';
import { useDispatch,useSelector } from 'react-redux';


function SignIn() {
  const [formData, setformData] = useState({});
  const {loading,error}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleOnchange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
    // console.log(formData)
  };


  const handleSubmit=async(e)=>{
    e.preventDefault();
    // console.log(formData)
    

    try {
      dispatch(signInStart)
      const resp = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await resp.json();
      // console.log(result)
      if (result.success===false) {
        dispatch(signInFailure(result))
        return
      }

      
      dispatch(signInSuccess(result))
        // console.log('redirect kuy nhi ho rha hai')
      navigate('/')
      // console.log(result);
      
      
    } catch (error) {
      console.log(error)
      dispatch(signInFailure(error))
    }
  }

  return (
    <div className=" max-w-96 mx-auto   shadow-lg mt-8 px-5  my-3 py-4">
      <h1 className="text-center text-slate-600 font-mono font-bold uppercase text-2xl mb-7">
        sign-in your acoount
      </h1>

      <form
        action=""
        className="flex gap-4  flex-col  mb-5 "
        onSubmit={handleSubmit}
      >
        

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
        <button className="w-full  py-3 px-4  bg-slate-900 text-white  capitalize text-1xl font-mono font-semibold">
          {loading ? "signing..." : "signin your account"}
        </button>
      </form>
      <div className="w-full">
        <button className=" mb-4 w-full py-3 px-4  bg-red-500 text-white capitalize text-1xl font-mono font-semibold">
          signin with google
        </button>
      </div>
      {error ? (
        <p className="my-3 text-red-600 text-center text-pretty capitalize font-bold text-xs">
          {error.message}
        </p>
      ) : (
        <p className="my-3 text-red-600 text-center text-pretty capitalize font-bold text-xs"></p>
      )}

      <div>
        don't have  an account?
        <NavLink to={'/sign-up'} className="font-bold text-gray-400">create account</NavLink>
      </div>
    </div>
  )
}

export default SignIn