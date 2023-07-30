import { Button, Card, Chip, Typography } from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SlMagnifier } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  "Appointment #",
  "Message",
  "Status",
  "Ratings & Review",
  "Action",
];

const MyAppoitnment = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userId] = useState(userInfo._id);
  const [myAppointment, setMyAppointment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/appointment/leads-details", {
        userId: userId,
      })
      .then((result) => {
        setMyAppointment(result.data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleViewAppointment = (id) => {
    navigate("/leads/appointment-details", {
      state: {
        id,
      },
    });
  };

  const handleGiveFeedback = (id, appointmentId) => {
    navigate("/leads/rating-and-review", {
      state: {
        id,
        appointmentId,
      },
    });
  };

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">MY APPOINTMENT</h1>
          </div>
          <Card className="overflow-scroll max-h-[70vh] h-full w-full">
            {myAppointment.length === 0 ? (
              <>
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                </table>
                <div className="flex w-full h-[50vh] items-center justify-center">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-4xl"
                  >
                    NO APPOINTMENT FOUND
                  </Typography>
                </div>
              </>
            ) : (
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {myAppointment.map((data, key) => (
                    <>
                      <tr className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal uppercase"
                          >
                            {data._id}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal uppercase"
                          >
                            {data.reason}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            <Chip
                              size="sm"
                              variant="ghost"
                              className="text-center ml-2 w-24"
                              value={
                                data.appointmentStatus === "Pending"
                                  ? "Pending"
                                  : data.appointmentStatus
                              }
                              color={
                                data.appointmentStatus === "Pending" ||
                                data.appointmentStatus === "Reject"
                                  ? "red"
                                  : "green"
                              }
                            />
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal uppercase"
                          >
                            <Button
                              disabled={
                                data.appointmentStatus === "Complete"
                                  ? data.reason ===
                                    "Thank you for your feedback"
                                    ? true
                                    : false
                                  : true
                              }
                              onClick={() =>
                                handleGiveFeedback(data.advisorId, data._id)
                              }
                            >
                              Give Feedback
                            </Button>
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue"
                            className="font-medium cursor-pointer"
                            onClick={() => handleViewAppointment(data._id)}
                          >
                            <SlMagnifier className="h-6 w-6" />
                          </Typography>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
          <DashboardFooter />
        </main>
      </div>
    </>
  );
};

export default MyAppoitnment;
