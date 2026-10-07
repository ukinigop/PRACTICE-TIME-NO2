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

// JOB-BE-03: GET /api/jobs/search?q=...&location=...
router.get("/search", async (req, res) => {
  try {
    const { q, location } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { title:   { $regex: q, $options: "i" } },
        { company: { $regex: q, $options: "i" } }
      ];
    }
    if (location) filter.location = { $regex: location, $options: "i" };
    const jobs = await Job.find(filter);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

