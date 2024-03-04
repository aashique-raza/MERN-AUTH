import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {GoogleAuthProvider,signin} from "firebase/auth"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { signInSuccess } from "../features/userSlice";

function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      // console.log(result)
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      // console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not login with google", error);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleGoogleClick}
        className=" mb-4 w-full py-3 px-4  bg-red-500 text-white capitalize text-1xl font-mono font-semibold"
      >
        continue with google
      </button>
    </div>
  );
}

export default Oauth;
