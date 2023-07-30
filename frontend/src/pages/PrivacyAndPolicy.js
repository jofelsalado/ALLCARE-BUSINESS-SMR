import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Picture3 from "../assets/images/Picture3.png";

const PrivacyAndPolicy = () => {
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
      <img src={Picture3} alt="picture" width={"100%"} />
    </>
  );
};

export default PrivacyAndPolicy;
