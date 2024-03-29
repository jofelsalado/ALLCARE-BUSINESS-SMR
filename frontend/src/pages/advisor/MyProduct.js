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
} from "@material-tailwind/react";
import DashboardFooter from "./DashboardFooter";
import DashboardNavbar from "./DashboardNavbar";
import SideMenu from "./SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { RxGlobe } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsTrash2Fill, BsTrashFill } from "react-icons/bs";

const TABLE_HEAD = [
  "Name",
  "Description",
  "Type",
  "Company",
  "URL",
  "Status",
  "Action",
];

const MyProducts = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userId] = useState(userInfo._id);
  const [myProducts, setMyProducts] = useState([]);

  // Edit Status Variables
  const [productStatus, setProductStatus] = useState();
  const [selectedGreen, setSelectedGreen] = useState(false);
  const [selectedRed, setSelectedRed] = useState(false);
  const [productId, setProductId] = useState(false);

  const handleSelect = (color) => {
    if (color === "green") {
      setSelectedGreen(true);
      setSelectedRed(false);
      setProductStatus(true);
    } else {
      setSelectedGreen(false);
      setSelectedRed(true);
      setProductStatus(false);
    }
  };

  const handleChangeStatus = (id) => {
    setProductId(id);
  };

  useEffect(() => {
    axios
      .post("http://localhost:8080/api/product/advisor-product", {
        userId: userId,
      })
      .then((result) => {
        setMyProducts(result.data);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const refreshData = () => {
    axios
      .post("http://localhost:8080/api/product/advisor-product", {
        userId: userId,
      })
      .then((result) => {
        setMyProducts(result.data);
      })
      .catch((error) => console.log(error));
  };

  const handleSave = () => {
    axios
      .put("http://localhost:8080/api/product/", {
        userId: userId,
        productId: productId,
        productStatus: productStatus,
      })
      .then((result) => {
        setMyProducts(result.data);
        setSelectedRed(false);
        setSelectedGreen(false);
        if (result.status === 200) {
          toast.success("Company successfully changed status", {
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

  const [openDelete, setOpenDelete] = useState(false);
  const [prodId, setProdId] = useState("");

  const handleDelete = (id) => {
    setOpenDelete((cur) => !cur);
    setProdId(id);
  };
  const handleConfirmDelete = () => {
    axios
      .post("http://localhost:8080/api/product/delete", {
        productId: prodId,
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
            <h1 class="font-bold text-2xl text-gray-700">MY PRODUCTS</h1>
            <Card className="overflow-scroll max-h-[70vh] h-full w-full">
              {myProducts.length === 0 ? (
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
                      NO PRODUCT FOUND
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
                    {myProducts.map((data, key) => (
                      <>
                        <tr className="even:bg-blue-gray-50/50">
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.productName}
                            </Typography>
                          </td>
                          <td className="p-4 w-52">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.productDescription}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.productType}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data.company}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Button
                              size="md"
                              variant="outlined"
                              className="flex items-center gap-3 text-blue-600"
                              onClick={(e) => {
                                window.open(`${data.productUrl}`, "_blank");
                              }}
                            >
                              <RxGlobe className="h-5 w-5 text-blue-600" />
                            </Button>
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
                                  data.productStatus ? "Active" : "Inactive"
                                }
                                color={data.productStatus ? "green" : "red"}
                              />
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Popover placement="bottom-end">
                              <PopoverHandler
                                onClick={() => handleChangeStatus(data._id)}
                              >
                                <Button>Edit Status</Button>
                              </PopoverHandler>
                              <PopoverContent className=" flex flex-col gap-4">
                                <Typography className="flex flex-row items-center">
                                  Current Status:{" "}
                                  <Chip
                                    size="sm"
                                    variant="ghost"
                                    className="text-center ml-2 w-24"
                                    value={
                                      data.productStatus === true
                                        ? "Active"
                                        : "Inactive"
                                    }
                                    color={
                                      data.productStatus === true
                                        ? "green"
                                        : "red"
                                    }
                                  />
                                </Typography>

                                <Typography>Change Status:</Typography>
                                <div className="flex flex-row items-center justify-between gap-2">
                                  <Typography
                                    onClick={() => handleSelect("green")}
                                  >
                                    <Chip
                                      size="sm"
                                      variant="ghost"
                                      className={`text-center w-24  cursor-pointer ${
                                        selectedGreen &&
                                        "shadow-lg shadow-green-500/50"
                                      }`}
                                      value={"Active"}
                                      color={"green"}
                                    />
                                  </Typography>
                                  <Typography
                                    onClick={() => handleSelect("red")}
                                  >
                                    <Chip
                                      size="sm"
                                      variant="ghost"
                                      className={`text-center w-24  cursor-pointer ${
                                        selectedRed &&
                                        "shadow-lg shadow-red-500/50"
                                      }`}
                                      value={"Inactive"}
                                      color={"red"}
                                    />
                                  </Typography>
                                </div>
                                <div className="flex flex-row justify-end gap-2">
                                  <Typography
                                    onClick={handleSave}
                                    className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg"
                                  >
                                    Save
                                  </Typography>
                                </div>
                              </PopoverContent>
                            </Popover>
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
          </div>
          <Dialog open={openDelete} handler={handleDelete}>
            <DialogHeader>Confirmation Message!</DialogHeader>
            <DialogBody divider>
              Are you sure you want to delete this product?
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
          <DashboardFooter />
          <ToastContainer />
        </main>
      </div>
    </>
  );
};

export default MyProducts;
