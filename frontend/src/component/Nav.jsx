import React, { useEffect, useState } from "react";
import Login from "./Login";
import { useAuth } from "../context/Authprovider";
import Logout from "./Logout";

function Nav() {
const [authUser , setAuthUser] = useAuth();


const [authuser , setauthuser] =useAuth();
console.log(authuser);

  const [theme, settheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [sticky, setsticky] = useState(false);

  const element = document.documentElement;
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);
  useEffect(() => {
    const handlescroll = () => {
      if (window.scrollY > 0) {
        setsticky(true);
      } else {
        setsticky(false);
      }
    };

    window.addEventListener("scroll", handlescroll);
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  const navitems = (
    <>
      <li>
        <a href="/" className="hover:text-pink-500">
          Home
        </a>
      </li>
      <li>
        <a href="/Course" className="hover:text-pink-500">
          Course
        </a>
      </li>
      <li>
        <a href="/Contact" className="hover:text-pink-500">
          Contact
        </a>
      </li>
      <li>
        <a href="/About" className="hover:text-pink-500">
          About
        </a>
      </li>
    </>
  );
  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 dark:bg-slate-900 dark:text-white left-0 right-0 
    ${
      sticky
        ? "sticky-navbar shadow-md bg-base-200  dark:bg-slate-600 dark:text-white duration-300 transition-all ease-in-out"
        : ""
    } z-50   `}
    >
      <div className="navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navitems}
            </ul>
          </div>
          <a
            href="/"
            className="btn btn-ghost text-2xl cursor-pointer text-pink-500 font-bold"
          >
            E-Learn
          </a>
        </div>

        <div className="navbar-end space-x-3">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-2">{navitems}</ul>
          </div>
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs dark:bg-slate-700 dark:text-white"
            />
          </div>
          <div>
            <label className="grid cursor-pointer place-items-center">
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller bg-base-content col-span-2 col-start-1 row-start-1"
              />
              <svg
                className="stroke-base-100 fill-base-100 col-start-1 row-start-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={() => {
                  settheme(theme === "dark" ? "light" : "dark");
                }}
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
              <svg
                className="stroke-base-100 fill-base-100 col-start-2 row-start-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={() => {
                  settheme(theme === "light" ? "dark" : "light");
                }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </label>
          </div>

          {
            authUser?<Logout></Logout>:
          
          <div>
            <a
              className="btn hover:bg-pink-500 hover:text-white"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              LogIn
            </a>
            <Login></Login>
          </div>}
        </div>
      </div>
    </div>
  );
}

export default Nav;
