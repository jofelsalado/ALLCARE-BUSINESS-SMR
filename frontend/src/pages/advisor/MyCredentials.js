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
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";

const MyCredentials = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userId] = useState(userInfo._id);
  const [myCredentials, setMyCredentials] = useState([]);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/credentials", {
        userId: userId,
      })
      .then((result) => {
        setMyCredentials(result.data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const [open, setOpen] = useState(false);
  const handleOpen = (src) => {
    setImgSrc(src);
    setOpen((cur) => !cur);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [credentialId, setCredentialId] = useState("");

  const handleDelete = (id) => {
    setOpenDelete((cur) => !cur);
    setCredentialId(id);
  };

  const refreshData = () => {
    axios
      .post("http://localhost:8080/api/credentials", {
        userId: userId,
      })
      .then((result) => {
        setMyCredentials(result.data);
      })
      .catch((error) => console.log(error));
  };

  const handleConfirmDelete = () => {
    axios
      .post("http://localhost:8080/api/credentials/delete", {
        credentialId: credentialId,
      })
      .then((res) => {
        refreshData();
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
            <h1 class="font-bold text-2xl text-gray-700">MY CREDENTIALS</h1>
            <div className="flex flex-row gap-5 flex-wrap">
              {myCredentials.map((data, key) => (
                <Card className="h-64 w-[32%] overflow-hidden transition-opacity hover:opacity-90">
                  <img
                    alt="nature"
                    className="h-full w-full object-cover object-center blur-sm"
                    src={data.credentials}
                  />
                  <BsFillTrashFill
                    onClick={() => handleDelete(data._id)}
                    className="bg-red-600 h-14 w-14 rounded-lg text-white absolute top-[40%] right-[30%] transform(-50%, -50%)"
                  />
                  <AiOutlineEye
                    onClick={() => handleOpen(data.credentials)}
                    className="bg-blue-600 h-14 w-14 rounded-lg text-white absolute top-[40%] right-[55%] transform(-50%, -50%)  cursor-pointer"
                  />
                </Card>
              ))}
            </div>

            <Dialog size="xl" open={open} handler={handleOpen}>
              <DialogHeader className="justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt="tania andrew"
                    src={userInfo.profilePicture}
                  />
                  <div className="-mt-px flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {userInfo.firstName + " " + userInfo.lastName}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-xs font-normal"
                    >
                      {userInfo.occupation}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button color="red" size="sm" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                </div>
              </DialogHeader>
              <DialogBody divider={true} className="p-0">
                <img
                  alt="nature"
                  className="h-[35rem] w-full object-contain object-center"
                  src={imgSrc}
                />
              </DialogBody>
            </Dialog>

            <Dialog open={openDelete} handler={handleDelete}>
              <DialogHeader>Confirmation Message!</DialogHeader>
              <DialogBody divider>
                Are you sure you want to delete this credentials?
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
          </div>
          <DashboardFooter />
          <ToastContainer />
        </main>
      </div>
    </>
  );
};

export default MyCredentials;
