import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideMenu from "./SideMenu";
import DashboardNavbar from "./DashboardNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "./DashboardFooter";
import { Input, Option, Select, Typography } from "@material-tailwind/react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const UpdateProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId] = useState(userInfo._id);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [expertise, setExpertise] = useState("");
  const [education, setEducation] = useState("");
  const [company, setCompany] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [educationalLevel, setEducationalLevel] = useState("");
  const [occupation, setOccupation] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(userInfo.profilePicture);

  const [isValidFacebookUrl, setIsValidFacebookUrl] = useState(true);
  const [isValidInstagramUrl, setIsValidInstagramUrl] = useState(true);
  const [isValidLinkedInUrl, setIsValidLinkedInUrl] = useState(true);

  useEffect(() => {
    setProfilePicture(userInfo.profilePicture);
    setFirstName(userInfo.firstName);
    setMiddleName(userInfo.middleName);
    setLastName(userInfo.lastName);
    setAge(userInfo.age);
    setContactNumber(userInfo.contactNumber);
    setGender(userInfo.gender);
    setBirthDate(userInfo.birthDate);
    setEmail(userInfo.email);
    setAddress(userInfo.address);
    setFacebook(userInfo.facebook);
    setInstagram(userInfo.instagram);
    setLinkedIn(userInfo.linkedIn);
    setExpertise(userInfo.expertise);
    setEducation(userInfo.education);
    setCompany(userInfo.company);
    setCivilStatus(userInfo.civilStatus);
    setEducationalLevel(userInfo.educationalLevel);
    setOccupation(userInfo.occupation);
    setWorkAddress(userInfo.workAddress);
  }, [userInfo]);

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

  const handleFacebookUrl = (e) => {
    setFacebook(e.target.value);
    setIsValidFacebookUrl(urlPatternValidation(facebook));
  };

  const handleInstagramUrl = (e) => {
    setInstagram(e.target.value);
    setIsValidInstagramUrl(urlPatternValidation(instagram));
  };

  const handleLinkedInUrl = (e) => {
    setLinkedIn(e.target.value);
    setIsValidLinkedInUrl(urlPatternValidation(linkedIn));
  };

  const urlPatternValidation = (URL) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    return regex.test(URL);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    setProfilePicture(base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8080/api/users/profile", {
        userId,
        firstName,
        middleName,
        lastName,
        age,
        contactNumber,
        gender,
        birthDate,
        email,
        address,
        facebook,
        instagram,
        linkedIn,
        expertise,
        education,
        company,
        password,
        verifyPassword,
        profilePicture,
        civilStatus,
        educationalLevel,
        occupation,
        workAddress,
      })
      .then((result) => {
        dispatch(setCredentials({ ...result.data }));
        navigate("/advisor/profile");
      });
  };

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">ADD ADVISOR</h1>
            <section className="pt-2 overflow-auto max-h-[74vh]">
              <div className="px-6 h-full text-gray-800">
                <form
                  className="bg-white p-10 shadow-2xl"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col gap-2 items-center justify-center mb-6">
                    <img
                      className="h-56 w-56 border-2 rounded-full"
                      src={profilePicture}
                      alt="nature_image"
                    />
                    <h1 class="font-bold text-sm text-red-600">
                      Note: This default profile picture will be used if you
                      will not upload image.
                    </h1>
                    <div className="mt-2">
                      <div className="w-64">
                        <Input
                          label="Profile Picture"
                          type="file"
                          files={profilePicture}
                          onChange={handleFileUpload}
                          className="file:border-0  file:bg-gray-300 file:text-sm file:font-semibold file:rounded"
                        />
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center gap-1 font-normal mt-2"
                        >
                          <InformationCircleIcon className="w-4 h-4 -mt-px" />
                          only .png, .jpg and .jpeg allowed.
                        </Typography>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-5">
                    {/* 1st Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Birth Date"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Select
                            label={`Civil Status: ${
                              civilStatus ? civilStatus : ""
                            }`}
                          >
                            <Option onClick={(e) => setCivilStatus("Single")}>
                              Single
                            </Option>
                            <Option onClick={(e) => setCivilStatus("Married")}>
                              Married
                            </Option>
                            <Option onClick={(e) => setCivilStatus("Widowed")}>
                              Widowed
                            </Option>
                          </Select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Home Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Select
                            label={`${
                              educationalLevel
                                ? educationalLevel
                                : "Educational Level"
                            }`}
                          >
                            <Option
                              onClick={(e) =>
                                setEducationalLevel("No formal education")
                              }
                            >
                              No formal education
                            </Option>
                            <Option
                              onClick={(e) =>
                                setEducationalLevel("Primary education")
                              }
                            >
                              Primary education
                            </Option>
                            <Option
                              onClick={(e) =>
                                setEducationalLevel("Secondary education")
                              }
                            >
                              Secondary education
                            </Option>
                            <Option onClick={(e) => setEducationalLevel("GED")}>
                              GED
                            </Option>
                            <Option
                              onClick={(e) =>
                                setEducationalLevel("Vocational qualification")
                              }
                            >
                              Vocational qualification
                            </Option>
                            <Option
                              onClick={(e) =>
                                setEducationalLevel("Bachelor's degree")
                              }
                            >
                              Bachelor's degree
                            </Option>
                            <Option
                              onClick={(e) =>
                                setEducationalLevel("Master's degree")
                              }
                            >
                              Master's degree
                            </Option>
                            <Option
                              onClick={(e) =>
                                setEducationalLevel("Doctorate or higher")
                              }
                            >
                              Doctorate or higher
                            </Option>
                          </Select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Occupation"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Facebook"
                            value={facebook}
                            onChange={handleFacebookUrl}
                            icon={
                              <AiFillFacebook className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                          {isValidFacebookUrl ? (
                            <Typography
                              variant="small"
                              color="gray"
                              className="flex items-center gap-1 font-normal mt-2"
                            >
                              <InformationCircleIcon className="w-4 h-4 -mt-px" />
                              should start with https://
                            </Typography>
                          ) : (
                            <Typography
                              variant="small"
                              color="red"
                              className="flex items-center gap-1 font-normal mt-2"
                            >
                              <InformationCircleIcon className="w-4 h-4 -mt-px" />
                              URL should start with https://
                            </Typography>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 2nd Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Middle Name (optional)"
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Select label={`Gender: ${gender ? gender : ""}`}>
                            <Option onClick={(e) => setGender("Male")}>
                              Male
                            </Option>
                            <Option onClick={(e) => setGender("Female")}>
                              Female
                            </Option>
                          </Select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Work Address"
                            value={workAddress}
                            onChange={(e) => setWorkAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Expertise"
                            value={expertise}
                            onChange={(e) => setExpertise(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="mb-6">
                          <div className="w-64">
                            <Input
                              label="Password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Instagram"
                            value={instagram}
                            onChange={handleInstagramUrl}
                            icon={
                              <AiFillInstagram className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                          {isValidInstagramUrl ? (
                            <Typography
                              variant="small"
                              color="gray"
                              className="flex items-center gap-1 font-normal mt-2"
                            >
                              <InformationCircleIcon className="w-4 h-4 -mt-px" />
                              should start with https://
                            </Typography>
                          ) : (
                            <Typography
                              variant="small"
                              color="red"
                              className="flex items-center gap-1 font-normal mt-2"
                            >
                              <InformationCircleIcon className="w-4 h-4 -mt-px" />
                              URL should start with https://
                            </Typography>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* 3rd Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Contact #"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Course"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Confirm Password"
                            type="password"
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="LinkedIn"
                            value={linkedIn}
                            onChange={handleLinkedInUrl}
                            icon={
                              <AiFillLinkedin className="h-5 w-5 text-blue-gray-300" />
                            }
                          />
                          {isValidLinkedInUrl ? (
                            <Typography
                              variant="small"
                              color="gray"
                              className="flex items-center gap-1 font-normal mt-2"
                            >
                              <InformationCircleIcon className="w-4 h-4 -mt-px" />
                              should start with https://
                            </Typography>
                          ) : (
                            <Typography
                              variant="small"
                              color="red"
                              className="flex items-center gap-1 font-normal mt-2"
                            >
                              <InformationCircleIcon className="w-4 h-4 -mt-px" />
                              URL should start with https://
                            </Typography>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center lg:text-right">
                    <button
                      type="submit"
                      className={`inline-block px-7 py-3 bg-blue-600
                     text-white
                     font-medium text-sm leading-snug uppercase rounded shadow-md
                          hover:bg-blue-700 hover:shadow-lg
                     focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
          <DashboardFooter />
        </main>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateProfile;
