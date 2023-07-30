import {
  Button,
  Card,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { BsTrashFill } from "react-icons/bs";

const TABLE_HEAD = ["Date", "Time", "Type", "Availability", "Action"];

const MyAvailability = ({ data }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userId] = useState(userInfo._id);

  const [myAvailability, setMyAvailability] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/appointment/my-availability", {
        userId: userId,
      })
      .then((result) => {
        setMyAvailability(result.data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  setTimeout(() => {
    axios
      .post("http://localhost:8080/api/appointment/my-availability", {
        userId: userId,
      })
      .then((result) => {
        setMyAvailability(result.data);
      })
      .catch((error) => console.log(error));
  }, 3000);

  const refreshData = () => {
    axios
      .post("http://localhost:8080/api/appointment/my-availability", {
        userId: userId,
      })
      .then((result) => {
        setMyAvailability(result.data);
      })
      .catch((error) => console.log(error));
  };

  const convertFrom24To12Format = (time24) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? "AM" : "PM";
    const hours = +sHours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [availId, setAvailId] = useState("");

  const handleDelete = (id) => {
    setOpenDelete((cur) => !cur);
    setAvailId(id);
  };
  const handleConfirmDelete = () => {
    axios
      .post("http://localhost:8080/api/appointment/delete-availability", {
        availId: availId,
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        refreshData();
      });
    setOpenDelete(false);
  };

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">MY AVAILABILITY</h1>
            <Card className="overflow-scroll max-h-[70vh] h-full w-full">
              {myAvailability.length === 0 ? (
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
                      NO AVAILABILITY FOUND
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
                    {myAvailability.map((data, key) => (
                      <>
                        <tr className="even:bg-blue-gray-50/50">
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              <Moment format="MMMM DD, YYYY">
                                {data.availabilityDate}
                              </Moment>
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {convertFrom24To12Format(data.availabilityTime)}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.availabilityType}
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
                                  data.isAvailable ? "Available" : "Booked"
                                }
                                color={data.isAvailable ? "green" : "red"}
                              />
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Button
                              disabled={data.isAvailable ? false : true}
                              className="ml-4 bg-red-600"
                              onClick={() => handleDelete(data._id)}
                            >
                              <BsTrashFill className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>
          </div>
          <Dialog open={openDelete} handler={handleDelete}>
            <DialogHeader>Confirmation Message!</DialogHeader>
            <DialogBody divider>
              Are you sure you want to delete this availability?
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleDelete}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={handleConfirmDelete}
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
          <DashboardFooter />
          <ToastContainer />
        </main>
      </div>
    </>
  );
};

export default MyAvailability;
