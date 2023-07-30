import asyncHandler from "express-async-handler";
import Notification from "../model/notificationModel.js";
import Complaint from "../model/complaintModel.js";

// @desc get product by advisor
// @route POST /api/product
const getAllComplaint = asyncHandler(async (req, res) => {
  const allComplaint = await Complaint.find();

  res.send(allComplaint);
});

const getComplaintDetails = asyncHandler(async (req, res) => {
  const { complaintId } = req.body;

  const complaintDetails = await Complaint.findOne({ _id: complaintId });

  res.status(200).send(complaintDetails);
});

const addComplaint = asyncHandler(async (req, res) => {
  const {
    userId,
    complainantName,
    subject,
    type,
    complaintId,
    complaintName,
    description,
  } = req.body;

  const checkComplaint = await Complaint.findOne({
    userId: userId,
    complainantName: complainantName,
    subject: subject,
    type: type,
    complaintId: complaintId,
    complaintName: complaintName,
    description: description,
  });

  if (checkComplaint) {
    res
      .status(401)
      .send({ message: "You already submitted a complaint with same details" });
  } else {
    const complaint = await Complaint.create({
      userId,
      complainantName,
      subject,
      type,
      complaintId,
      complaintName,
      description,
    });

    if (type === "User") {
      await Notification.create({
        userId: complaintId,
        appointmentId: complaint._id,
        notificationMessage: `You received a complaint.`,
      });

      await Notification.create({
        userId: "Admin",
        appointmentId: complaint._id,
        notificationMessage: `New complaint has been submitted.`,
      });
    } else {
      await Notification.create({
        userId: "Admin",
        appointmentId: complaint._id,
        notificationMessage: `New complaint has been submitted.`,
      });
    }

    if (complaint) {
      res.status(200).send({ message: "Complaint submitted successfully" });
    }
  }
});

const deleteComplaint = asyncHandler(async (req, res) => {
  const { complaintId } = req.body;

  const complaint = await Complaint.findById({ _id: complaintId });

  const confirmDelete = await complaint.deleteOne();

  if (confirmDelete) {
    res
      .status(200)
      .send({ message: "Complaint has been deleted successfully" });
  }
});

export { getAllComplaint, addComplaint, getComplaintDetails, deleteComplaint };
