import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideMenu from "./SideMenu";
import DashboardNavbar from "./DashboardNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "./DashboardFooter";
import { Button, Input, Typography } from "@material-tailwind/react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyProfile = () => {
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
  const [profilePicture, setProfilePicture] = useState("");
  const [educationalLevel, setEducationalLevel] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [smokingStatus, setSmokingStatus] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [religion, setReligion] = useState("");
  const [dependent1, setDependent1] = useState("");
  const [dependent2, setDependent2] = useState("");
  const [dependent3, setDependent3] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

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
    setEducationalLevel(userInfo.educationalLevel);
    setCivilStatus(userInfo.educationalLevel);
    setWorkAddress(userInfo.workAddress);
    setOccupation(userInfo.occupation);
    setEducation(userInfo.education);
    setSmokingStatus(userInfo.smokingStatus);
    setSalaryRange(userInfo.salaryRange);
    setReligion(userInfo.religion);
    setDependent1(userInfo.dependent1);
    setDependent2(userInfo.dependent2);
    setDependent3(userInfo.dependent3);
  }, [userInfo]);

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">MY PROFILE</h1>
            <section className="pt-2 overflow-auto max-h-[74vh]">
              <div className="px-6 h-full text-gray-800">
                <form className="bg-white p-10 shadow-2xl">
                  <div className="flex flex-col gap-2 items-center justify-center mb-6">
                    <img
                      className="h-56 w-56 border-2 rounded-full"
                      src={profilePicture}
                      alt="nature_image"
                    />
                  </div>
                  <div className="flex flex-row items-center justify-center gap-5">
                    {/* 1st Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            First Name:
                          </Typography>
                          <Input
                            label="First Name"
                            value={firstName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Birth Date:
                          </Typography>
                          <Input
                            label="Birth Date"
                            type="date"
                            value={birthDate}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Civil Status:
                          </Typography>
                          <Input label="Age" value={civilStatus} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Home Address:
                          </Typography>
                          <Input label="Age" value={address} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Educational Level:
                          </Typography>
                          <Input value={educationalLevel} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Salary Range:
                          </Typography>
                          <Input value={salaryRange} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Dependent 2:
                          </Typography>
                          <Input value={dependent2} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Button
                            disabled={facebook ? false : true}
                            size="md"
                            variant="outlined"
                            color="blue-gray"
                            className="flex items-center gap-3 w-full"
                            onClick={(e) => {
                              window.open(`${facebook}`, "_blank");
                            }}
                          >
                            <AiFillFacebook className="h-5 w-5 text-[#3b5998]" />
                            Facebook Profile
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* 2nd Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Middle Name:
                          </Typography>
                          <Input
                            label="Middle Name"
                            value={middleName === "" ? " " : middleName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Age:
                          </Typography>
                          <Input label="Age" value={age} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Gender:
                          </Typography>
                          <Input label="Gender" value={gender} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Work Address:
                          </Typography>
                          <Input
                            label="Work Address"
                            value={workAddress}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Occupation:
                          </Typography>
                          <Input value={occupation} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Religion:
                          </Typography>
                          <Input value={religion} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Dependent 3:
                          </Typography>
                          <Input value={dependent3} disabled />
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="w-64">
                          <Button
                            disabled={instagram ? false : true}
                            size="md"
                            variant="outlined"
                            color="blue-gray"
                            className="flex items-center gap-3 w-full"
                            onClick={(e) => {
                              window.open(`${instagram}`, "_blank");
                            }}
                          >
                            <AiFillInstagram className="h-5 w-5 text-[#E4405F]" />
                            Instagram Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                    {/* 3rd Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Last Name:
                          </Typography>
                          <Input label="Last Name" value={lastName} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Contact #:
                          </Typography>
                          <Input
                            label="Contact #"
                            value={contactNumber}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Email:
                          </Typography>
                          <Input label="Email" value={email} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Course:
                          </Typography>
                          <Input label="Education" value={education} disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Smoking Status:
                          </Typography>
                          <Input value={smokingStatus} disabled />
                        </div>
                      </div>
                      <div className="mb-11">
                        <div className="w-64">
                          <Typography className="text-blue-gray-400 font-400 text-sm">
                            Dependent 1:
                          </Typography>
                          <Input value={dependent1} disabled />
                        </div>
                      </div>
                      <div className="mb-6 ">
                        <div className="w-64 ">
                          <Typography className="text-blue-gray-400 font-400 text-sm hidden">
                            Confirm Password:
                          </Typography>
                          <Input value={" "} className="hidden" disabled />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Button
                            disabled={linkedIn ? false : true}
                            size="md"
                            variant="outlined"
                            color="blue-gray"
                            className="flex items-center gap-3 w-full"
                            onClick={(e) => {
                              window.open(`${linkedIn}`, "_blank");
                            }}
                          >
                            <AiFillLinkedin className="h-5 w-5 text-[#0072b1]" />
                            LinkedIn Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center lg:text-center">
                    <Link
                      to="/leads/update-profile"
                      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Update Profile
                    </Link>
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

export default MyProfile;
