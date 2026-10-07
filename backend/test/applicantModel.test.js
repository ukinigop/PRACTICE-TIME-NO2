const assert = require("node:assert/strict");
const test = require("node:test");
const Applicant = require("../src/models/Applicants");

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
