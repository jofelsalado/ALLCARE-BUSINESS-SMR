import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideMenu from "./SideMenu";
import DashboardNavbar from "./DashboardNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "./DashboardFooter";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import axios from "axios";

const UpdateProfile = () => {
  const { userInfo } = useSelector((state) => state.auth);
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
    setCivilStatus(userInfo.civilStatus);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        education,
        address,
        educationalLevel,
        civilStatus,
        workAddress,
        occupation,
        profilePicture,
        salaryRange,
        smokingStatus,
        religion,
        dependent1,
        dependent2,
        dependent3,
      })
      .then((result) => {
        dispatch(setCredentials({ ...result.data }));
        navigate("/leads/profile");
      });
  };

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">UPDATE PROFILE</h1>
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
                          <Select label={civilStatus}>
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
                            label="Age"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Select label={educationalLevel}>
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
                          <Select label={salaryRange}>
                            <Option
                              onClick={(e) => setSalaryRange("Below 10,000")}
                            >
                              Below 10,000
                            </Option>
                            <Option
                              onClick={(e) => setSalaryRange("10,001 - 20,000")}
                            >
                              10,001 - 20,000
                            </Option>
                            <Option
                              onClick={(e) => setSalaryRange("20,001 - 30,000")}
                            >
                              20,001 - 30,000
                            </Option>
                            <Option
                              onClick={(e) => setSalaryRange("30,001 - 40,000")}
                            >
                              30,001 - 40,000
                            </Option>
                            <Option
                              onClick={(e) => setSalaryRange("40,001 - 50,000")}
                            >
                              40,001 - 50,000
                            </Option>
                            <Option
                              onClick={(e) => setSalaryRange("Above 50,001")}
                            >
                              Above 50,001
                            </Option>
                          </Select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Dependent 2"
                            value={dependent2}
                            onChange={(e) => setDependent2(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Facebook"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2nd Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Middle Name"
                            value={middleName === "" ? " " : middleName}
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
                          <Select label={gender}>
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
                            onChange={(e) => setWorkAddress(e.target.value)}
                            value={workAddress}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Occupation"
                            onChange={(e) => setOccupation(e.target.value)}
                            value={occupation}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Select label={religion}>
                            <Option
                              onClick={(e) => setReligion("Roman Catholic")}
                            >
                              Roman Catholic
                            </Option>
                            <Option onClick={(e) => setReligion("Protestant")}>
                              Protestant
                            </Option>
                            <Option
                              onClick={(e) => setReligion("Iglesia ni Cristo")}
                            >
                              Iglesia ni Cristo
                            </Option>
                            <Option onClick={(e) => setReligion("Islam")}>
                              Islam
                            </Option>
                            <Option
                              onClick={(e) =>
                                setReligion("Seventh-day Adventist")
                              }
                            >
                              Seventh-day Adventist
                            </Option>
                            <Option
                              onClick={(e) =>
                                setReligion("Jehovah's Witnesses")
                              }
                            >
                              Jehovah's Witnesses
                            </Option>
                          </Select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Dependent 3"
                            value={dependent3}
                            onChange={(e) => setDependent3(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Instagram"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                          />
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
                            onChange={(e) => setContactNumber(e.target.value)}
                            value={contactNumber}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Education"
                            onChange={(e) => setEducation(e.target.value)}
                            value={education}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Select label={smokingStatus}>
                            <Option onClick={(e) => setSmokingStatus("Smoker")}>
                              Smoker
                            </Option>
                            <Option
                              onClick={(e) => setSmokingStatus("Non-Smoker")}
                            >
                              Non-Smoker
                            </Option>
                          </Select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Dependent 1"
                            onChange={(e) => setDependent1(e.target.value)}
                            value={dependent1}
                          />
                        </div>
                      </div>
                      <div className="mb-6 ">
                        <div className="w-64 ">
                          <Input value={" "} className="hidden" />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="LinkedIn"
                            value={linkedIn}
                            onChange={(e) => setLinkedIn(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center lg:text-center">
                    <Button
                      type="submit"
                      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Save
                    </Button>
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
