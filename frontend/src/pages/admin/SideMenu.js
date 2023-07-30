import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { RiUserSearchFill } from "react-icons/ri";
import Logo from "../../assets/images/logo.png";

const SideMenu = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <aside class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-white">
        <div class="sidebar-header flex items-center justify-center py-4">
          <div class="inline-flex">
            <Link to="/advisor/dashboard">
              <img src={Logo} alt="brand" className="h-20 w-auto" />
            </Link>
          </div>
        </div>
        <div class="sidebar-content px-4 py-6">
          <ul class="flex flex-col w-full">
            <li class="my-px">
              <Link
                to="/admin/dashboard"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100"
              >
                <span class="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>
                <Link to="/admin/dashboard">
                  <span class="ml-3">Dashboard</span>
                </Link>
              </Link>
            </li>

            <li class="my-px">
              <Link
                to="/admin/add-advisor"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                <Link to="/admin/add-advisor">
                  <span class="ml-3">Add Advisor</span>
                </Link>
                {/* <span class="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
            </li>
            <li class="my-px">
              <Link
                to="/admin/view-ratings"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <RiUserSearchFill className="h-6 w-6" />
                <Link to="/admin/view-ratings">
                  <span class="ml-3">View Ratings</span>
                </Link>
                {/* <span class="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
            </li>
            <li class="my-px">
              <Link
                to="/admin/view-users"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <RiUserSearchFill className="h-6 w-6" />
                <Link to="/admin/view-users">
                  <span class="ml-3">View Users</span>
                </Link>
                {/* <span class="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
            </li>
            <li class="my-px">
              <span class="flex font-medium text-sm text-black px-4 my-4 uppercase">
                Account
              </span>
            </li>
            <li class="my-px">
              <Link
                to="/admin/profile"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <Link to="/admin/profile">
                  <span class="ml-3">Profile</span>
                </Link>
              </Link>
            </li>
            <li class="my-px">
              <Link
                to="/admin/complaints"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <Link to="/admin/complaints">
                  <span class="ml-3">Complaints</span>
                </Link>
              </Link>
            </li>
            <li class="my-px">
              <Link
                to="/admin/appointment"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <Link to="/admin/appointment">
                  <span class="ml-3">Appointment</span>
                </Link>
              </Link>
            </li>
            {/* <li class="my-px">
              <Link
                to="#"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </span>
                <span class="ml-3">Notifications</span>
                <span class="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  10
                </span>
              </Link>
            </li> */}
            <li class="my-px">
              <Link
                onClick={logoutHandler}
                class="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span class="flex items-center justify-center text-lg text-red-400">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </span>
                <span class="ml-3" onClick={logoutHandler}>
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideMenu;
