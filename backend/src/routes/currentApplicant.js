const express = require("express");
const requireApplicantAuth = require("../middleware/requireApplicantAuth");

const router = express.Router();

router.get("/", requireApplicantAuth, (req, res) => {
  return res.json({
    applicant: {
      id: req.applicant.id,
      username: req.applicant.username,
      email: req.applicant.email,
      firstName: req.applicant.firstName,
      lastName: req.applicant.lastName,
      phone: req.applicant.phone,
      resumeUrl: req.applicant.resumeUrl,
    },
  });
});

module.exports = router;
