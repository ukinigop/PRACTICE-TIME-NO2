const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const Applicant = require("../models/Applicants");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const body = req.body || {};
    const identifier = String(body.identifier || body.email || "").trim();
    const password = body.password;

    if (!identifier || typeof password !== "string" || !password) {
      return res.status(400).json({ message: "Identifier and password are required" });
    }

    const applicant = await Applicant.findOne({
      $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
    }).select("+password");

    if (!applicant || !(await bcrypt.compare(password, applicant.password))) {
      return res.status(401).json({ message: "Invalid username/email or password" });
    }

    const token = jwt.sign(
      { sub: applicant.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
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
    return next(error);
  }
});

module.exports = router;
