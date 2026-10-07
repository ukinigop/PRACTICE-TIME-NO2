const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  company:     { type: String, required: true, trim: true },
  location:    { type: String, required: true },
  description: { type: String, required: true },
  salary:      { type: Number },
  requirements:{ type: String },
  postedBy:    { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);