import React, { useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserFailure,updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess} from '../features/userSlice'


import { useReducer } from "react";

function Profile() {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const refFile = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch=useDispatch()

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

  console.log(formData)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data)
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  }

  return (
    <div className=" mx-auto my-7 border-2 border-teal-600 px-6  py-3 shadow-lg font-extrabold w-96 ">
      <h1 className=" text-center uppercase text-3xl text-teal-800 font-mono mb-6">
        profile
      </h1>

      <form action="" className="w-full  mt-4 " onSubmit={handleSubmit}>
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
            src={formData.profilePicture || currentUser.profilePicture}
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
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          className=" w-full py-2 px-3 bg-slate-200 text-teal-800 text-xl font-mono font-medium mb-3"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          id="email"
        />
        <input
          type="password"
          className=" w-full py-2 px-3 bg-slate-200 text-teal-800 text-xl font-mono font-medium mb-3"
          placeholder="password"
          onChange={handleChange}
          id="password"
        />
        <button
          
          className=" w-full py-2 px-3 bg-slate-900 b text-teal-100 text-1xl font-serif   mb-3  uppercase"
        >
          {loading ? 'updating..' : 'update'}
        </button>
      </form>
      <div className="flex  justify-between items-center">
        <button onClick={handleDeleteAccount} className=" text-red-600 capitalize font-medium text-1xl cursor-pointer outline-none border-none">
          {
            loading ? 'deleting...' : 'delete account'
          }
        </button>
        <button onClick={handleDeleteAccount}  className=" text-red-600 capitalize font-medium text-1xl cursor-pointer outline-none border-none">
          
          sign out
        </button>
      </div>
      {
        updateSuccess ? (
          <p className=" text-green-600 capitalize text-xs text-center my-3">updated successfully </p>

        ) : 
        (
          <p></p>
        )
      }
      {
        error ? (
          <p className=" text-red-600 capitalize text-xs text-center my-3">{error.message} </p>

        ) : 
        (
          <p></p>
        )
      }
      
      
    </div>
  );
}

export default Profile;
