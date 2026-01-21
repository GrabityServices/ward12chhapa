const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.js");
const Form = require("../models/form.js");
const adminAuth = require("../middleware/adminAuth.js");
const Registration=require("../models/form.js")
const router = express.Router();

/* LOGIN PAGE */
router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

/* LOGIN POST */

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // basic validation
    if (!username || !password) {
      return res.render("login", { error: "All fields are required" });
    }

    // login via username OR phone
    const admin = await Admin.findOne({
      $or: [{ username }, { phone: username }]
    });

    if (!admin) {
      return res.render("login", { error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.render("login", { error: "Invalid credentials" });
    }

    // create JWT
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // store token in cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Server error. Try again." });
  }
});


/* ADMIN DASHBOARD */
router.get("/dashboard", adminAuth, async (req, res) => {
  const forms = await Form.find().sort({ class:1, competition:1 });
  res.render("admin", { forms });
});
router.get("/logout", (req, res) => {
  res.clearCookie("adminToken");
  res.redirect("/admin/login");
});

/**
 * GIVE 1st POSITION
 */
router.get("/position/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Registration.findByIdAndUpdate(
      id,
      { position: "1st" },
      { new: true }
    );

    res.redirect("/admin/dashboard"); // go back to admin page
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

/**
 * REMOVE 1st POSITION
 */
router.get("/position/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Registration.findByIdAndUpdate(
      id,
      { position: "" }, // or null if you changed schema
      { new: true }
    );

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});


module.exports = router;
