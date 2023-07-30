import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddCompanyMutation,
  useLogoutMutation,
} from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { RiUserSearchFill, RiProductHuntFill } from "react-icons/ri";
import { BsHouseAddFill, BsHousesFill } from "react-icons/bs";
import { TbCertificate } from "react-icons/tb";
import { AiFillSchedule } from "react-icons/ai";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import MyAvailability from "./MyAvailability";
import { MdEventAvailable, MdOutlineRateReview } from "react-icons/md";
import Logo from "../../assets/images/logo.png";

const SideMenu = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [companyName, setCompanyName] = useState("");
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const date = new Date();

  // Get year, month, and day part from the date
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  const formattedDate = year + "-" + month + "-" + day;

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

  const [addCompany] = useAddCompanyMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addCompany({
        userId: userInfo._id,
        companyName,
      }).unwrap();

      toast.success(res?.data?.message || res.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      toast.error(err?.data?.errorMessage || err.errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      toast.error(err?.data?.message || err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // Adding Availability
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [availabilityTime, setAvailabilityTime] = useState("");
  const [availabilityType, setAvailabilityType] = useState("");
  // const [userId] = useState(userInfo._id);

  const handleAvailability = (type) => {
    setAvailabilityType(type);
  };

  const handleSubmitAvailability = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/appointment/availability", {
        userId: userInfo._id,
        availabilityDate: availabilityDate,
        availabilityTime: availabilityTime,
        availabilityType: availabilityType,
      })
      .then((result) => {
        toast.success(result?.data?.message || result.message, {
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
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      });
  };

  // // Check Notification
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
        toast.success(result.data.message, {
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
        toast.error(err.response.data.message, {
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
      <ToastContainer />
      <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-white">
        <div className="sidebar-header flex items-center justify-center py-4">
          <div className="inline-flex">
            <Link to="/advisor/dashboard">
              <img src={Logo} alt="brand" className="h-20 w-auto" />
            </Link>
          </div>
        </div>
        <div className="sidebar-content px-4 py-6">
          <ul className="flex flex-col w-full">
            <li className="my-px">
              <Link
                to="/advisor/dashboard"
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
                <Link to="/advisor/dashboard">
                  <span className="ml-3">Dashboard</span>
                </Link>
              </Link>
            </li>

            <li className="my-px">
              <Link
                to="/advisor/add-product"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <RiProductHuntFill className="h-6 w-6" />
                <Link to="/advisor/add-product">
                  <span className="ml-3">Add Product</span>
                </Link>
                {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
            </li>

            <li className="my-px">
              <Popover placement="bottom">
                <PopoverHandler>
                  <Link className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700">
                    <TbCertificate className="h-6 w-6" />
                    <span className="ml-3">Add Credentials</span>
                  </Link>
                </PopoverHandler>
                <PopoverContent className="w-96">
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Credentials
                  </Typography>
                  <form onSubmit={handleCredentialSubmit} className="flex-col">
                    <div className="mt-2 ">
                      <div className="w-[100%]">
                        <Input
                          label="Credentials"
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
              <Popover placement="bottom">
                <PopoverHandler>
                  <Link className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700">
                    <AiFillSchedule className="h-6 w-6" />
                    <span className="ml-3">Add Availability</span>
                  </Link>
                </PopoverHandler>
                <PopoverContent>
                  <Typography variant="h6" color="blue-gray" className="mb-6">
                    Add Availability
                  </Typography>
                  <div className="flex gap-2">
                    <form
                      onSubmit={handleSubmitAvailability}
                      className="flex flex-row items-center gap-4"
                    >
                      <div>
                        <div className="mb-4">
                          <Input
                            label="Date"
                            type="date"
                            min={formattedDate}
                            value={availabilityDate}
                            onChange={(e) =>
                              setAvailabilityDate(e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Input
                            label="Time"
                            type="time"
                            value={availabilityTime}
                            onChange={(e) =>
                              setAvailabilityTime(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-4">
                          <select
                            id="countries"
                            class=" border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => handleAvailability(e.target.value)}
                            // onClick={loadCompany}
                          >
                            <option selected disabled>
                              Select Meeting Type
                            </option>
                            <option value={"Face-to-Face"}>Face-to-Face</option>
                            <option value={"Virtual Meeting: Zoom"}>
                              Virtual Meeting: Zoom
                            </option>
                            <option value={"Virtual Meeting: G-Meet"}>
                              Virtual Meeting: G-Meet
                            </option>
                          </select>
                        </div>
                        <div>
                          <Button
                            type="submit"
                            variant="gradient"
                            className="w-full"
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
            <li className="my-px">
              <Popover placement="bottom">
                <PopoverHandler>
                  <Link className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700">
                    <BsHouseAddFill className="h-6 w-6" />
                    <span className="ml-3">Add Company</span>
                  </Link>
                </PopoverHandler>
                <PopoverContent className="w-96">
                  <Typography variant="h6" color="blue-gray" className="mb-6">
                    Add Company
                  </Typography>
                  <div className="flex gap-2">
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-row items-center gap-4"
                    >
                      <Input
                        label="Company Name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      <Button type="submit" variant="gradient" className="w-24">
                        Save
                      </Button>
                    </form>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
            <li className="my-px">
              <Link
                to="/advisor/view-company"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <BsHousesFill className="h-6 w-6" />
                <Link to="/advisor/view-company">
                  <span className="ml-3">View Company</span>
                </Link>
                {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/advisor/view-leads"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <RiUserSearchFill className="h-6 w-6" />
                <Link to="/advisor/view-leads">
                  <span className="ml-3">View Leads</span>
                </Link>
                {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/advisor/submit-complaint"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <MdOutlineRateReview className="h-6 w-6" />
                <Link to="/advisor/submit-complaint">
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
                to="/advisor/profile"
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
                <Link to="/advisor/profile">
                  <span className="ml-3">Profile</span>
                </Link>
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/advisor/my-rating"
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
                <Link to="/advisor/my-rating">
                  <span className="ml-3">My Rating</span>
                </Link>
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/advisor/my-products"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <RiProductHuntFill className="h-6 w-6" />
                <Link to="/advisor/my-products">
                  <span className="ml-3">My Products</span>
                </Link>
                {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/advisor/my-credentials"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <TbCertificate className="h-6 w-6" />
                <Link to="/advisor/my-credentials">
                  <span className="ml-3">My Credentials</span>
                </Link>
                {/* <span className="flex items-center justify-center text-xs text-red-500 font-semibold bg-red-100 h-6 px-2 rounded-full ml-auto">
                  1k
                </span> */}
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/advisor/my-appointment"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <MdEventAvailable className="h-6 w-6" />
                <Link to="/advisor/my-appointment">
                  <span className="ml-3">My Appointment</span>
                </Link>
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/advisor/availability"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <AiFillSchedule className="h-6 w-6" />
                <Link to="/advisor/availability">
                  <span className="ml-3">My Availability</span>
                </Link>
              </Link>
            </li>
            <li className="my-px">
              <Link
                to="/advisor/my-complaint"
                className="flex flex-row items-center h-10 px-3 rounded-lg text-black hover:bg-gray-100 hover:text-gray-700"
              >
                <MdOutlineRateReview className="h-6 w-6" />
                <Link to="/advisor/my-complaint">
                  <span className="ml-3">My Complaint</span>
                </Link>
              </Link>
            </li>

            {/* <li className="my-px">
              <Link
                to="/advisor/notification"
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
    </>
  );
};

export default SideMenu;
