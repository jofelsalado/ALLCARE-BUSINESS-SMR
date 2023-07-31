import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideMenu from "./SideMenu";
import DashboardNavbar from "./DashboardNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "./DashboardFooter";
import {
  Avatar,
  Button,
  Chip,
  Rating,
  Typography,
} from "@material-tailwind/react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { RxGlobe } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";

const AppointmentDetails = () => {
  const location = useLocation();
  const [appointmentId] = useState(location?.state?.id);
  const [availabilityId, setAvailabilityId] = useState("");
  const [advisorId, setAdvisorId] = useState("");
  const [productId, setProductId] = useState("");
  const [leadsId, setLeadsId] = useState("");
  const [details, setDetails] = useState([]);
  const [appointmentStatus, setAppointmentStatus] = useState([]);
  const [reason, setReason] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/appointment/appointment-details", {
        appointmentId: appointmentId,
      })
      .then((result) => {
        setAppointmentStatus(
          result?.data.map((item) => item.appointmentStatus)
        );
        setReason(result?.data.map((item) => item.reason));
        setAvailabilityId(result?.data?.map((item) => item.availabilityId));
        setAdvisorId(result?.data?.map((item) => item.advisorId));
        setProductId(result?.data?.map((item) => item.productId));
        setLeadsId(result?.data?.map((item) => item.leadsId));
      })
      .catch((error) => console.log(error));
  }, [appointmentId]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/appointment/get-all-details", {
        availabilityId: availabilityId,
        productId: productId,
        advisorId: advisorId,
        leadsId: leadsId,
      })
      .then((result) => {
        setDetails(result.data);
      })
      .catch((error) => console.log(error));
  }, [productId, advisorId, leadsId, availabilityId]);

  useEffect(() => {
    axios.post("http://localhost:8080/api/appointment/read-notification", {
      appointmentId: appointmentId,
      userId: leadsId[0],
    });
  }, [appointmentId, leadsId]);
  const convertFrom24To12Format = (time24) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? "AM" : "PM";
    const hours = +sHours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  };
  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700 mb-4">
              APPOINTMENT DETAILS
            </h1>
            <section className="pt-2 overflow-auto max-h-[74vh]">
              <div className="px-6 h-full text-gray-800">
                <form className="bg-white p-10 shadow-2xl">
                  <h1 class="font-bold text-2xl text-gray-700 mb-6">
                    Advisor Details:
                  </h1>
                  {details?.advisorDetails?.map((advisor, key) => (
                    <div className="flex flex-row px-6 text-gray-800 gap-14">
                      <div className="flex flex-col gap-2 items-center justify-start mb-6">
                        <Avatar
                          size="xxl"
                          alt="avatar"
                          src={advisor.profilePicture}
                          className="mb-4 ring-4 ring-blue-500/30 border border-blue-500 shadow-xl shadow-blue-900/20"
                        />
                        <div className=" flex flex-row item-center justify-center gap-2">
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={advisor.facebook ? false : true}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${advisor.facebook}`, "_blank");
                                }}
                              >
                                <AiFillFacebook className="h-5 w-5 text-[#3b5998]" />
                              </Button>
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={advisor.instagram ? false : true}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${advisor.instagram}`, "_blank");
                                }}
                              >
                                <AiFillInstagram className="h-5 w-5 text-[#E4405F]" />
                              </Button>
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={advisor.linkedIn ? false : true}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${advisor.linkedIn}`, "_blank");
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
                                {advisor.firstName}
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
                                {advisor.middleName}
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
                                {advisor.lastName}
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
                                {advisor.civilStatus}
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
                                {advisor.birthDate}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Age</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {advisor.age}
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
                                {advisor.contactNumber}
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
                                {advisor.education}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">
                                Educational Level
                              </span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {advisor.educationalLevel}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Expertise</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {advisor.expertise}
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
                                {advisor.occupation}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Company</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span>{" "}
                                {advisor.company}
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
                                {advisor.address}
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
                                {advisor.workAddress}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Rating</span>{" "}
                            </td>
                            <td>
                              <Typography className="flex items-center capitalize">
                                <span className="mx-4"> :</span>{" "}
                                <Rating value={advisor.rating} readonly />
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
                                  {advisor.createdAt}
                                </Moment>
                              </Typography>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-row px-6 text-gray-800 gap-14">
                    <div className="flex flex-col">
                      <h1 class="font-bold text-2xl text-gray-700 mb-6">
                        Product Details:
                      </h1>
                      {details?.productDetails?.map((product, key) => (
                        <table className="w-[40%] min-w-max table-auto text-left">
                          <tr className="flex flex-row">
                            <td className=" w-40">
                              <span className="font-bold">Product Name</span>{" "}
                            </td>
                            <td className="flex flex-row ">
                              <span className="mx-4"> :</span>{" "}
                              <Typography className="capitalize max-w-sm">
                                {product.productName}
                              </Typography>
                            </td>
                          </tr>
                          <tr className="flex flex-row">
                            <td className=" w-40">
                              <span className="font-bold">
                                Product Description
                              </span>{" "}
                            </td>
                            <td className="flex flex-row md:w-48">
                              <span className="mx-4"> :</span>{" "}
                              <Typography className="capitalize max-w-sm">
                                {product.productDescription}
                              </Typography>
                            </td>
                          </tr>
                          <tr className="flex flex-row">
                            <td className=" w-40">
                              <span className="font-bold">Product Type</span>{" "}
                            </td>
                            <td className="flex flex-row ">
                              <span className="mx-4"> :</span>{" "}
                              <Typography className="capitalize max-w-sm">
                                {product.productType}
                              </Typography>
                            </td>
                          </tr>
                          <tr className="flex flex-row">
                            <td className=" w-40">
                              <span className="font-bold">Company</span>{" "}
                            </td>
                            <td className="flex flex-row ">
                              <span className="mx-4"> :</span>{" "}
                              <Typography className="capitalize">
                                {product.company}
                              </Typography>
                            </td>
                          </tr>

                          <tr className="flex flex-row w-">
                            <td className=" w-40">
                              <span className="font-bold">Product Url</span>{" "}
                            </td>
                            <td className="flex flex-row ">
                              <span className="mx-4"> :</span>{" "}
                              <Typography className="capitalize flex flex-row">
                                <RxGlobe
                                  className="h-5 w-5 text-blue-600 cursor-pointer"
                                  onClick={(e) => {
                                    window.open(
                                      `${product.productUrl}`,
                                      "_blank"
                                    );
                                  }}
                                />
                              </Typography>
                            </td>
                          </tr>
                        </table>
                      ))}
                    </div>

                    <div className="flex flex-col">
                      <h1 class="font-bold text-2xl text-gray-700 mb-6">
                        Appointment Details:
                      </h1>
                      <table className="w-[40%] min-w-max table-auto text-left">
                        {details?.availabilityDetails?.map(
                          (availability, key) => (
                            <>
                              <tr className="flex flex-row">
                                <td className="w-28">
                                  <span className="font-bold">Date</span>{" "}
                                </td>
                                <td className="flex flex-row ">
                                  <span className="mx-4"> :</span>{" "}
                                  <Typography>
                                    <Moment format="MMMM DD, YYYY">
                                      {availability.availabilityDate}
                                    </Moment>{" "}
                                  </Typography>
                                </td>
                              </tr>
                              <tr className="flex flex-row">
                                <td className="w-28">
                                  <span className="font-bold">Time</span>{" "}
                                </td>
                                <td className="flex flex-row ">
                                  <span className="mx-4"> :</span>{" "}
                                  <Typography>
                                    {convertFrom24To12Format(
                                      availability.availabilityTime
                                    )}
                                  </Typography>
                                </td>
                              </tr>
                              <tr className="flex flex-row">
                                <td className="w-28">
                                  <span className="font-bold">
                                    Meeting Type:
                                  </span>{" "}
                                </td>
                                <td className="flex flex-row ">
                                  <span className="mx-4"> :</span>{" "}
                                  <Typography>
                                    {availability.availabilityType}
                                  </Typography>
                                </td>
                              </tr>
                              <tr className="flex flex-row">
                                <td className="w-28">
                                  <span className="font-bold">Status:</span>{" "}
                                </td>
                                <td className="flex flex-row ">
                                  <span className="mx-4"> :</span>{" "}
                                  <Typography className="flex flex-row items-center">
                                    <Chip
                                      size="sm"
                                      variant="ghost"
                                      className="text-center ml-2 w-24"
                                      value={
                                        appointmentStatus === "Pending"
                                          ? "Pending"
                                          : appointmentStatus
                                      }
                                      color={
                                        appointmentStatus[0] === "Pending"
                                          ? "red"
                                          : appointmentStatus[0] === "Reject"
                                            ? "red"
                                            : "green"
                                      }
                                    />
                                  </Typography>
                                </td>
                              </tr>
                              <tr className="flex flex-row">
                                <td className="w-28">
                                  <span className="font-bold">
                                    {appointmentStatus[0] === "Approve"
                                      ? "Message"
                                      : "Reason"}
                                  </span>{" "}
                                </td>
                                <td className="flex flex-row w-52">
                                  <span className="mx-4"> :</span>{" "}
                                  <Typography className="flex flex-row items-center">
                                    {reason}
                                  </Typography>
                                </td>
                              </tr>
                            </>
                          )
                        )}
                      </table>
                    </div>
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

export default AppointmentDetails;
