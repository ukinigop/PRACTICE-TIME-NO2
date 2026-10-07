require("dotenv").config();

const dns = require("node:dns");
const express = require("express");
const mongoose = require("mongoose");

const dnsServers = (process.env.DNS_SERVERS || "")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (dnsServers.length > 0) {
  dns.setServers(dnsServers);
}

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Application System API is running");
});

app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Request body must be valid JSON" });
  }

  console.error("Request error:", error);
  return res.status(500).json({ message: "Internal server error" });
});

async function start() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing. Set it in backend/.env.");
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const port = Number(process.env.PORT || 5000);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exitCode = 1;
});
