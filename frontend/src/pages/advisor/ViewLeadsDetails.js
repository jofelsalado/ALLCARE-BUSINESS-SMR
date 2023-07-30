import {
  Avatar,
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useLocation } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import Moment from "react-moment";
import { useEffect, useState } from "react";
import axios from "axios";

const ViewLeadsDetails = () => {
  const location = useLocation();
  const [leadsMedicalHistory, setLeadsMedicalHistory] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/credentials", {
        userId: location?.state?.user?._id,
      })
      .then((result) => {
        setLeadsMedicalHistory(result.data);
      })
      .catch((error) => console.log(error));
  }, [location?.state?.user?._id]);

  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const handleOpen = (src) => {
    setImgSrc(src);
    setOpen((cur) => !cur);
  };
  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">LEADS PROFILE</h1>

            <section className="p-10 overflow-auto max-h-[74vh] bg-white">
              <div className="flex flex-row px-6 text-gray-800 gap-14">
                <div className="flex flex-col  w-[25%] gap-2 items-center justify-start mb-6">
                  <Avatar
                    size="xxl"
                    alt="avatar"
                    src={location?.state?.user?.profilePicture}
                    className="mb-4 ring-4 ring-blue-500/30 border border-blue-500 shadow-xl shadow-blue-900/20"
                  />
                  <div className=" flex flex-row item-center justify-center gap-2">
                    <div className="mb-6">
                      <div className="">
                        <Button
                          disabled={
                            location?.state?.user?.facebook === ""
                              ? true
                              : false
                          }
                          size="md"
                          variant="outlined"
                          color="blue-gray"
                          className="flex items-center gap-3"
                          onClick={(e) => {
                            window.open(
                              `${location?.state?.user?.facebook}`,
                              "_blank"
                            );
                          }}
                        >
                          <AiFillFacebook className="h-5 w-5 text-[#3b5998]" />
                        </Button>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="">
                        <Button
                          disabled={
                            location?.state?.user?.instagram === ""
                              ? true
                              : false
                          }
                          size="md"
                          variant="outlined"
                          color="blue-gray"
                          className="flex items-center gap-3"
                          onClick={(e) => {
                            window.open(
                              `${location?.state?.user?.instagram}`,
                              "_blank"
                            );
                          }}
                        >
                          <AiFillInstagram className="h-5 w-5 text-[#E4405F]" />
                        </Button>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="">
                        <Button
                          disabled={
                            location?.state?.user?.linkedIn === ""
                              ? true
                              : false
                          }
                          size="md"
                          variant="outlined"
                          color="blue-gray"
                          className="flex items-center gap-3"
                          onClick={(e) => {
                            window.open(
                              `${location?.state?.user?.linkedIn}`,
                              "_blank"
                            );
                          }}
                        >
                          <AiFillLinkedin className="h-5 w-5 text-[#0072b1]" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <table className="w-[40%] min-w-max table-auto text-left">
                    <tr>
                      <td>
                        <span className="font-bold">First Name</span>
                      </td>
                      <td>
                        <Typography className="capitalize">
                          {" "}
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.firstName}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Middle Name</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.middleName}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Last Name</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.lastName}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Civil Status</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.civilStatus}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Birth Date</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.birthDate}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Age</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.age}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Contact #</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.contactNumber}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Education</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.education}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Educational Level</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.educationalLevel}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Occupation</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.occupation}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Home Address</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.address}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Work Address</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.workAddress}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Smoking Status</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.smokingStatus}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Salary Range</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.salaryRange}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Religion</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.religion}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Dependent 1</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.dependent1}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Dependent 2</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.dependent2}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Dependent 3</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          {location?.state?.user?.dependent3}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="font-bold">Joined Date</span>{" "}
                      </td>
                      <td>
                        <Typography className="capitalize">
                          <span className="mx-4"> :</span>{" "}
                          <Moment format="MMMM DD, YYYY">
                            {location?.state?.user?.createdAt}
                          </Moment>
                        </Typography>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
              <h1 class="font-bold text-2xl text-gray-700 mb-2 mt-4">
                MEDICAL HISTORY
              </h1>
              {leadsMedicalHistory.length <= 0 ? (
                <div className="flex flex-row items-center justify-center">
                  <h1>NO MEDICAL HISTORY FOUND</h1>
                </div>
              ) : (
                <div className="flex flex-row gap-5 flex-wrap my-4">
                  {leadsMedicalHistory.map((data, key) => (
                    <Card
                      className="h-64 w-[32%] overflow-hidden transition-opacity hover:opacity-90 cursor-pointer"
                      onClick={() => handleOpen(data.credentials)}
                    >
                      <img
                        alt="nature"
                        className="h-full w-full object-cover object-center"
                        src={data.credentials}
                      />
                    </Card>
                  ))}
                </div>
              )}
            </section>
            <Dialog size="xl" open={open} handler={handleOpen}>
              <DialogHeader className="justify-between">
                <h1>Medical History</h1>
              </DialogHeader>
              <DialogBody divider={true} className="p-0">
                <img
                  alt="nature"
                  className="h-[35rem] w-full object-contain object-center"
                  src={imgSrc}
                />
              </DialogBody>
              <DialogFooter>
                <div className="flex float-right gap-2">
                  <Button color="red" size="sm" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                </div>
              </DialogFooter>
            </Dialog>
          </div>
          <DashboardFooter />
        </main>
      </div>
    </>
  );
};

export default ViewLeadsDetails;
