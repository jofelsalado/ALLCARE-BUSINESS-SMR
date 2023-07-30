import { Card, Typography } from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const TABLE_HEAD = ["Complainant Name", "Subject", "Description"];

const ComplaintDetails = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const [userId] = useState(userInfo._id);
  const [myComplaint, setMyComplaint] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/complaint/details", {
        complaintId: location?.state?.id,
      })
      .then((result) => {
        setMyComplaint(result.data);
      })
      .catch((error) => console.log(error));
  }, [userId, location]);

  useEffect(() => {
    axios.post("http://localhost:8080/api/appointment/read-notification", {
      appointmentId: location?.state?.id,
      userId: userId,
    });
  }, [userId, location]);

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">COMPLAINTS DETAILS</h1>
            <Card className="overflow-scroll max-h-[70vh] h-full w-full">
              {myComplaint.length === 0 ? (
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
                      NO COMPLAINT FOUND
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
                    <>
                      <tr className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal uppercase"
                          >
                            {myComplaint.complainantName}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {myComplaint.subject}
                          </Typography>
                        </td>
                        <td className="p-4 w-72">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {myComplaint.description}
                          </Typography>
                        </td>
                      </tr>
                    </>
                  </tbody>
                </table>
              )}
            </Card>
          </div>

          <DashboardFooter />
        </main>
      </div>
    </>
  );
};

export default ComplaintDetails;
