const assert = require("node:assert/strict");
const test = require("node:test");
const Applicant = require("../src/models/Applicants");

test("hashes applicant passwords before save and verifies them", async () => {
  const applicant = new Applicant({
    username: "jobseeker",
    email: "jobseeker@example.com",
    password: "secure-pass-123",
  });

  await Applicant.schema.s.hooks.execPre("save", applicant, []);

  assert.notEqual(applicant.password, "secure-pass-123");
  assert.equal(await applicant.comparePassword("secure-pass-123"), true);
  assert.equal(await applicant.comparePassword("incorrect-password"), false);
});

test("requires valid applicant account fields", async () => {
  const applicant = new Applicant({
    username: "ab",
    email: "not-an-email",
    password: "short",
  });

  await assert.rejects(applicant.validate(), (error) => {
    assert.equal(error.name, "ValidationError");
    assert.ok(error.errors.username);
    assert.ok(error.errors.email);
    assert.ok(error.errors.password);
    return true;
  });
});

test("does not select applicant passwords by default", async () => {
  assert.equal(Applicant.schema.path("password").options.select, false);
});
