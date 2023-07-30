import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Picture1 from "../assets/images/Picture1.png";
import Picture2 from "../assets/images/Picture2.png";

const Home = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    switch (userInfo?.userType) {
      case "Admin":
        navigate("/admin/dashboard");
        break;
      case "Advisor":
        navigate("/advisor/dashboard");
        break;
      case "Leads":
        navigate("/leads/dashboard");
        break;

      default:
        break;
    }
  }, [userInfo, navigate]);

  return (
    <>
      <Navbar />
      <img src={Picture1} alt="picture" width={"100%"} />
      <img src={Picture2} alt="picture" width={"100%"} />
    </>
  );
};

export default Home;
