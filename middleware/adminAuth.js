const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.adminToken;

  if (!token) {
    return res.redirect("/admin/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (err) {
    return res.redirect("/admin/login");
  }
};
