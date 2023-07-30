import { Card, Spinner, Typography } from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useGetAdvisorUsersQuery } from "../../slices/usersApiSlice";
import AdvisorTable from "./components/AdvisorTable";

const TABLE_HEAD = [
  "Profile Picture",
  "Name",
  "Education",
  "Expertise",
  "Company",
  "Rating",
  "Action",
];

const ViewAdvisor = () => {
  const { data: users, isLoading } = useGetAdvisorUsersQuery("usersList", {
    pollingInterval: 10000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const tableContent =
    users?.ids?.length &&
    users?.ids.map((userId) => <AdvisorTable key={userId} userId={userId} />);

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">ADVISOR LIST</h1>
            <Card className="overflow-scroll max-h-[70vh] h-full w-full">
              {isLoading ? (
                <div className="w-full h-full flex flex-row items-center justify-center">
                  <Spinner className="h-16 w-16 text-blue-500/10" />
                </div>
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

                  <tbody>{tableContent}</tbody>
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

export default ViewAdvisor;
