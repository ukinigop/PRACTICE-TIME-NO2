const assert = require("node:assert/strict");
const test = require("node:test");
const express = require("express");
const jwt = require("jsonwebtoken");
const Applicant = require("../src/models/Applicants");
const currentApplicantRouter = require("../src/routes/currentApplicant");

const secret = "applicant-auth-test-secret-with-more-than-32-characters";
const applicant = {
  id: "507f1f77bcf86cd799439011",
  username: "jobseeker",
  email: "jobseeker@example.com",
  firstName: "Job",
  lastName: "Seeker",
  phone: "",
  resumeUrl: "",
};

test("protects current applicant endpoint with a valid bearer token", async (context) => {
  process.env.JWT_SECRET = secret;
  const originalFindById = Applicant.findById;
  Applicant.findById = async (id) => (id === applicant.id ? applicant : null);

  const app = express();
  app.use("/api/applicants/me", currentApplicantRouter);
  const server = app.listen(0);
  context.after(async () => {
    Applicant.findById = originalFindById;
    await new Promise((resolve) => server.close(resolve));
  });

  await new Promise((resolve) => server.once("listening", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}/api/applicants/me`;

  const missingTokenResponse = await fetch(baseUrl);
  assert.equal(missingTokenResponse.status, 401);

  const token = jwt.sign({ sub: applicant.id }, secret);
  const response = await fetch(baseUrl, {
    headers: { authorization: `Bearer ${token}` },
  });
  assert.equal(response.status, 200);
  assert.deepEqual((await response.json()).applicant, applicant);
});
