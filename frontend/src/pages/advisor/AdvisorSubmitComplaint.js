import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideMenu from "./SideMenu";
import DashboardNavbar from "./DashboardNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "./DashboardFooter";
import { Input, Option, Select, Textarea } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";

const AdvisorSubmitComplaint = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [complaintName, setComplaintName] = useState("");
  const [complainantName] = useState(
    userInfo.firstName + " " + userInfo.lastName
  );
  const [userList, setUserList] = useState([]);

  const handleComplaint = (id, name) => {
    setComplaintId(id);
    setComplaintName(name);
  };
  const clearFields = () => {
    setSubject("");
    setType("");
    setDescription("");
    setComplaintId("");
    setComplaintName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "User") {
      if (complaintId === "") {
        toast.error("Please select a user", {
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
    }

    await axios
      .post("http://localhost:8080/api/complaint", {
        userId: userInfo._id,
        complainantName: complainantName,
        subject: subject,
        type: type,
        complaintId: type === "System" ? "0000000000" : complaintId,
        complaintName: type === "System" ? "Admin" : complaintName,
        description: description,
      })
      .then((result) => {
        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        clearFields();
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
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

  useEffect(() => {
    if (type === "System") {
      setComplaintId("");
      setComplaintName("");
    }
  }, [type]);

  useEffect(() => {
    const getData = () => {
      axios
        .get("http://localhost:8080/api/users")
        .then((result) => {
          setUserList(result.data);
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, [userInfo]);

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">
              FILE A COMPLAINT REPORT
            </h1>
            <section className="pt-2 overflow-auto max-h-[74vh]">
              <div className="px-6 h-full text-gray-800">
                <form
                  className="bg-white p-10 shadow-2xl"
                  onSubmit={handleSubmit}
                >
                  <div className="flex justify-center gap-5 p-10">
                    {/* 1st Column */}
                    <div className="flex flex-col">
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Subject"
                            value={subject}
                            required
                            onChange={(e) => setSubject(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Select label="Type" required>
                            <Option onClick={() => setType("System")}>
                              System Complaint
                            </Option>
                            <Option onClick={() => setType("User")}>
                              User Complaint
                            </Option>
                          </Select>
                        </div>
                      </div>
                      {type === "User" ? (
                        <div className="mb-6">
                          <div className="w-64">
                            <Select label="Type" required>
                              {userList
                                .filter(
                                  (item) =>
                                    item._id !== userInfo._id &&
                                    item.userType !== "Admin" &&
                                    item.userType !== "Advisor"
                                )
                                .map((data, key) => (
                                  <Option
                                    key={key}
                                    onClick={() =>
                                      handleComplaint(
                                        data._id,
                                        data.firstName + " " + data.lastName
                                      )
                                    }
                                  >
                                    {data.userType} - {data.firstName}{" "}
                                    {data.lastName}
                                  </Option>
                                ))}
                            </Select>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="mb-4">
                        <div className="w-64">
                          <Textarea
                            label="Description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center lg:text-right">
                    <button
                      type="submit"
                      className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Submit
                    </button>
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

export default AdvisorSubmitComplaint;
