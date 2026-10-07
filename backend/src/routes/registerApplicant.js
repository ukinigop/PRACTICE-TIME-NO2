const express = require("express");
const Applicant = require("../models/Applicants");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName, phone } = req.body || {};

    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password is required" });
    }

    const applicant = await Applicant.create({
      username,
      email,
      password,
      firstName,
      lastName,
      phone,
    });

    return res.status(201).json({
      message: "Applicant registered",
      applicant: {
        id: applicant.id,
        username: applicant.username,
        email: applicant.email,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        phone: applicant.phone,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0];
      return res.status(409).json({
        message: field === "email" ? "Email is already registered" : "Username is already taken",
      });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return next(error);
  }
});

module.exports = router;
