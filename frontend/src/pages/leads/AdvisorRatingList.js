import { Card, Rating, Textarea, Typography } from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";

const TABLE_HEAD = ["Name", "Rating", "Review"];

export default function AdvisorRatingList() {
  const [ratingList, setRatingList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/rating/")
      .then((result) => {
        setRatingList(result?.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <SideMenu />
      <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
        <DashboardNavbar />
        <div class="main-content flex flex-col flex-grow p-4">
          <Card className="overflow-scroll h-full w-full">
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
              <tbody className="p-10">
                {ratingList.length !== 0 &&
                  ratingList?.map((data, key) => (
                    <>
                      <tr key={key} className="even:bg-blue-gray-50/50">
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.advisorName}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Rating value={parseInt(data.rating)} readonly />
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.review}
                          </Typography>
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
            {ratingList.length === 0 && (
              <div className="flex flex-row items-center justify-center h-1/2 w-full">
                <h1>No Ratings & Review Found</h1>
              </div>
            )}
          </Card>
        </div>
        <DashboardFooter />
      </main>
    </div>
  );
}
