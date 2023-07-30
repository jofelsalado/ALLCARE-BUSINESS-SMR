import asyncHandler from "express-async-handler";
import Company from "../model/companyModel.js";

// @desc Add product
// @route POST /api/product
// @access Public
const addCompany = asyncHandler(async (req, res) => {
  const { userId, companyName } = req.body; //mo hold sa data from frontend to backend

  const checkCompany = await Company.findOne({
    companyName: companyName,
    userId: userId,
  }); // e check niya if ang company is na exist or wala

  if (checkCompany) {
    res.status(400);
    throw new Error("Company already exist");
  } // kung

  if (!companyName) {
    res.status(401).send({ message: "Company name is required!" });
  }

  const company = await Company.create({
    userId,
    companyName,
  });

  if (company) {
    res
      .status(200)
      .send({ message: "New company has been added successfully!" });
  } else {
    res.status(401).send({ message: "Something went wrong!" });
  }
});

const getCompany = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  const companyInfo = await Company.find({ userId: userId });

  if (companyInfo) {
    res.status(200).send(companyInfo);
  } else {
    res.status(401).send({ errorMessage: "Something went wrong!" });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { userId, companyId, companyStatus } = req.body;

  const company = await Company.findById(companyId).exec();

  if (company.companyStatus === companyStatus) {
    res.status(400).send({
      message: `Status is already ${
        companyStatus === true ? "Active." : "Inactive."
      } `,
    });
  }
  company.companyStatus = companyStatus;

  const updateCompany = await company.save();

  if (updateCompany) {
    const companyInfo = await Company.find({ userId: userId });

    if (companyInfo) {
      res.status(200).send(companyInfo);
    } else {
      res.status(401).send({ errorMessage: "Something went wrong!" });
    }
  }
});

const deleteCompany = asyncHandler(async (req, res) => {
  const { compId } = req.body;

  const company = await Company.findById({ _id: compId });

  const confirmDelete = await company.deleteOne();

  if (confirmDelete) {
    res.status(200).send({ message: "Company has been deleted successfully" });
  }
});

export { addCompany, getCompany, updateUser, deleteCompany };
