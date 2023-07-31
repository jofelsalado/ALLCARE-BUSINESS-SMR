import {
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
import { BsTrashFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABLE_HEAD = [
  "Complaint #",
  "Subject",
  "Type",
  "Complaint User",
  "Description",
  "Action",
];

const MyComplaint = () => {  
  const { userInfo } = useSelector((state) => state.auth);
  const [userId] = useState(userInfo._id);
  const [myComplaint, setMyComplaint] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/complaint")
      .then((result) => {
        setMyComplaint(result.data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const refreshData = () => {
    axios
      .get("http://localhost:8080/api/complaint")
      .then((result) => {
        setMyComplaint(result.data);
      })
      .catch((error) => console.log(error));
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [complaintId, setComplaintId] = useState("");

  const handleDelete = (id) => {
    setOpenDelete((cur) => !cur);
    setComplaintId(id);
  };
  const handleConfirmDelete = () => {
    axios
      .post("http://localhost:8080/api/complaint/delete", {
        complaintId: complaintId,
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
            <h1 class="font-bold text-2xl text-gray-700">MY COMPLAINT</h1>
          </div>
          <Card className="overflow-scroll max-h-[70vh] h-full w-full">
            {myComplaint.filter((item) => item.userId === userId).length ===
            0 ? (
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
                  {myComplaint
                    .filter((item) => item.userId === userId)
                    .map((data, key) => (
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
                              className="font-normal"
                            >
                              {data.subject}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.type} Complaint
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.complaintName}
                            </Typography>
                          </td>
                          <td className="p-4 w-64">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.description}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Button
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
          <Dialog open={openDelete} handler={handleDelete}>
            <DialogHeader>Confirmation Message!</DialogHeader>
            <DialogBody divider>
              Are you sure you want to delete this complaint?
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
          <ToastContainer />
          <DashboardFooter />
        </main>
      </div>
    </>
  );
};

export default MyComplaint;
