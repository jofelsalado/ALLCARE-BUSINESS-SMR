import { Avatar, Rating, Typography } from "@material-tailwind/react";
import React from "react";
import { useGetAdvisorUsersQuery } from "../../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { SlMagnifier } from "react-icons/sl";

const AdvisorTable = ({ userId }) => {
  const { user } = useGetAdvisorUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  const navigate = useNavigate();

  const handleSelectAdvisor = (id) => {
    navigate("/leads/advisor-details", {
      state: {
        user,
      },
    });
  };

  return (
    <>
      <tr className="even:bg-blue-gray-50/50">
        <td className="p-4">
          <Avatar
            size="sm"
            alt="avatar"
            src={user.profilePicture}
            className="mb-4 ring-4 ring-blue-500/30 border border-blue-500 shadow-xl shadow-blue-900/20"
          />
        </td>
        <td className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {user.firstName}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {user.education}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {user.expertise}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {user.company}
          </Typography>
        </td>
        <td className="p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            <Rating value={user.rating} readonly />
          </Typography>
        </td>
        <td className="p-4">
          <Typography
            variant="small"
            color="blue"
            className="font-medium cursor-pointer"
            onClick={() => handleSelectAdvisor(user._id)}
          >
            <SlMagnifier className="h-6 w-6" />
          </Typography>
        </td>
      </tr>
    </>
  );
};

export default AdvisorTable;
