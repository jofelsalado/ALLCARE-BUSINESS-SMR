import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { RiStarHalfFill, RiUserSearchFill } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import axios from "axios";
import Logo from "../../assets/images/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import { TbCertificate } from "react-icons/tb";

const SideMenu = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.post("http://localhost:8080/api/users/change-to-offline", {
      userId: userInfo._id,
    });
  };

  const logoutHandler = async () => {
    handleLogout();
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Check Notification
  // const [notificationCount, setNotificationCount] = useState("");

  // setTimeout(() => {
  //   axios
  //     .post("http://localhost:8080/api/appointment/get-notification", {
  //       userId: userInfo._id,
  //     })
  //     .then((result) => {
  //       setNotificationCount(
  //         result.data.filter((item) => item.isOpened === false).length
  //       );
  //     });
  // }, 3000);

  // Add Credentials
  const [credentials, setCredentials] = useState("");

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    });
  };

  const handleCredentialUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    setCredentials(base64);
  };

  const handleCredentialSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/credentials/add-credentials", {
        userId: userInfo._id,
        credentials,
      })
      .then((result) => {
        toast.success("Medical History has been added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        toast.error("Medical History is already exist", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-white">
        <div className="sidebar-header flex items-center justify-center py-4">
          <div className="inline-flex">
            <Link to="/leads/dashboard">
              <img src={Logo} alt="brand" classNameName="h-20 w-auto" />
            </Link>
          </div>
        </div>
        <div className="sidebar-content px-4 py-6">
          <ul className="flex flex-col w-full">
            <li className="my-px">
              <Link
                to="/leads/dashboard"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-700 bg-gray-100"
              >
                <span className="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </span>
                <Link to="/leads/dashboard">
                  <span className="ml-3">Dashboard</span>
                </Link>
              </Link>
            </li>
            <li className="my-px">
              <Popover placement="bottom">
                <PopoverHandler>
                  <Link className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700">
                    <TbCertificate className="h-6 w-6" />
                    <span className="ml-3">Add Medical History</span>
                  </Link>
                </PopoverHandler>
                <PopoverContent className="w-96">
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Medical History
                  </Typography>
                  <form onSubmit={handleCredentialSubmit} className="flex-col">
                    <div className="mt-2 ">
                      <div className="w-[100%]">
                        <Input
                          label="Medical History"
                          type="file"
                          files={credentials}
                          accept="image/*"
                          onChange={handleCredentialUpload}
                          className="file:border-0  file:bg-gray-300 file:text-sm file:font-semibold file:rounded"
                        />
                      </div>
                    </div>
                    <h1 class="font-bold text-sm my-2 text-red-600">
                      Note: Only .jpg, .jpeg and .png allowed.
                    </h1>
                    <Button
                      type="submit"
                      variant="gradient"
                      className="w-24 float-right"
                    >
                      Submit
                    </Button>
                  </form>
                </PopoverContent>
              </Popover>
            </li>
            <li className="my-px">
              <Link
                to="/leads/view-advisor"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <RiUserSearchFill className="h-6 w-6" />
                <Link to="/leads/view-advisor">
                  <span className="ml-3">View Advisor</span>
                </Link>
                {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
              <Link
                to="/leads/advisor-rating-list"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <RiStarHalfFill className="h-6 w-6" />
                <Link to="/leads/advisor-rating-list">
                  <span className="ml-3">Ratings & Review</span>
                </Link>
              </Link>
              <Link
                to="/leads/submit-complaint"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <MdOutlineRateReview className="h-6 w-6" />
                <Link to="/leads/submit-complaint">
                  <span className="ml-3">Complaint</span>
                </Link>
              </Link>
            </li>
            <li className="my-px">
              <span className="flex font-medium text-sm text-black px-4 my-4 uppercase">
                Account
              </span>
            </li>
            <li className="my-px">
              <Link
                to="/leads/profile"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <Link to="/leads/profile">
                  <span className="ml-3">Profile</span>
                </Link>
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/leads/my-appointment"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <Link to="/leads/my-appointment">
                  <span className="ml-3">My Appointment</span>
                </Link>
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/leads/my-complaint"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <Link to="/leads/my-complaint">
                  <span className="ml-3">My Complaint</span>
                </Link>
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/leads/medical-history"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <TbCertificate className="h-6 w-6" />
                <Link to="/leads/medical-history">
                  <span className="ml-3">My Medical History</span>
                </Link>
                {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
            </li>
            {/* <li className="my-px">
              <Link
                to="/leads/notification"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="flex items-center justify-center text-lg text-black">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </span>
                <span className="ml-3">Notifications</span>
                {notificationCount === 0 ? (
                  ""
                ) : (
                  <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                    {notificationCount}
                  </span>
                )}
              </Link>
            </li> */}

            <li className="my-px">
              <Link
                onClick={logoutHandler}
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="flex items-center justify-center text-lg text-red-400">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </span>
                <span className="ml-3" onClick={logoutHandler}>
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <ToastContainer />
    </>
  );
};

export default SideMenu;
