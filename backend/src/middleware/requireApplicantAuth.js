const jwt = require("jsonwebtoken");
const Applicant = require("../models/Applicants");

module.exports = async function requireApplicantAuth(req, res, next) {
  const authorization = req.get("authorization") || "";
  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload || typeof payload !== "object" || typeof payload.sub !== "string") {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const applicant = await Applicant.findById(payload.sub);
    if (!applicant) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.applicant = applicant;
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    return next(error);
  }
};
