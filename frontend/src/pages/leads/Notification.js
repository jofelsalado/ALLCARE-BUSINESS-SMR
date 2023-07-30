import {
  Card,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BellIcon } from "@heroicons/react/24/solid";
import { TiDeleteOutline } from "react-icons/ti";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userId] = useState(userInfo._id);
  const [notificationDetail, setNotificationDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [notificationId, setNotificationId] = useState();
  const navigate = useNavigate();

  const handleConfirm = () => {
    axios
      .post("http://localhost:8080/api/appointment/delete-notification", {
        notificationId: notificationId,
      })
      .then((result) => {
        console.log(result);
      });
    setOpen(false);
  };

  const handleOpen = (id) => {
    setNotificationId(id);
    setOpen(!open);
  };

  setTimeout(() => {
    axios
      .post("http://localhost:8080/api/appointment/get-notification", {
        userId: userId,
      })
      .then((result) => {
        setNotificationDetails(result.data);
      })
      .catch((error) => console.log(error));
  }, 1000);

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/appointment/get-notification", {
        userId: userId,
      })
      .then((result) => {
        setNotificationDetails(result.data);
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

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">NOTIFICATIONS</h1>
            <Card className="overflow-scroll max-h-[70vh] h-full w-full p-10">
              {notificationDetail.map((data, key) => (
                <div
                  className={`border ${
                    data.isOpened ? "border-gray-500" : "border-red-500"
                  } p-4 rounded-md cursor-pointer mb-4`}
                >
                  <div className="flex flex-row justify-between">
                    <div
                      className="flex flex-col justify-between"
                      onClick={() => handleViewAppointment(data.appointmentId)}
                    >
                      <Moment fromNow className="text-gray-400">
                        {data.createdAt}
                      </Moment>
                      <div className="mt-2">{data.notificationMessage}</div>
                    </div>
                    <span
                      className="cursor-pointer text-red-600"
                      onClick={() => handleOpen(data._id)}
                    >
                      <TiDeleteOutline className="h-6 w-6" />
                    </span>
                  </div>
                </div>
              ))}
            </Card>
          </div>

          <DashboardFooter />

          <Dialog open={open} handler={handleOpen}>
            <DialogHeader>Your Attention is Required!</DialogHeader>
            <DialogBody divider className="grid place-items-center gap-4">
              <BellIcon className="h-16 w-16 text-red-500" />
              <Typography color="red" variant="h4 text-center">
                Are you sure you want to delete this notification?
              </Typography>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="green" onClick={handleConfirm}>
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </main>
      </div>
    </>
  );
};

export default Notification;
