const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const validateJob = require("../middleware/validateJob");

// JOB-BE-02: GET /api/jobs — list all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});