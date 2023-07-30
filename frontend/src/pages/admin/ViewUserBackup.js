import {
  Button,
  Card,
  CardHeader,
  Chip,
  Input,
  Typography,
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";

const TABLE_HEAD = [
  "Profile Picture",
  "Name",
  "Contact #",
  "Email",
  "Address",
  "User Type",
  // "Action",
];

const ViewUsers = () => {
  const [userList, setUserList] = useState([]);

  const [search, setSearch] = useState("");

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
  }, []);

  const searchData = useMemo(() => {
    let preData = userList;

    let newUserList = preData.filter((data) => data.userType !== "Admin");

    if (search) {
      newUserList = newUserList.filter(
        (user) =>
          user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
          user?.lastName?.toLowerCase().includes(search.toLowerCase()) ||
          user?.userType?.toLowerCase().includes(search.toLowerCase())
      );
    }

    return newUserList;
  });

  console.log(searchData);

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <Card className="overflow-scroll max-h-[70vh] h-full w-full">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                  <div>
                    <Typography variant="h5" color="blue-gray">
                      User List
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                      These are details about the users
                    </Typography>
                  </div>
                  <div className="flex w-full shrink-0 gap-2 md:w-max">
                    <div className="w-full md:w-72">
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
                  {searchData.map((data, key) => (
                    <>
                      <tr className="even:bg-blue-gray-50/50">
                        <td className="p-4 w-44">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            <img
                              src={data.profilePicture}
                              className="h-10 w-10 rounded-full"
                            />
                          </Typography>
                        </td>
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
                            {data.contactNumber}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.email}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data.address}
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
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
          <DashboardFooter />
        </main>
      </div>
    </>
  );
};

export default ViewUsers;
