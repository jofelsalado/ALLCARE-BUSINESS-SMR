import asyncHandler from "express-async-handler";
import Credentials from "../model/credentialModel.js";

// @desc get product by advisor
// @route POST /api/product
const addCredentials = asyncHandler(async (req, res) => {
  const { userId, credentials } = req.body;

  const checkCredentials = await Credentials.findOne({
    userId: userId,
    credentials: credentials,
  });

  if (checkCredentials) {
    res.status(401).send({ message: "This credential is already exist" });
  } else {
    const credentialsSave = await Credentials.create({
      userId,
      credentials,
    });

    if (credentialsSave) {
      res
        .status(200)
        .send({ message: "Credential has been successfully added!" });
    }
  }
});

const getUserCredentials = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const userCredentials = await Credentials.find({ userId: userId });

  res.send(userCredentials);
});

const deleteCredentials = asyncHandler(async (req, res) => {
  const { credentialId } = req.body;

  const credential = await Credentials.findById({ _id: credentialId });

  const confirmDelete = await credential.deleteOne();

  if (confirmDelete) {
    res
      .status(200)
      .send({ message: "Credential has been deleted successfully" });
  }
});

export { addCredentials, getUserCredentials, deleteCredentials };
