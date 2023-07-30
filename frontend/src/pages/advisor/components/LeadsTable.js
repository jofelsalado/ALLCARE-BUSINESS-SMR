import { Button, Chip, Typography } from "@material-tailwind/react";
import React from "react";
import { useGetLeadsQuery } from "../../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";

const AdvisorTable = ({ userId }) => {
  const { user } = useGetLeadsQuery("leadsList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  const navigate = useNavigate();

  const handleSelectLeads = (id) => {
    navigate("/advisor/leads-details", {
      state: {
        user,
      },
    });
  };

  return (
    <>
      <tr className="even:bg-blue-gray-50/50">
        <td className="p-4">
          <img
            src={user.profilePicture}
            alt="profile"
            className="h-10 w-10 rounded-full"
          />
        </td>
        <td className="p-4">
          <Typography color="blue-gray" className="font-normal text-[.80rem]">
            {user.firstName} {user.lastName}
          </Typography>
        </td>
        <td className="p-4">
          <Typography color="blue-gray" className="font-normal text-[.80rem]">
            {user.contactNumber}
          </Typography>
        </td>
        <td className="p-4">
          <Typography color="blue-gray" className="font-normal text-[.80rem]">
            {user.email}
          </Typography>
        </td>

        <td className="p-4 flex flex-row gap-2">
          <Button
            disabled={user.facebook ? false : true}
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
            onClick={(e) => {
              window.open(`${user.facebook}`, "_blank");
            }}
          >
            <AiFillFacebook className="h-5 w-5 text-[#3b5998]" />
          </Button>

          <Button
            disabled={user.instagram ? false : true}
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
            onClick={(e) => {
              window.open(`${user.instagram}`, "_blank");
            }}
          >
            <AiFillInstagram className="h-5 w-5 text-[#E4405F]" />
          </Button>

          <Button
            disabled={user.linkedIn ? false : true}
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="flex items-center gap-3"
            onClick={(e) => {
              window.open(`${user.linkedIn}`, "_blank");
            }}
          >
            <AiFillLinkedin className="h-5 w-5 text-[#0072b1]" />
          </Button>
        </td>
        <td className="p-4">
          <Typography color="blue-gray" className="font-normal text-[.80rem]">
            <Chip
              size="sm"
              variant="ghost"
              className="text-center ml-2 w-24"
              value={user.isOnline === true ? "Online" : "Offline"}
              color={user.isOnline === true ? "green" : "red"}
            />
          </Typography>
        </td>
        <td className="p-4">
          <Typography
            color="blue"
            className="font-medium cursor-pointer"
            onClick={() => handleSelectLeads(user._id)}
          >
            <SlMagnifier className="h-6 w-6" />
          </Typography>
        </td>
      </tr>
    </>
  );
};

export default AdvisorTable;
