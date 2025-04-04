import React, { useState, useEffect } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdDataThresholding, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../../public/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { showSignUp, signoutSuccess } from "../redux/user/userSlice";
import SignUpPage from "./SignUp";
import { Avatar, Dropdown } from "flowbite-react";
function UpperNavbar() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state?.user);
//   picture section is not working make it work paxi

  const handleSignout = async function () {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
 const data= await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex justify-between items-center">
      {/* Left */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12" />
        <div className="flex items-center bg-[black] p-1 rounded-md cursor-pointer">
          <IoLocationSharp className="text-white" />
          <span className="text-white pr-2">Kathmandu</span>
          <MdOutlineKeyboardArrowDown className="text-white" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative max-w-xs">
          <input
            type="text"
            className="w-[140px] p-1 pr-5 bg-black text-white rounded-md placeholder-gray-400 outline-none border-none"
            placeholder="search..."
          />
        </div>

        <ul className="flex items-center gap-2 ml-3 ">
          <li>OFFERS</li>

          {/* Movies Dropdown */}
          <li className="relative group">
            <button className=" flex items-center">Movies</button>
            <div className="absolute left-0 hidden mt-2 space-y-2 w-24  bg-black text-white p-2 rounded-md shadow-lg group-hover:block group-target:block">
              <Link to="/now-showing" className="block p-2 hover:bg-gray-700">
                now showing
              </Link>
              <Link to="/coming-soon" className="block p-2 hover:bg-gray-700">
                Coming Soon
              </Link>
            </div>
          </li>

          <li>SCHEDULES</li>
          <li>CUSTOMER SERVICE</li>

          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser?.profilePicture} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  @{currentUser?.firstname + currentUser?.lastname}
                </span>
                <span className="block text-sm font-medium truncate">
                  {currentUser?.email}
                </span>
              </Dropdown.Header>

              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <button
              onClick={() => dispatch(showSignUp())}
              className="text-white bg-[blue] font-medium rounded-lg text-sm px-4 py-2"
            >
              Sign In
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}

export default UpperNavbar;
