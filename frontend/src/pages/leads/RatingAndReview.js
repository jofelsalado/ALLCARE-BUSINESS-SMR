import { useGetAdvisorUsersQuery } from "../../slices/usersApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardFooter from "./DashboardFooter";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SideMenu from "./SideMenu";
import DashboardNavbar from "./DashboardNavbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Rating, Textarea, Typography } from "@material-tailwind/react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";

const RatingAndReview = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const [userId] = useState(location?.state?.id);
  const navigate = useNavigate();

  const { user } = useGetAdvisorUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating && !review) {
      toast.error("Rating and review are required!", {
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
      await axios.post("http://localhost:8080/api/rating", {
        advisorId: user._id,
        advisorName: user.firstName + " " + user.lastName,
        rating: rating,
        review: review,
        leadsId: userInfo._id,
        leadsName: userInfo.firstName + " " + userInfo.lastName,
        appointmentId: location?.state?.appointmentId,
      });
      navigate("/leads/my-appointment");
    }
  };

  return (
    <>
      <div class="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <SideMenu />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <DashboardNavbar />
          <div class="main-content flex flex-col flex-grow p-4 ">
            <h1 class="font-bold text-2xl text-gray-700">RATINGS & REVIEW</h1>
            <section className="pt-2 overflow-auto max-h-[74vh]">
              <div className="px-6 h-full text-gray-800">
                <form className="bg-white shadow-2xl" onSubmit={handleSubmit}>
                  <h1 class="text-2xl text-gray-700 text-center px-10 py-5">
                    Your Opinion matters to us!
                  </h1>
                  <div className=" bg-gray-50 flex flex-col items-center justify-center gap-5 p-10">
                    {/* 1st Column */}
                    <div className="flex flex-col">
                      <div className="mb-4">
                        <div className="w-80 flex flex-col items-center justify-center">
                          <Typography>How do you rate our Service?</Typography>
                          <Rating
                            onChange={(value) => setRating(value)}
                            className="mt-4"
                            ratedIcon={
                              <AiFillStar
                                style={{ width: "54px", height: "54px" }}
                              ></AiFillStar>
                            }
                            unratedIcon={
                              <AiFillStar
                                style={{
                                  width: "54px",
                                  height: "54px",
                                  color: "#80808085",
                                }}
                              ></AiFillStar>
                            }
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="w-80">
                          <Textarea
                            label="Leave a Feedback!"
                            value={review}
                            required
                            onChange={(e) => setReview(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="w-80 flex flex-row justify-center items-center">
                          <button
                            type="submit"
                            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Rate Now
                          </button>
                        </div>
                      </div>
                    </div>
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

export default RatingAndReview;
