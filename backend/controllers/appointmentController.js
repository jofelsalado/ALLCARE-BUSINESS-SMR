import asyncHandler from "express-async-handler";
import Availability from "../model/availabilityModel.js";
import Product from "../model/productModel.js";
import Appointment from "../model/appointmentModel.js";
import Notification from "../model/notificationModel.js";
import User from "../model/userModel.js";
import Notes from "../model/notesModel.js";

// @desc Add product
// @route POST /api/product
// @access Public

const getAllDetails = asyncHandler(async (req, res) => {
  const { productId, advisorId, leadsId } = req.body;

  const productDetails = await Product.find({ _id: productId });
  const availabilityDetails = await Availability.find({ userId: advisorId });
  const leadsDetails = await User.find({ _id: leadsId });
  const advisorDetails = await User.find({ _id: advisorId });

  res.send({
    productDetails: productDetails,
    availabilityDetails: availabilityDetails,
    leadsDetails: leadsDetails,
    advisorDetails: advisorDetails,
  });
});

const addAvailability = asyncHandler(async (req, res) => {
  const { userId, availabilityDate, availabilityTime, availabilityType } =
    req.body;

  const checkAvailability = await Availability.findOne({
    userId: userId,
    availabilityDate: availabilityDate,
    availabilityTime: availabilityTime,
    availabilityType: availabilityType,
  }); // e check niya if ang company is na exist or wala

  if (checkAvailability) {
    res.status(400);
    throw new Error("Availability data and time is already exist");

  } else {
    const availability = await Availability.create({
      userId,
      availabilityDate,
      availabilityTime,
      availabilityType,
    });

    if (availability) {
      res
        .status(200)
        .send({ message: "Availability has been added successfully!" });
    } else {
      res.status(401).send({ message: "Something went wrong!" });
    }
  }
  // if (checkAvailability)
  // {
  //   const availability = await Availability.remove({
  //     userId,
  //     availabilityDate,
  //     availabilityTime,
  //     availabilityType,
  //   });
  // }
});

const getAvailabilityByAdvisor = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const availabilityDetails = await Availability.find({ userId: userId });

  res.send(availabilityDetails);
});

const setAppointment = asyncHandler(async (req, res) => {
  const { productId, advisorId, leadsId, availabilityId,  } = req.body;

  const checkAppointment = await Appointment.findOne({
    advisorId: advisorId,
    leadsId: leadsId,
    productId: productId,
    availabilityId: availabilityId,
  }); // e check niya if ang company is na exist or wala

  const checkAvailability = await  Availability.findOne({
    
  })

  if (checkAppointment) {
    res.status(400);
    throw new Error("Availabilitasdy is not available or already taken");
  } else {
    const appointment = await Appointment.create({
      advisorId,
      leadsId,
      productId,
      availabilityId,
    });

    if (appointment) {
      console.log(availabilityId);
      res
        .status(200)
        .send({ message: "Appointment has been successfully booked!" });

      await Notification.create({
        userId: advisorId,
        appointmentId: appointment._id,
        notificationMessage: `You have new appointment request.`,
      });
      const availabilityDetails = await Availability.findById({
        _id: availabilityId,
      });
      availabilityDetails.isAvailable = false;
      await availabilityDetails.save();
      console.log(availabilityDetails.isAvailable);
      // if(availabilityDetails == true) {
      //   availabilityDetails.isAvailable = false;
      // }


      // const checkifAvailable = await Availability.findById({ userId: availabilityId });
      // await Availability.create({
      //   userId: availabilityId,
      //   isAvailable: false,
      // })

    } else {
      res.status(401).send({ message: "Something went wrong!" });
    }
  }
});

const leadsAppointmentDetails = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const checkAppointmentDetails = await Appointment.find({ leadsId: userId });

  res.send(checkAppointmentDetails);
});

const advisorAppointment = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const checkAppointment = await Appointment.find({ advisorId: userId });

  
  res.send(checkAppointment);
});

const getNotification = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const notification = await Notification.find({ userId: userId });

  res.send(notification);
});

const deleteNotification = asyncHandler(async (req, res) => {
  const { notificationId } = req.body;

  const notification = await Notification.findById({ _id: notificationId });

  const confirmDelete = await notification.deleteOne();

  if (confirmDelete) {
    res
      .status(200)
      .send({ message: "Notification has been deleted successfully" });
  }
});

const readNotification = asyncHandler(async (req, res) => {
  const { appointmentId, userId } = req.body;

  const notification = await Notification.findOne({
    appointmentId: appointmentId,
    userId: userId,
  });

  if (notification) {
    notification.isOpened = true;

    const updatedNotification = await notification.save();

    if (updatedNotification) {
      res.status(200).send();
    }
  }
});

const appointmentDetails = asyncHandler(async (req, res) => {
  const { appointmentId } = req.body;

  const checkAppointmentDetails = await Appointment.find({
    _id: appointmentId,
  });

  res.send(checkAppointmentDetails);
});

const changeAppointmentStatus = asyncHandler(async (req, res) => {
  const { appointmentId, appointmentStatus, reason } = req.body;

  const appointmentDetails = await Appointment.findById({ _id: appointmentId });

  if (appointmentStatus === "Complete") {
    appointmentDetails.appointmentStatus = appointmentStatus;
    appointmentDetails.reason =
      "I would love to hear your feedback on my service.";
  } else {
    appointmentDetails.appointmentStatus = appointmentStatus;
    appointmentDetails.reason = reason;
  }

  const availabilityDetails = await Availability.findById({
    _id: appointmentDetails.availabilityId,
  });

  availabilityDetails.isAvailable = false;

  const updatedDetails = await appointmentDetails.save();
  await availabilityDetails.save();

  switch (appointmentStatus) {
    case "Approve":
      await Notification.create({
        userId: appointmentDetails.leadsId,
        appointmentId: appointmentId,
        notificationMessage: `Your appointment is approved.`,
      });
      break;
    case "Reject":
      await Notification.create({
        userId: appointmentDetails.leadsId,
        appointmentId: appointmentId,
        notificationMessage: `Your appointment is rejected.`,
      });
      break;
    case "Resched":
      await Notification.create({
        userId: appointmentDetails.leadsId,
        appointmentId: appointmentId,
        notificationMessage: `Your appointment is rescheduled.`,
      });
      break;
    case "Complete":
      await Notification.create({
        userId: appointmentDetails.leadsId,
        appointmentId: appointmentId,
        notificationMessage: `Your appointment is completed.`,
      });
      break;
  }

  res.send(updatedDetails);
});

const getAllAppointmentDetails = asyncHandler(async (req, res) => {
  const { productId, advisorId, leadsId, availabilityId } = req.body;

  const productDetails = await Product.find({ _id: productId });
  const availabilityDetails = await Availability.find({ _id: availabilityId });
  const leadsDetails = await User.find({ _id: leadsId });
  const advisorDetails = await User.find({ _id: advisorId });

  res.send({
    productDetails: productDetails,
    availabilityDetails: availabilityDetails,
    leadsDetails: leadsDetails,
    advisorDetails: advisorDetails,
  });
});

const deleteAvailability = asyncHandler(async (req, res) => {
  const { availId } = req.body;

  const availability = await Availability.findById({ _id: availId });

  const confirmDelete = await availability.deleteOne();

  if (confirmDelete) {
    res
      .status(200)
      .send({ message: "Availability has been deleted successfully" });
  }
});

const addNotes = asyncHandler(async (req, res) => {
  const { appointId, notes } = req.body;

  const newNotes = await Notes.create({
    appointmentId: appointId,
    notes: notes,
  });

  if (newNotes) {
    res.status(200).send({ message: "New notes has been added" });
  }
});

const getNotes = asyncHandler(async (req, res) => {
  const { appointId } = req.body;

  const notesDetails = await Notes.find({
    appointmentId: appointId,
  });

  console.log("====================================");
  console.log(notesDetails);
  console.log("====================================");

  if (notesDetails) {
    res.status(200).send(notesDetails);
  }
});

const deleteNotes = asyncHandler(async (req, res) => {
  const { notesId } = req.body;

  const notesDetails = await Notes.findById({
    _id: notesId,
  });

  const confirmDelete = await notesDetails.deleteOne();

  if (confirmDelete) {
    res.status(200).send({ message: "Notes has been deleted successfully" });
  }
});

const adminAppointmentDetails = asyncHandler(async (req, res) => {
  const data = await Appointment.find();

  res.status(200).send(data);
});

export {
  addAvailability,
  getAvailabilityByAdvisor,
  getAllDetails,
  setAppointment,
  leadsAppointmentDetails,
  getNotification,
  appointmentDetails,
  getAllAppointmentDetails,
  readNotification,
  advisorAppointment,
  changeAppointmentStatus,
  deleteNotification,
  deleteAvailability,
  addNotes,
  getNotes,
  deleteNotes,
  adminAppointmentDetails,
};
