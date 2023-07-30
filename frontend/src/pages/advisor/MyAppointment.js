import {
  Button,
  Card,
  Chip,
  PopoverContent,
  PopoverHandler,
  Typography,
  Popover,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { SlMagnifier } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { MdEditNote } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { AiOutlineFileSearch } from "react-icons/ai";
import { TbTrashFilled } from "react-icons/tb";

const TABLE_HEAD = [
  "Appointmend #",
  "Submiited Date",
  "Status",
  "Notes",
  "Action",
];

const NOTES_TABLE_HEAD = ["Notes", "Time", "Date", "Action"];

const MyAppointment = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userId] = useState(userInfo._id);
  const [myAppointment, setMyAppointment] = useState([]);
  const [myAvailability, setMyAvailability] = useState([]);
  const navigate = useNavigate();
  // Edit Status Variables
  const [appointmentStatus, setAppointmentStatus] = useState();
  const [selectedApprove, setSelectedApprove] = useState(false);
  const [selectedReject, setSelectedReject] = useState(false);
  const [selectedResched, setSelectedResched] = useState(false);
  const [appointmentId, setAppointmentId] = useState(false);
  const [reason, setReason] = useState("");
  const [showRescheduleOption, setShowRescheduleOption] = useState(false);
  const [open, setOpen] = useState(false);

  const handleViewAppointment = (id) => {
    navigate("/advisor/appointment-details", {
      state: {
        id,
      },
    });
  };

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

  const handleSelect = (color) => {
    switch (color) {
      case "approve":
        setSelectedApprove(true);
        setSelectedReject(false);
        setSelectedResched(false);
        setShowRescheduleOption(false);
        setAppointmentStatus("Approve");

        break;
      case "reject":
        setSelectedApprove(false);
        setSelectedReject(true);
        setSelectedResched(false);
        setShowRescheduleOption(false);
        setAppointmentStatus("Reject");

        break;
      case "resched":
        setSelectedApprove(false);
        setSelectedReject(false);
        setSelectedResched(true);
        setShowRescheduleOption(true);
        setAppointmentStatus("Resched");
        break;

      default:
    }
  };

  const handleChangeStatus = (id) => {
    setAppointmentId(id);
  };

  const handleComplete = (id) => {
    setAppointmentId(id);
    setOpen(!open);
  };

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/appointment/advisor-appointment", {
        userId: userId,
      })
      .then((result) => {
        setMyAppointment(result.data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const refreshData = () => {
    axios
      .post("http://localhost:8080/api/appointment/advisor-appointment", {
        userId: userId,
      })
      .then((result) => {
        setMyAppointment(result.data);
      })
      .catch((error) => console.log(error));
  };

  // Change Status to Approve, Reject & Reject
  const handleSave = () => {
    if (reason === "") {
      toast.error("Message is required!", {
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
      if (!appointmentStatus) {
        toast.error("Please select a status", {
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
        axios
          .put("http://localhost:8080/api/appointment/change-status", {
            appointmentId: appointmentId,
            appointmentStatus: appointmentStatus,
            reason: reason,
          })
          .then((result) => {
            refreshData();
            setSelectedApprove(false);
            setSelectedReject(false);
            setSelectedResched(false);
            if (result.status === 200) {
              toast.success("Appointment status successfully changed", {
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
          })
          .catch((error) => {
            toast.error(error.response.data.message, {
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
      }
    }
  };

  // Change time format to 12 hours with AM/PM
  const convertFrom24To12Format = (time24) => {
    const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1);
    const period = +sHours < 12 ? "AM" : "PM";
    const hours = +sHours % 12 || 12;

    return `${hours}:${minutes} ${period}`;
  };

  const handleConfirmComplete = () => {
    axios
      .put("http://localhost:8080/api/appointment/change-status", {
        appointmentId: appointmentId,
        appointmentStatus: "Complete",
      })
      .then((result) => {
        refreshData();
        setSelectedApprove(false);
        setSelectedReject(false);
        setSelectedResched(false);
        setOpen(false);
        if (result.status === 200) {
          toast.success("Appointment status successfully changed", {
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
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
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
  };

  // Add Notes
  const [noteOpen, setNoteOpen] = useState(false);
  const [viewNoteOpen, setViewNoteOpen] = useState(false);
  const [appointId, setAppointId] = useState("");
  const [notes, setNotes] = useState("");
  const [myNotes, setMyNotes] = useState([]);

  console.log(myNotes);

  const handleNote = (id) => {
    setNoteOpen(true);
    setAppointId(id);
  };

  const handleViewNote = (id) => {
    setViewNoteOpen(true);
    setAppointId(id);
    axios
      .post("http://localhost:8080/api/appointment/get-notes", {
        appointId: appointId,
        notes: notes,
      })
      .then((res) => {
        setMyNotes(res.data);
        setNoteOpen(false);
      });
  };

  const handleNoteConfirm = (e) => {
    e.preventDefault();

    if (notes === "") {
      toast.error("Notes is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setNoteOpen(false);
    } else {
      axios
        .post("http://localhost:8080/api/appointment/add-notes", {
          appointId: appointId,
          notes: notes,
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
          setNoteOpen(false);
        });
    }
  };

  const handleDeleteNotes = (id) => {
    axios
      .post("http://localhost:8080/api/appointment/delete-notes", {
        notesId: id,
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
        setViewNoteOpen(false);
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
            <Card className="overflow-scroll max-h-[70vh] h-full w-full">
              {myAppointment?.length === 0 ? (
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
                    {myAppointment?.map((data, key) => (
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
                              <Moment format="MMMM DD, YYYY">
                                {data.createdAt}
                              </Moment>
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
                            <div className="flex flex-row items-center">
                              <Tooltip content="Add Notes">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal cursor-pointer"
                                >
                                  <AiOutlineFileAdd
                                    disabled={
                                      data.appointmentStatus === "Approve"
                                        ? false
                                        : true
                                    }
                                    onClick={() => handleNote(data._id)}
                                    className="h-6 w-6"
                                  />
                                </Typography>
                              </Tooltip>

                              <Tooltip content="View Notes">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal cursor-pointer"
                                >
                                  <AiOutlineFileSearch
                                    disabled={
                                      data.appointmentStatus === "Approve"
                                        ? false
                                        : true
                                    }
                                    onClick={() => handleViewNote(data._id)}
                                    className="h-6 w-6"
                                  />
                                </Typography>
                              </Tooltip>
                            </div>
                          </td>
                          <td className="p-4 flex flex-row gap-6 items-center">
                            <Typography
                              variant="small"
                              color="blue"
                              className="font-medium cursor-pointer"
                              onClick={() => handleViewAppointment(data._id)}
                            >
                              <SlMagnifier className="h-6 w-6" />
                            </Typography>
                            <Popover placement="bottom-end">
                              <PopoverHandler
                                onClick={() => handleChangeStatus(data._id)}
                              >
                                <Button
                                  disabled={
                                    data.appointmentStatus === "Approve" ||
                                    data.appointmentStatus === "Reject" ||
                                    data.appointmentStatus === "Complete"
                                      ? true
                                      : false
                                  }
                                >
                                  <MdEditNote className="w-5 h-5" />
                                </Button>
                              </PopoverHandler>
                              <PopoverContent className=" flex flex-col gap-4">
                                <Typography className="flex flex-row items-center">
                                  Current Status:{" "}
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

                                <Typography>Change Status:</Typography>
                                <div className="flex flex-row items-center justify-between gap-2">
                                  <Typography
                                    onClick={() => handleSelect("approve")}
                                  >
                                    <Chip
                                      size="sm"
                                      variant="ghost"
                                      className={`text-center w-24  cursor-pointer ${
                                        selectedApprove &&
                                        "shadow-lg shadow-green-500/50"
                                      }`}
                                      value={"Approve"}
                                      color={"green"}
                                    />
                                  </Typography>
                                  <Typography
                                    onClick={() => handleSelect("reject")}
                                  >
                                    <Chip
                                      size="sm"
                                      variant="ghost"
                                      className={`text-center w-24  cursor-pointer ${
                                        selectedReject &&
                                        "shadow-lg shadow-red-500/50"
                                      }`}
                                      value={"REJECT"}
                                      color={"red"}
                                    />
                                  </Typography>
                                  <Typography
                                    onClick={() => handleSelect("resched")}
                                  >
                                    <Chip
                                      size="sm"
                                      variant="ghost"
                                      className={`text-center w-24  cursor-pointer ${
                                        selectedResched &&
                                        "shadow-lg shadow-red-500/50"
                                      }`}
                                      value={"RESCHED"}
                                      color={"red"}
                                    />
                                  </Typography>
                                </div>
                                <hr />
                                <tr className="flex flex-col">
                                  <td>
                                    <Textarea
                                      label="Message"
                                      value={reason}
                                      onChange={(e) =>
                                        setReason(e.target.value)
                                      }
                                    />
                                  </td>
                                </tr>

                                {showRescheduleOption ? (
                                  <div>
                                    <tr className="flex flex-col">
                                      <td>
                                        <span className="font-bold">
                                          Reschedule
                                        </span>
                                      </td>
                                      <td>
                                        <Typography className="capitalize flex flex-row items-center">
                                          <select
                                            id="countries"
                                            class=" border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            //   onChange={(e) =>
                                            //     setAvailabilityId(e.target.value)
                                            //   }
                                          >
                                            <option selected>
                                              Select Availability
                                            </option>
                                            {myAvailability
                                              ?.filter(
                                                (item) =>
                                                  item.isAvailable === true
                                              )
                                              .map((data, key) => (
                                                <option value={data._id}>
                                                  <Moment format="MMMM DD, YYYY">
                                                    {data.availabilityDate}
                                                  </Moment>{" "}
                                                  {convertFrom24To12Format(
                                                    data.availabilityTime
                                                  )}
                                                  {" - "}
                                                  {data.availabilityType}
                                                </option>
                                              ))}
                                          </select>
                                        </Typography>
                                      </td>
                                    </tr>
                                  </div>
                                ) : (
                                  ""
                                )}
                                <div className="flex flex-row justify-end gap-2">
                                  <Typography
                                    onClick={handleSave}
                                    className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg"
                                  >
                                    Save
                                  </Typography>
                                </div>
                              </PopoverContent>
                              <Button
                                disabled={
                                  data.appointmentStatus === "Approve"
                                    ? false
                                    : true
                                }
                                onClick={() => handleComplete(data._id)}
                              >
                                Complete
                              </Button>
                            </Popover>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              )}
            </Card>
          </div>
          <Dialog open={open} handler={handleComplete}>
            <DialogHeader>Your Attention is Required!</DialogHeader>
            <DialogBody divider className="grid place-items-center gap-4">
              <Typography color="red" variant="h4 text-center">
                Are you sure you want to complete this appointment?
              </Typography>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleComplete}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={handleConfirmComplete}
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>

          <Dialog open={noteOpen} handler={handleNote}>
            <DialogHeader>Add notes for this appointment</DialogHeader>
            <DialogBody divider className="grid place-items-center gap-4">
              <Input
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={() => setNoteOpen(false)}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={handleNoteConfirm}
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>

          <Dialog open={viewNoteOpen} handler={handleViewNote}>
            <DialogHeader>My Notes</DialogHeader>
            <DialogBody divider className="grid gap-4">
              <table className="w-full min-w-max table-auto text-left">
                <thead className="text-left">
                  <tr>
                    {NOTES_TABLE_HEAD.map((head) => (
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
                  {myNotes.map((data, key) => (
                    <tr key={key}>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {data.notes}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {convertFrom24To12Format(data.createdAt)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Moment format="MMMM DD, YYYY">
                            {data.createdAt}
                          </Moment>
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="red"
                          className="font-medium"
                          onClick={() => handleDeleteNotes(data._id)}
                        >
                          <TbTrashFilled className="h-6 w-6" />
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={() => setViewNoteOpen(false)}
                className="mr-1"
              >
                <span>Close</span>
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

export default MyAppointment;
