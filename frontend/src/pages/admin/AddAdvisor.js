import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideMenu from "./SideMenu";
import DashboardNavbar from "./DashboardNavbar";
import { useAddUserMutation } from "../../slices/usersApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "./DashboardFooter";
import {
  Badge,
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
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { FaStarOfLife } from "react-icons/fa";
import emailjs from "emailjs-com";

const AddAdvisor = () => {
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
  const [password, setPassword] = useState("password123");
  const [verifyPassword, setVerifyPassword] = useState("password123");
  const [profilePicture, setProfilePicture] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAV1BMVEX///+ZmZmWlpaampqTk5OgoKD29vadnZ38/Pzy8vL5+fmQkJCioqL19fXr6+vHx8ezs7PAwMDZ2dnS0tKpqanm5uasrKy7u7vMzMzT09PDw8Pg4OCysrIKJtZaAAALcUlEQVR4nO1djWKbug4OsgHzEwiEBJrk/Z/zStCm2Q4QS9jQ3fKdbWfNWuwP2ZIsy/LhsGPHjh07duzYsWPHjh07duzYsWPHjn8QJk1Ts3Un3CO61F11asIAALTW+GcQNqeqqy/R1l1bjuLcNkE2sHpCBfhFzzYLmvZ82bqTUkR1lfcSC+bQSzWv6n9OmkXZIDmUlg1Qplo3ZbF1p+1gUI9cKngnulFhQnUZHvCzkdxizWX3ZKnjW7I1gTeom0wL6Q3QWVNvTWIaaanE4nsVZFCmW1MZRdJmAMpOt8wBHwFZ+/MGa9I6EN83QP8wjlFrbRrsQAak/Tk20pRO5fcF0OUPsRy1WqY+p6HV5noV33HSZJ749RybpG9lQ3Ta6fz7C6BAd5vySxoaoP4o0pN7MW6FD7b3KYL+2IifeWQ+R+grxccmU7GIVxFgD1AbLK3qbD2CiGxdu4FjpvJpI0YpVuuajasvIz8Jpa8r8kvzVUfoJyBfbVGVrKhj/qAYr2QZC1RtmzBUEKyiUot1zPwoAFagWHhZKVlDe6ZoUIJb8kP4lmKy4RD9ZAge1Y05RBtp0T8oxpFH07/MDg5bT39t0wgek3vjd7jKe4bcgqbtPup7/dG1TcAP+788y5t3U4ldNcjysngdWqYoc7nrris/BGupsw3QjinAohXL0c9KoxASBF1NBT6jSmpcMw82wyhZZ/R1Trsn0kWKcq9OH0KC5zfPPcsowsO1yfgQdYSiD7NbnvhvhWxwuA1PGfRlRAStVnTC1aZOnEqxkSyYeoLvemHEFBuH/CiyLSAY275jI3IGXUbDE9kktHeRZZNAu/PBG0kHsjujhbvE2IKzcVprwSTULUMRmEMrGCZKO3JtjJIEZmJeYCyN+QQhsJ7p8ygls5D9emtRK6ULgpFIzfDXcLmkGe1ir78VqBklcP7rTGJy2+UEZZYiFrTEn4mBE4shEWEAkvlRilo6LSUoE6EoqlmIHKfFQmxFEXzJIJUNU7V0Jkaihb2wVdGECLJl6lQ0NwKQrd0+ZI0ts4my1akwiiKLBIFaQlDkkYrtsMy3WOKdGtnCF1+rsEHRgFG4xJC6pyaRRkiFDQpbyxKxA36ThvqE7Ym8GpwUNylBaYtrMxSaX8RFKEJYeZQGWnqwqBKfmxA2KM2AEO/USAkqsbWQMVTSVyryhHusavEJwvwFmccWkIV6t1kxDpnXRhB6bqIY4tDgmp5336Aorhgt2GyXqe8FmVYgmfmi4NcnRBNRPg0FoT2C2FYgQKK+K3l7sgZF0b2vBkWRqCU5KIIMFCM0TgMEo2bJrEATzGcoddkGQMhuMFyURiRw3IT7688WuYEM2Tb6d3t8Eyw3TgOAtzNjlrUmMcFye/9skrO7dlqYGi+w+csaDJh5S4vUzAAuQVlU6A8w3GG5k/8EO2y6TJX2AGXbaCTMt3oFW5k6GDYKLPeB09hB8j/bAncukoFB2WybJA4kiG1xc0+WeKUvsBg7Fzctsc3FyVFC99ud9jJzc7yBvZHYuGiVoJs5lVrk4fW6ILn6BVyDGLpolKAgO43n2JlDcsqaWCu4ujhmxPWEl7f4DdCnsel4OWlQDTRhEyzzuodGuGFoSZPTggAdVPdX6xjdq4DmX5znoGLl4rQfN6IoanJm0axA6/B06871ubudQv2lXq6Q53HsYk4wGRpJGn3+Urylr+f1n07or2pmw/cpBXmDI/Xrq+cPSzJrgLcBlQoYQvhUGO+7qCAchmaYh8jZgabRzEQ6ptOmQIVB2IsmVLQ3Ew6eGMShgl6gMX4Q9t6Lok/x+8I4xA/w2+g//H76luD5M94ZMmUIeaDDkGQXQ677/ubEJQcdk6Kkzuf0m56L3ww5ShxA49chil4h/Zx+0xPoZwSqh8mQOQ+xh3FOMqSex9hNFI8mHkibSGulVZBpFGKOoos1zsgMP497ySHVnHjSewl77o3m7yRy56FhijAM4n4e4ghDLqGOY+y/or/pIMubtqsvRRKZNKIXHR3TNLnXXXsFctloPIcQK/wpfESMwo8DgXJlWwvW3Nc0xHpNQ2MSQhRiP6my4NHVyfFg0uMhTY8mOpJRPBLPvggmEi0fKqM3RD9J4g5piEo8AC7DMWU/83R69zQ+oZ9BODjjQOu8vPdUjig7ZBglxNAcTEI88aMojaLUmOhS5gEMDOk5qLJg1Ni8AZMhc5hgz/pX3zNECaK+KAvsPOLYM0y+GBIzkqHB/x0jFGv/z0WJT+gZ4jzMaVICV59y/VLm2gIHpgZyaZChCrQ63XGqkdyiJCEagwwPx+SYEmVqgage00N6RIYoVHNvM3Ia6G1pZEu/WF3gri2460PUhJ/GTlGttTSN+jmXolJBhgapGKKB2gbFOmg94noYPqa/RGnSBjQAcLTTrOZ2gLs+5K7xn4oJ+R2ZbX3jiHKEz8cxXTf27pMwToM2fNnZxyIXLvnZcRpZrA0E2wd/4yyjyI61ieKlELo4vFqI1sPseKkk5g0ns7wOED1CsonBTxXmt+HmAEsPyTEddiPsvads+RT8xpmbtSDYe2LtH6IRc6Bj/qLIMheC/UPeHrByTJC9By1on6VMla4cHx43h4qVKiHYx2flYnipxcEJhUtyMRj5NOiQ+qgzlirGIlVS0YXhmWrOkV973O0niignyt5vc3EIcBT2+lyU12afm8hMLLFHal1gWpaVbGnzfdbBta10IDy3bpsjLD4LYAHLqKIwR9gyBcS5rX+Fpd2X1qmzkSFqdJ9VRY2NxRDn6tvZi4XH/97BaqqIz1tYOW4Oy2+MweocsvjMjM0891c77RM2vptc193eP917rW2LvFP52TWb84dOyjbMwSKcIj9/aHGG1F2JmEm8czyWnCG1OAfsWZMS3mnThVVq3m2PyLWYNd5p9GVnud+9QJX5LyJu3iiDhcPoTU0FwaEDPt7s6WcLVzbzdTG8rQytu6BYGfNjmPUp1CoXiHRz6m55bZPZdbaklBAfs8GM5fVp5oXou7p2j9lVnAu3eE6I3j0awpxX40QRzMZr1rhxYu7AkJtXPLMR5DOA8Y3pJY6j7S4TT9bc81hZ+wUTsWl3NfdmvFP/fjdhKvPFWd3EGfd+nYtRrhOtO1zYJBNChIezJuYwVaTZZQBlIjLrwNzaYIKhW4dqfCm8kgwn8rNcKoHJWtBrLC2mFheOa0GPB4SUk/ySWZhDOn6ixn0IbHwygO9bJk03bow9TJCxuvqUZK/VzZ/7fWn1hEPlYy9hsjAHaNV+OGeZXroHTKa4+bgbYbJIrOpvDe9vur87MVBpUXdt/nnv/HiTvtal83eU0CUymVbX9nauL0WUMo8/RElxr7tbm9Nz3qTP+rqjxG4P4fO6nEwHcd5cH211K8uuO3/UiPsX6IuPc9eVZdWeHteGEt+z4UiUTRMenUXmURZ4Qo/h+a+sh/q8K+g33Pd0SLa6N++boM87uwj/9/eu9ZGv7aSoViD4C+4//AV3WP6Ce0h/wV2yB7oPeO2Buu59wL/hTmcKooLgFKQUsPK93D0K7gHBBdBb3K0+HN5ZYzaqQD/WHZ/f+FhFiiC8iMABzCFpdDBX02Qp6Mm6cRw2ZKLzOlJB+cyxtgG+26TxaTdIgJtKsEetltd2m+DnOxprC1N6uY0cdLm59J6IWm19NMIKis6Er5EGYY+kdSpHOtO/NaX/IGkzAEn9o7+gFED2A/kRolI5ECRoVa65TGKibrKF9YCz5ofoz0kkt1gsSNDx7WcOzxfQ/caXCviXwwP+THU5zF+Q/INQlI22NiBkGnRTbrJAWoKornL9dhup39LIq/pn2T57mMu5bYJsqLMXDL8+6/H12zX9rqP/ZHjviC51V52a8HPnjdiGzanq6su/KrkZmL7E144dO3bs2LFjx44dO3bs2LFjx44dO/5B/A8t1JIfPJpBIAAAAABJRU5ErkJggg=="
  );
  const userType = "Advisor";

  // added fields
  const [educationalLevel, setEducationalLevel] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [occupation, setOccupation] = useState("");

  const [addUser] = useAddUserMutation();

  const [isValidFacebookUrl, setIsValidFacebookUrl] = useState(true);
  const [isValidInstagramUrl, setIsValidInstagramUrl] = useState(true);
  const [isValidLinkedInUrl, setIsValidLinkedInUrl] = useState(true);
  const [isDataValid, setIsDataValid] = useState(false);

  const urlPatternValidation = (URL) => {
    const regex = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    return regex.test(URL);
  };

  useEffect(() => {
    if (firstName !== "") {
      setIsDataValid(true);
    }
    if (lastName !== "") {
      setIsDataValid(true);
    }
  }, [firstName, lastName]);

  useEffect(() => {
    if (firstName === "") {
      setIsDataValid(false);
    }
    if (lastName === "") {
      setIsDataValid(false);
    }
  }, [firstName, lastName]);

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
  const clearFields = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setAge("");
    setContactNumber("");
    setGender("");
    setBirthDate("");
    setEmail("");
    setAddress("");
    setFacebook("");
    setInstagram("");
    setLinkedIn("");
    setExpertise("");
    setEducation("");
    setCompany("");
    setPassword("");
    setVerifyPassword("");
    setEducationalLevel("");
    setCivilStatus("");
    setWorkAddress("");
    setOccupation("");
  };

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

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);

    setProfilePicture(base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      toast.error("Password does not match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      try {
        const savedUser = await addUser({
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
          password,
          profilePicture,
          userType,
          expertise,
          education,
          company,
          educationalLevel,
          civilStatus,
          workAddress,
          occupation,
        }).unwrap();

        if (savedUser) {
          toast.success("Advisor has been successfully added!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

          emailjs
            .sendForm(
              "service_szz39al",
              "template_wi0o7li",
              e.target,
              "Ui5JNRcO168IYM_bi"
            )
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            );
          e.target.reset();

          clearFields();
        }
      } catch (err) {
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
    }
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

                  <div className="flex flex-row items-center justify-center">
                    <div className="w-[810px] mb-4">
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center gap-1 font-normal mt-2"
                      >
                        <InformationCircleIcon className="w-4 h-4 -mt-px" />
                        fields marked with an asterisk (
                        <FaStarOfLife className="w-2 h-2  mb-2 -mt-px text-red-600" />
                        ) are required.
                      </Typography>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-center gap-5">
                    {/* 1st Column */}
                    <div className="flex flex-col items-center">
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="First Name"
                              name="firstName"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="Birth Date"
                              type="date"
                              value={birthDate}
                              onChange={(e) => setBirthDate(e.target.value)}
                            />
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Select label="Civil Status">
                              <Option onClick={(e) => setCivilStatus("Single")}>
                                Single
                              </Option>
                              <Option
                                onClick={(e) => setCivilStatus("Married")}
                              >
                                Married
                              </Option>
                              <Option
                                onClick={(e) => setCivilStatus("Widowed")}
                              >
                                Widowed
                              </Option>
                            </Select>
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="Home Address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Select label="Educational Level">
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
                              <Option
                                onClick={(e) => setEducationalLevel("GED")}
                              >
                                GED
                              </Option>
                              <Option
                                onClick={(e) =>
                                  setEducationalLevel(
                                    "Vocational qualification"
                                  )
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
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="Occupation"
                              value={occupation}
                              onChange={(e) => setOccupation(e.target.value)}
                            />
                          </div>
                        </Badge>
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
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="Age"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Select label="Gender">
                              <Option onClick={(e) => setGender("Male")}>
                                Male
                              </Option>
                              <Option onClick={(e) => setGender("Female")}>
                                Female
                              </Option>
                            </Select>
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="Work Address"
                              value={workAddress}
                              onChange={(e) => setWorkAddress(e.target.value)}
                            />
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="Expertise"
                              value={expertise}
                              onChange={(e) => setExpertise(e.target.value)}
                            />
                          </div>
                        </Badge>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="mb-6">
                          <div className="w-64">
                            <Input
                              disabled
                              label="Password"
                              type="password"
                              value={password}
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
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="Last Name"
                              name="lastName"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="Contact #"
                              value={contactNumber}
                              onChange={(e) => setContactNumber(e.target.value)}
                            />
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="Email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="Course"
                              value={education}
                              onChange={(e) => setEducation(e.target.value)}
                            />
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <Badge
                          color="white"
                          content={
                            <FaStarOfLife
                              className="h-2 w-2 text-red-600"
                              strokeWidth={2.5}
                            />
                          }
                          withBorder
                        >
                          <div className="w-64">
                            <Input
                              label="Company"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                            />
                          </div>
                        </Badge>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            disabled
                            label="Confirm Password"
                            type="password"
                            value={verifyPassword}
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
                      disabled={isDataValid === true ? false : true}
                      type="submit"
                      className={`inline-block px-7 py-3 ${
                        isDataValid === true ? "bg-blue-600" : "bg-gray-400"
                      }  ${
                        isDataValid === true
                          ? "text-white"
                          : "text-gray-100 cursor-not-allowed"
                      } font-medium text-sm leading-snug uppercase rounded shadow-md ${
                        isDataValid === true
                          ? "hover:bg-blue-700 hover:shadow-lg"
                          : ""
                      }  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out`}
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

export default AddAdvisor;
