import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';

import { useReducer } from "react";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const refFile = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      uploadImg(image);
    }
  }, [image]);

  const uploadImg = async (img) => {
    // console.log(img)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + img.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      })
  };
  // console.log(formData)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className=" mx-auto my-7 border-2 border-teal-600 px-6  py-3 shadow-lg font-extrabold w-96 ">
      <h1 className=" text-center uppercase text-3xl text-teal-800 font-mono mb-6">
        profile
      </h1>

      <form action="" className="w-full  mt-4 ">
        <div className="flex justify-center items-center flex-col  mb-5">
          <input
            type="file"
            ref={refFile}
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            hidden
          />
          <img
            src={currentUser.profilePicture}
            alt="proifle"
            className=" rounded-full h-24 w-24 "
            onClick={(e) => {
              refFile.current.click();
            }}
          />
           <p className='text-sm text-center my-2'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        </div>
        <input
          type="text"
          className=" w-full py-2 px-3 bg-slate-200 text-teal-800 text-xl font-mono font-medium mb-3"
          placeholder="username"
          value={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="text"
          className=" w-full py-2 px-3 bg-slate-200 text-teal-800 text-xl font-mono font-medium mb-3"
          placeholder="email"
          value={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="text"
          className=" w-full py-2 px-3 bg-slate-200 text-teal-800 text-xl font-mono font-medium mb-3"
          placeholder="password"
          onChange={handleChange}
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
