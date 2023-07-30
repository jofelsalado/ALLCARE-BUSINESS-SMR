import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideMenu from "./SideMenu";
import DashboardNavbar from "./DashboardNavbar";
import { useAddProductMutation } from "../../slices/usersApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardFooter from "./DashboardFooter";
import {
  Chip,
  Input,
  Switch,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import axios from "axios";

const AddProduct = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [advisorName] = useState(userInfo.firstName + " " + userInfo.lastName);
  const [userId] = useState(userInfo._id);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [productStatus, setProductStatus] = useState(true);
  const [company, setCompany] = useState("");
  const [productUrl, setProductUrl] = useState("");

  const [companyList, setCompanyList] = useState([]);

  const loadCompany = () => {
    axios
      .post("http://localhost:8080/api/company/get-company", {
        userId: userId,
      })
      .then((result) => {
        setCompanyList(result.data);
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setCompany(e.target.value);
  };

  const [addProduct] = useAddProductMutation();

  const clearFields = () => {
    setProductName("");
    setProductDescription("");
    setProductType("");
    setCompany("");
    setProductUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const saveProduct = await addProduct({
        userId,
        productName,
        productDescription,
        productType,
        productStatus,
        advisorName,
        company,
        productUrl,
      }).unwrap();

      if (saveProduct) {
        toast.success("Product has been successfully added!", {
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

      clearFields();
    } catch (err) {
      toast.error(
        err?.data?.message ||
          err.message ||
          err?.data?.errorMessage ||
          err.errorMessage,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">ADD PRODUCT</h1>
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
                            label="Product Name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="w-64">
                          <Textarea
                            label="Product Description"
                            value={productDescription}
                            onChange={(e) =>
                              setProductDescription(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Product Type"
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2nd Column */}
                    <div className="flex flex-col ">
                      <div className="mb-6">
                        <div className="w-64">
                          <Input
                            label="Advisor Name"
                            value={advisorName}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="mb-[22px]">
                        <div className="w-64">
                          <select
                            id="countries"
                            class=" border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={handleChange}
                            onClick={loadCompany}
                          >
                            <option selected>Select Company</option>
                            {companyList
                              .filter((item) => item.companyStatus === true)
                              .map((data, key) => (
                                <option value={data.companyName}>
                                  {data.companyName}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      <div className="mb-7">
                        <div className="w-64">
                          <Input
                            label="Product Url"
                            value={productUrl}
                            onChange={(e) => setProductUrl(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-5">
                        <div className="w-54">
                          <Switch
                            disabled
                            id="auto-update"
                            label={
                              <Typography className="flex flex-row">
                                Product Status:{" "}
                                <Chip
                                  size="sm"
                                  variant="ghost"
                                  className="text-center ml-2 w-24"
                                  value={productStatus ? "Active" : "Inactive"}
                                  color={productStatus ? "green" : "red"}
                                />
                              </Typography>
                            }
                            checked={productStatus}
                            onChange={(e) => setProductStatus(e.target.checked)}
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

export default AddProduct;
