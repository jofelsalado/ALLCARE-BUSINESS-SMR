import { Button, Card, Typography } from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

const TABLE_HEAD = [
  // "Complaint #",
  "Complainant Name",
  "Subject",
  "Type",
  "Complaint User",
  "Description",
];

const AllCompaint = () => {
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

  const generatePDF = (data) => {
    // initialize jsPDF
    const doc = new jsPDF();

    // define the columns we want and their titles
    const tableColumn = [
      "Complainant Name",
      "Subject",
      "Type",
      "Complaint User",
      "Description",
      "Complaint Date",
    ];
    // define an empty array of rows
    const tableRows = [];

    // for each ticket pass all its data into an array
    data.forEach((item) => {
      const complains = [
        item.complainantName,
        item.subject,
        item.type,
        item.complaintName,
        item.description,
        format(new Date(item.createdAt), "MM-dd-yyyy"),
      ];
      // push each tickcet's info into a row
      tableRows.push(complains);
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

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">ALL COMPLAINTS</h1>
            <Button
              className="btn btn-primary w-64"
              onClick={() => generatePDF(myComplaint)}
            >
              Generate report
            </Button>
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
                    {myComplaint.map((data, key) => (
                      <>
                        <tr className="even:bg-blue-gray-50/50">
                          {/* <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal uppercase"
                          >
                            {data._id}
                          </Typography>
                        </td> */}
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.complainantName}
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
                          <td className="p-4 w-72">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.description}
                            </Typography>
                          </td>
                        </tr>
                      </>
                    ))}
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

export default AllCompaint;
