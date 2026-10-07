module.exports = function validateJob(req, res, next) {
  const { title, company, location, description } = req.body;
  if (!title || !title.trim())
    return res.status(400).json({ message: "Title is required" });
  if (!company || !company.trim())
    return res.status(400).json({ message: "Company is required" });
  if (!location || !location.trim())
    return res.status(400).json({ message: "Location is required" });
  if (!description || description.trim().length < 10)
    return res.status(400).json({ message: "Description must be at least 10 characters" });
  if (req.body.salary !== undefined && (isNaN(req.body.salary) || req.body.salary < 0))
    return res.status(400).json({ message: "Salary must be a positive number" });
  next();
};