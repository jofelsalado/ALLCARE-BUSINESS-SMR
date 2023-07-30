import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../util/generateToken.js";

// @desc Auth User or Set Token
// @route POST /api/users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users) {
    res.status(200).send(users);
  } else {
    res.status(401).send({ errorMessage: "Something went wrong!" });
  }
});

// @desc Auth User or Set Token
// @route POST /api/users
const getAdvisorUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ userType: "Advisor" })
    .select("-password")
    .lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

const getLeads = asyncHandler(async (req, res) => {
  const users = await User.find({ userType: "Leads" })
    .select("-password")
    .lean();
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

// @desc Auth User or Set Token
// @route POST /api/users/auth
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user.isActive === false) {
    res
      .status(401)
      .send({ message: "Your account has been deactivated by Admin." });
  } else {
    if (user.userType === "Leads" || user.userType === "Admin") {
      if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
          _id: user._id,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          age: user.age,
          contactNumber: user.contactNumber,
          gender: user.gender,
          birthDate: user.birthDate,
          email: user.email,
          address: user.address,
          facebook: user.facebook,
          instagram: user.instagram,
          linkedIn: user.linkedIn,
          password: user.password,
          profilePicture: user.profilePicture,
          userType: user.userType,
          isOnline: user.isOnline,
          education: user.education,
          educationalLevel: user.educationalLevel,
          workAddress: user.workAddress,
          occupation: user.occupation,
          civilStatus: user.civilStatus,
          isActive: user.isActive,
          salaryRange: user.salaryRange,
          smokingStatus: user.smokingStatus,
          religion: user.religion,
          dependent1: user.dependent1,
          dependent2: user.dependent2,
          dependent3: user.dependent3,
        });

        user.isOnline = true;

        await user.save();
      } else {
        res.status(400);
        throw new Error("Invalid email or password");
      }
    } else {
      if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
          _id: user._id,
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          age: user.age,
          contactNumber: user.contactNumber,
          gender: user.gender,
          birthDate: user.birthDate,
          email: user.email,
          address: user.address,
          facebook: user.facebook,
          instagram: user.instagram,
          linkedIn: user.linkedIn,
          password: user.password,
          profilePicture: user.profilePicture,
          userType: user.userType,
          expertise: user.expertise,
          education: user.education,
          company: user.company,
          isOnline: user.isOnline,
          educationalLevel: user.educationalLevel,
          workAddress: user.workAddress,
          occupation: user.occupation,
          civilStatus: user.civilStatus,
          salaryRange: user.salaryRange,
          smokingStatus: user.smokingStatus,
          religion: user.religion,
          dependent1: user.dependent1,
          dependent2: user.dependent2,
          dependent3: user.dependent3,
        });

        user.isOnline = true;

        await user.save();
      } else {
        res.status(400);
        throw new Error("Invalid email or password");
      }
    }
  }
});

// @desc Add user
// @route POST /api/users
const addUser = asyncHandler(async (req, res) => {
  if (req.body.userType === "Leads") {
    const {
      firstName,
      middleName,
      lastName,
      age,
      contactNumber,
      gender,
      birthDate,
      email,
      education,
      address,
      educationalLevel,
      civilStatus,
      workAddress,
      occupation,
      password,
      profilePicture,
      userType,
      salaryRange,
      smokingStatus,
      religion,
      dependent1,
      dependent2,
      dependent3,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exist");
    }

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      age,
      contactNumber,
      gender,
      birthDate,
      email,
      education,
      address,
      educationalLevel,
      civilStatus,
      workAddress,
      occupation,
      password,
      profilePicture,
      userType,
      salaryRange,
      smokingStatus,
      religion,
      dependent1,
      dependent2,
      dependent3,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        age: user.age,
        contactNumber: user.contactNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        email: user.email,
        address: user.address,
        facebook: user.facebook,
        instagram: user.instagram,
        linkedIn: user.linkedIn,
        password: user.password,
        profilePicture: user.profilePicture,
        userType: user.userType,
        salaryRange: user.salaryRange,
        smokingStatus: user.smokingStatus,
        religion: user.religion,
        dependent1: user.dependent1,
        dependent2: user.dependent2,
        dependent3: user.dependent3,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }

  if (req.body.userType === "Advisor") {
    const {
      firstName,
      middleName,
      lastName,
      age,
      contactNumber,
      gender,
      birthDate,
      email,
      address,
      facebook,
      instagram,
      linkedIn,
      password,
      profilePicture,
      userType,
      expertise,
      education,
      company,
      educationalLevel,
      workAddress,
      occupation,
      civilStatus,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exist");
    }

    const user = await User.create({
      firstName,
      middleName,
      lastName,
      age,
      contactNumber,
      gender,
      birthDate,
      email,
      address,
      facebook,
      instagram,
      linkedIn,
      password,
      profilePicture,
      userType,
      expertise,
      education,
      company,
      educationalLevel,
      workAddress,
      occupation,
      civilStatus,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        age: user.age,
        contactNumber: user.contactNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        email: user.email,
        address: user.address,
        facebook: user.facebook,
        instagram: user.instagram,
        linkedIn: user.linkedIn,
        password: user.password,
        profilePicture: user.profilePicture,
        userType: user.userType,
        expertise: user.expertise,
        education: user.education,
        company: user.company,
        educationalLevel: user.educationalLevel,
        workAddress: user.workAddress,
        occupation: user.occupation,
        civilStatus: user.civilStatus,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

const changeToOffline = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById({ _id: userId });

  user.isOnline = false;

  await user.save();
});

// @desc Logout user
// @route POST /api/users
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

// @desc Get current user
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user.userType === "Advisor") {
    const user = {
      _id: req.user._id,
      firstName: req.user.firstName,
      middleName: req.user.middleName,
      lastName: req.user.lastName,
      age: req.user.age,
      contactNumber: req.user.contactNumber,
      gender: req.user.gender,
      birthDate: req.user.birthDate,
      email: req.user.email,
      address: req.user.address,
      facebook: req.user.facebook,
      instagram: req.user.instagram,
      linkedIn: req.user.linkedIn,
      password: req.user.password,
      profilePicture: req.user.profilePicture,
      userType: req.user.userType,
      expertise: req.user.expertise,
      education: req.user.education,
      company: req.user.company,
    };
    res.status(200).json(user);
  } else {
    const user = {
      _id: req.user._id,
      firstName: req.user.firstName,
      middleName: req.user.middleName,
      lastName: req.user.lastName,
      age: req.user.age,
      contactNumber: req.user.contactNumber,
      gender: req.user.gender,
      birthDate: req.user.birthDate,
      email: req.user.email,
      address: req.user.address,
      facebook: req.user.facebook,
      instagram: req.user.instagram,
      linkedIn: req.user.linkedIn,
      password: req.user.password,
      profilePicture: req.user.profilePicture,
      userType: req.user.userType,
    };
    res.status(200).json(user);
  }
});

const getUserDetails = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById({ _id: userId });

  res.status(200).send(user);
});

// @desc Get current user
// @route GET /api/users/profile
// @access Private
const getAdvisorDetails = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const advisor = await User.findById({ userId });

  if (advisor.userType === "Advisor") {
    const user = {
      _id: advisor._id,
      firstName: advisor.firstName,
      middleName: advisor.middleName,
      lastName: advisor.lastName,
      age: advisor.age,
      contactNumber: advisor.contactNumber,
      gender: advisor.gender,
      birthDate: advisor.birthDate,
      email: advisor.email,
      address: advisor.address,
      facebook: advisor.facebook,
      instagram: advisor.instagram,
      linkedIn: advisor.linkedIn,
      password: advisor.password,
      profilePicture: advisor.profilePicture,
      userType: advisor.userType,
      expertise: advisor.expertise,
      education: advisor.education,
      company: advisor.company,
    };
    res.status(200).json(user);
  }
});

const getLeadsDetails = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const advisor = await User.findById({ userId });

  if (advisor.userType === "Advisor") {
    const user = {
      _id: advisor._id,
      firstName: advisor.firstName,
      middleName: advisor.middleName,
      lastName: advisor.lastName,
      age: advisor.age,
      contactNumber: advisor.contactNumber,
      gender: advisor.gender,
      birthDate: advisor.birthDate,
      email: advisor.email,
      address: advisor.address,
      facebook: advisor.facebook,
      instagram: advisor.instagram,
      linkedIn: advisor.linkedIn,
      password: advisor.password,
      profilePicture: advisor.profilePicture,
      userType: advisor.userType,
    };
    res.status(200).json(user);
  }
});

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

// @desc Update current user
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.userId);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.middleName = req.body.middleName || user.middleName;
    user.lastName = req.body.lastName || user.lastName;
    user.age = req.body.age || user.age;
    user.contactNumber = req.body.contactNumber || user.contactNumber;
    user.gender = req.body.gender || user.gender;
    user.birthDate = req.body.birthDate || user.birthDate;
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.facebook = req.body.facebook || user.facebook;
    user.instagram = req.body.instagram || user.instagram;
    user.linkedIn = req.body.linkedIn || user.linkedIn;
    user.password = req.body.password || user.password;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
    user.userType = req.body.userType || user.userType;
    user.expertise = req.body.expertise || user.expertise;
    user.education = req.body.education || user.education;
    user.company = req.body.company || user.company;
    user.credentials = req.body.credentials || user.credentials;
    user.civilStatus = req.body.civilStatus || user.civilStatus;
    user.educationalLevel = req.body.educationalLevel || user.educationalLevel;
    user.occupation = req.body.occupation || user.occupation;
    user.workAddress = req.body.workAddress || user.workAddress;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      middleName: updatedUser.middleName,
      lastName: updatedUser.lastName,
      age: updatedUser.age,
      contactNumber: updatedUser.contactNumber,
      gender: updatedUser.gender,
      birthDate: updatedUser.birthDate,
      email: updatedUser.email,
      address: updatedUser.address,
      facebook: updatedUser.facebook,
      instagram: updatedUser.instagram,
      linkedIn: updatedUser.linkedIn,
      password: updatedUser.password,
      profilePicture: updatedUser.profilePicture,
      userType: updatedUser.userType,
      expertise: updatedUser.expertise,
      education: updatedUser.education,
      company: updatedUser.company,
      credentials: updatedUser.credentials,
      civilStatus: updatedUser.civilStatus,
      educationalLevel: updatedUser.educationalLevel,
      occupation: updatedUser.occupation,
      workAddress: updatedUser.workAddress,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const accountManagement = asyncHandler(async (req, res) => {
  const { userId, accMngt } = req.body;

  const user = await User.findById({ _id: userId });

  if (accMngt === "Deactivate") {
    user.isActive = false;
    await user.save();
    res.status(200).send({ message: "User has been deactivated" });
  } else {
    user.isActive = true;
    await user.save();
    res.status(200).send({ message: "User has been reactivated" });
  }
});

export {
  getAdvisorUsers,
  getLeads,
  getAllUsers,
  authUser,
  addUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  changeToOffline,
  getUserDetails,
  accountManagement,
};
