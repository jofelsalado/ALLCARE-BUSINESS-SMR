import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Rating,
  Spinner,
  Textarea,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdPersonSearch } from "react-icons/md";
import axios from "axios";
import TableHeader from "./TableHeader";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import Moment from "react-moment";
import { FaUserCheck, FaUserTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

const headers = [
  { name: "Name", field: "firstName", sortable: true },
  { name: "User Type", field: "userType", sortable: true },
  { name: "Status", field: "isOnline", sortable: false },
  { name: "Account Status", field: "isOnline", sortable: false },
  { name: "Action", field: "action", sortable: false },
];

const ViewUsers = () => {
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const refreshData = () => {
    axios
      .get("http://localhost:8080/api/users")
      .then((result) => {
        setUserList(result.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:8080/api/users")
        .then((result) => {
          setIsLoaded(true);
          setUserList(result.data);
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, []);

  const searchData = useMemo(() => {
    let preData = userList;

    let newUserList = preData.filter((data) => data.userType !== "Admin");

    if (search) {
      newUserList = newUserList.filter(
        (user) =>
          user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
          user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
          user?.userType?.toLowerCase().includes(search.toLowerCase()) ||
          user?.address?.toLowerCase().includes(search.toLowerCase())
      );
    }

    //Sorting comments
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      newUserList = newUserList.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    return newUserList;
  }, [userList, search, sorting]);

  const [open, setOpen] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState([]);
  const handleClose = () => setOpen(false);

  const handleViewUser = (id) => {
    setOpen(true);
    const selectedUser = userList.filter((item) => item._id === id);
    setSelectedUserInfo(selectedUser);

    axios
      .post("http://localhost:8080/api/credentials", {
        userId: id,
      })
      .then((result) => {
        setLeadsMedicalHistory(result.data);
      })
      .catch((error) => console.log(error));
  };

  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isReactivateOpen, setIsReactivateOpen] = useState(false);
  const [activeUserId, setActiveUserId] = useState(false);
  const [userEmail, setUserName] = useState("");
  const [userFullName, setUserFullName] = useState("");

  const handleDeactivate = (id, email, fullname) => {
    setActiveUserId(id);
    setIsDeactivateOpen(true);
    setUserName(email);
    setUserFullName(fullname);
  };

  const handleConfirm = () => {
    axios
      .post("http://localhost:8080/api/users/account-management", {
        userId: activeUserId,
        accMngt: "Reactivate",
      })
      .then((res) => {
        setIsDeactivateOpen(false);
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
  };

  const handleReactivate = (id) => {
    setActiveUserId(id);
    setIsReactivateOpen(true);
    handleConfirm();
  };

  const handleDeactivation = (e) => {
    e.preventDefault();

    if (reason === "") {
      setIsDeactivateOpen(false);
      toast.error("Reason is required!", {
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
        .post("http://localhost:8080/api/users/account-management", {
          userId: activeUserId,
          accMngt: "Deactivate",
        })
        .then((res) => {
          setIsDeactivateOpen(false);
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
      emailjs
        .sendForm(
          "service_q3tkz1g",
          "template_873fnrg",
          e.target,
          "9SNtDkwu5iL7PA2e9"
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
    }
  };

  const generatePDF = (searchData) => {
    // initialize jsPDF
    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn = [
      "Full Name",
      "Email",
      "Contact Number",
      "Occupation",
      "Educational Level",
      "Home Address",
      "Joined Date",
    ];
    // define an empty array of rows
    const tableRows = [];

    // for each ticket pass all its data into an array
    searchData.forEach((user) => {
      const userData = [
        user.firstName + " " + user.lastName,
        user.email,
        user.contactNumber,
        user.occupation,
        user.educationalLevel,
        user.address,
        format(new Date(user.createdAt), "MM-dd-yyyy"),
      ];
      // push each tickcet's info into a row
      tableRows.push(userData);
    });

    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left
    doc.text("Users Report", 14, 15);
    // we define the name of our PDF file.
    doc.save(`report_${dateStr}.pdf`);
  };

  const [leadsMedicalHistory, setLeadsMedicalHistory] = useState([]);

  const [openDetails, setOpenDetails] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  const handleOpenDetails = (src) => {
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
            <Card className="overflow-scroll h-full w-full">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div>
                    <Typography variant="h5" color="blue-gray">
                      Users List
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                      These are details about the users
                    </Typography>
                  </div>
                  <div className="flex w-full shrink-0 gap-2 md:w-max">
                    <Button
                      className="btn btn-primary"
                      onClick={() => generatePDF(searchData)}
                    >
                      Generate report
                    </Button>
                    <div className="w-full">
                      <Input
                        label="Search"
                        icon={<BsSearch className="h-5 w-5" />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <table className="w-full min-w-max table-auto text-left cursor-pointer">
                <TableHeader
                  headers={headers}
                  onSorting={(field, order) => setSorting({ field, order })}
                />
                {isLoaded && (
                  <tbody>
                    {searchData.map((data, key) => (
                      <>
                        <tr className="even:bg-blue-gray-50/50">
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.firstName} {data.lastName}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.userType}
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
                                  data.isOnline === true ? "Online" : "Offline"
                                }
                                color={data.isOnline === true ? "green" : "red"}
                              />
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
                                  data.isActive === true
                                    ? "Active"
                                    : "Deactivated"
                                }
                                color={data.isActive === true ? "green" : "red"}
                              />
                            </Typography>
                          </td>
                          <td className="p-4 flex flex-row">
                            <Tooltip content="View User Details">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                                onClick={() => handleViewUser(data._id)}
                              >
                                <MdPersonSearch className="h-5 w-5 text-blue-600" />
                              </Typography>
                            </Tooltip>

                            {data.isActive ? (
                              <Tooltip content="Deactivate User">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal ml-4"
                                  onClick={() =>
                                    handleDeactivate(
                                      data._id,
                                      data.email,
                                      data.firstName + " " + data.lastName
                                    )
                                  }
                                >
                                  <FaUserTimes className="h-5 w-5 text-red-600" />
                                </Typography>
                              </Tooltip>
                            ) : (
                              <Tooltip content="Reactivate User">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal ml-4"
                                  onClick={() => handleReactivate(data._id)}
                                >
                                  <FaUserCheck className="h-5 w-5 text-green-600" />
                                </Typography>
                              </Tooltip>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                )}
              </table>
              {!isLoaded ? (
                <div className="w-full h-full flex flex-row items-center justify-center">
                  <Spinner className="h-16 w-16 text-blue-500/10" />
                </div>
              ) : (
                searchData.length === 0 && (
                  <div className="w-full h-full flex flex-row items-center justify-center">
                    <h1>NO USERS FOUND</h1>
                  </div>
                )
              )}
            </Card>
          </div>
          <DashboardFooter />
          <Dialog open={open} handler={handleViewUser} size="xl">
            <DialogHeader>User Info</DialogHeader>
            <DialogBody divider>
              {selectedUserInfo?.map((data) =>
                data.userType === "Advisor" ? (
                  <>
                    <div className="flex flex-row px-6 text-gray-800 gap-14">
                      <div className="flex flex-col  w-[25%] gap-2 items-center justify-start mb-6">
                        <Avatar
                          size="xxl"
                          alt="avatar"
                          src={data.profilePicture}
                          className="mb-4 ring-4 ring-blue-500/30 border border-blue-500 shadow-xl shadow-blue-900/20"
                        />
                        <div className=" flex flex-row item-center justify-center gap-2">
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.facebook === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.facebook}`, "_blank");
                                }}
                              >
                                <AiFillFacebook className="h-5 w-5 text-[#3b5998]" />
                              </Button>
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.instagram === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.instagram}`, "_blank");
                                }}
                              >
                                <AiFillInstagram className="h-5 w-5 text-[#E4405F]" />
                              </Button>
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.linkedIn === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.linkedIn}`, "_blank");
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
                                {data.firstName}
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
                                {data.middleName}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Last Name</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.lastName}
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
                                {data.civilStatus}
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
                                {data.birthDate}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Age</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.age}
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
                                {data.contactNumber}
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
                                {data.education}
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
                                {data.educationalLevel}
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
                                {data.expertise}
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
                                {data.occupation}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Company</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.company}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Home Address</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.address}
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
                                {data.workAddress}
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
                                <Rating
                                  value={data.rating >= 5 ? 5 : 0}
                                  readonly
                                />
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
                                  {data.createdAt}
                                </Moment>
                              </Typography>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex flex-row px-6 text-gray-800 gap-14">
                      <div className="flex flex-col  w-[25%] gap-2 items-center justify-start mb-6">
                        <Avatar
                          size="xxl"
                          alt="avatar"
                          src={data.profilePicture}
                          className="mb-4 ring-4 ring-blue-500/30 border border-blue-500 shadow-xl shadow-blue-900/20"
                        />
                        <div className=" flex flex-row item-center justify-center gap-2">
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.facebook === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.facebook}`, "_blank");
                                }}
                              >
                                <AiFillFacebook className="h-5 w-5 text-[#3b5998]" />
                              </Button>
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.instagram === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.instagram}`, "_blank");
                                }}
                              >
                                <AiFillInstagram className="h-5 w-5 text-[#E4405F]" />
                              </Button>
                            </div>
                          </div>
                          <div className="mb-6">
                            <div className="">
                              <Button
                                disabled={data.linkedIn === "" ? true : false}
                                size="md"
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-3"
                                onClick={(e) => {
                                  window.open(`${data.linkedIn}`, "_blank");
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
                                {data.firstName}
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
                                {data.middleName}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Last Name</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.lastName}
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
                                {data.civilStatus}
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
                                {data.birthDate}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Age</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.age}
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
                                {data.contactNumber}
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
                                {data.education}
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
                                {data.educationalLevel}
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
                                {data.occupation}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Home Address</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.address}
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
                                {data.workAddress}
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
                                {data.smokingStatus}
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
                                {data.salaryRange}
                              </Typography>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span className="font-bold">Religion</span>{" "}
                            </td>
                            <td>
                              <Typography className="capitalize">
                                <span className="mx-4"> :</span> {data.religion}
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
                                {data.dependent1}
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
                                {data.dependent2}
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
                                {data.dependent3}
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
                                  {data.createdAt}
                                </Moment>
                              </Typography>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </>
                )
              )}
            </DialogBody>
            <DialogFooter>
              <Button variant="gradient" color="red" onClick={handleClose}>
                <span>Close</span>
              </Button>
            </DialogFooter>
          </Dialog>

          {/* Deactivate User */}
          <Dialog open={isDeactivateOpen} handler={handleDeactivate}>
            <DialogHeader>Deactivate User</DialogHeader>
            <form onSubmit={handleDeactivation}>
              <DialogBody divider className="flex flex-col gap-4">
                <Input
                  name="fullname"
                  label="Full Name"
                  value={userFullName}
                  className="mb-4"
                />

                <Input
                  name="email"
                  label="Email"
                  value={userEmail}
                  className="mb-4"
                />
                <Textarea
                  label="Reason for Deactivation"
                  value={reason}
                  name="reason"
                  onChange={(e) => setReason(e.target.value)}
                />
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setIsDeactivateOpen(false)}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button type="submit" variant="gradient" color="green">
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </form>
          </Dialog>

          {/* Deactivate User
          <Dialog open={isReactivateOpen} handler={handleReactivate}>
            <DialogHeader>Reactivate User</DialogHeader>
            <form onSubmit={handleConfirm}>
              <DialogBody divider>
                Are you sure you want to reactive this user?
              </DialogBody>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={() => setIsReactivateOpen(false)}
                  className="mr-1"
                >
                  <span>Cancel</span>
                </Button>
                <Button type="submit" variant="gradient" color="green">
                  <span>Confirm</span>
                </Button>
              </DialogFooter>
            </form>
          </Dialog> */}
          <ToastContainer />
        </main>
      </div>
    </>
  );
};

export default ViewUsers;
