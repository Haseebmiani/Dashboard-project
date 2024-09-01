import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const Navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const logOut = () => {
    localStorage.clear();
    Navigate("/sign-up");
  };
  return (
    <div className=" flex  mt-2 h-14 pt-3 rounded-md   bg-gray-300 ">
      {auth ? (
        //if the person log in or sign-in then this data will be sow

        <ul className="flex ml-5 gap-8 font-bold text-center items-center">
          <li>
            <Link to="/" className="hover:text-blue-700 transition-colors">
              Products
            </Link>
          </li>
          <li>
            <Link to="/add" className="hover:text-blue-700 transition-colors">
              Add Product
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className="hover:text-blue-700 transition-colors">
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/sign-up"
              onClick={logOut}
              className="flex items-center space-x-2 hover:text-blue-700 transition-colors">
              <p className="flex items-center space-x-1">
                <span>Logout</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span>{JSON.parse(auth).name}</span>
              </p>
            </Link>
          </li>
        </ul>
      ) : (
        //if there is no person then show this button
        <ul className=" flex gap-4 ml-3   ">
          <Link to="/sign-up">
            <button className=" rounded-md   bg-blue-400 text-center h-9  w-32 text-xl  content-center items-center  ">
              Sign-up
            </button>
          </Link>
          <Link to="/log-up">
            <button className="rounded-md bg-blue-400 text-center h-9  w-32 text-xl ">
              log-in
            </button>
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Nav;
