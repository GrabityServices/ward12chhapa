const express = require("express");
const path = require("path");
const Registration = require("./models/form.js");
require("./connect.js");

const app = express();
const PORT = 3000;

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home Page
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home | वार्ड-12 राजीव कुमार रंजन",
    description: "Official website for वार्ड-12 राजीव कुमार रंजन. Register now and check game rules.",
    keywords: "वार्ड-12 राजीव कुमार रंजन, game competition, registration",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com",
    image: "https://ward12.com/images/banner.png",
  
  });
});

// About Page
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About | वार्ड-12 राजीव कुमार रंजन",
    description: "Learn more about वार्ड-12 राजीव कुमार रंजन and our mission.",
    keywords: "about ward12, competition, event",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com/about",
    image: "https://ward12.com/images/about.png",
  });
});

// Game Rules Page
app.get("/rules", (req, res) => {
  res.render("rules", {
    title: "Game Rules | वार्ड-12 राजीव कुमार रंजन",
    description: "Read the official rules of वार्ड-12 राजीव कुमार रंजन games.",
    keywords: "game rules, ward12 rules",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com/rules",
    image: "https://ward12.com/images/rules.png",
   
  });
});

// Registration Page
app.get("/register", (req, res) => {
  res.render("form", {
    title: "Register | वार्ड-12 राजीव कुमार रंजन",
    description: "Register now for वार्ड-12 राजीव कुमार रंजन competitions.",
    keywords: "registration, signup, ward12 register",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com/register",
    image: "https://ward12.com/images/register.png",
    
  });
});

app.post("/register", async (req, res) => {
  try {
    const { name, fatherName, phone, age, class: studentClass, competition,adharNumber } =
      req.body;

    // 🔒 Extra server-side regex safety
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      return res.render("form", {
            title: "Register | वार्ड-12 राजीव कुमार रंजन",
    description: "Register now for वार्ड-12 राजीव कुमार रंजन competitions.",
    keywords: "registration, signup, ward12 register",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com/register",
    image: "https://ward12.com/images/register.png",
        error: "Invalid phone number",
      }); 
    }

    if (!/^[A-Za-zअ-ह\s]+$/.test(name)) {
            return res.render("form", {
            title: "Register | वार्ड-12 राजीव कुमार रंजन",
    description: "Register now for वार्ड-12 राजीव कुमार रंजन competitions.",
    keywords: "registration, signup, ward12 register",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com/register",
    image: "https://ward12.com/images/register.png",
        error: "अमान्य फ़ोन नंबर",
      }); 
    }
    if (!/^[A-Za-zअ-ह\s]+$/.test(fatherName)) {
            return res.render("form", {
            title: "Register | वार्ड-12 राजीव कुमार रंजन",
    description: "Register now for वार्ड-12 राजीव कुमार रंजन competitions.",
    keywords: "registration, signup, ward12 register",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com/register",
    image: "https://ward12.com/images/register.png",
        error: "अमान्य पिता का नाम",
      }); 
    }
    if (!(age >= 3 && age <= 15)) {
            return res.render("form", {
            title: "Register | वार्ड-12 राजीव कुमार रंजन",
    description: "Register now for वार्ड-12 राजीव कुमार रंजन competitions.",
    keywords: "registration, signup, ward12 register",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com/register",
    image: "https://ward12.com/images/register.png",
        error: "अमान्य आयु",
      }); 
    }
    if(!/^\d{12}$/.test(adharNumber)) {
           return res.render("form", {
            title: "Register | वार्ड-12 राजीव कुमार रंजन",
    description: "Register now for वार्ड-12 राजीव कुमार रंजन competitions.",
    keywords: "registration, signup, ward12 register",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com/register",
    image: "https://ward12.com/images/register.png",
        error: "अमान्य आधार या पहले से मौजूद है",
        values: req.body
      });
            }
            const existingRegistration = await Registration.findOne({ adharNumber });
    if (existingRegistration) {
      return res.render("form", {
            title: "Register | वार्ड-12 राजीव कुमार रंजन",
    description: "Register now for वार्ड-12 राजीव कुमार रंजन competitions.",
    keywords: "registration, signup, ward12 register",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com/register",
    image: "https://ward12.com/images/register.png",
        error: "अमान्य आधार या पहले से मौजूद है",
        values: req.body
      });
    }
    const compCounts =await Registration.find({ competition })
    if (compCounts.length >= 20) {
      return res.render("form", {
            title: "Register | वार्ड-12 राजीव कुमार रंजन",
    description: "Register now for वार्ड-12 राजीव कुमार रंजन competitions.",
    keywords: "registration, signup, ward12 register",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com/register",
    image: "https://ward12.com/images/register.png",
        error: "इस खेल के लिए पंजीकरण पूर्ण हो चुका है",
        values: req.body
      });
    }
    const newRegistration = new Registration({
      name,
      fatherName,
      phone,
      age,
      adharNumber,
      class: studentClass,
      competition
    });

    await newRegistration.save();


    // ✅ Redirect after success
    res.redirect("/rules");

  } catch (error) {
    console.error(error);

    // Duplicate phone number
    if (error.code === 11000) {
      return res.render("form", {
     title: "Register | वार्ड-12 राजीव कुमार रंजन",
    description: "Register now for वार्ड-12 राजीव कुमार रंजन competitions.",
    keywords: "registration, signup, ward12 register",
    author: "वार्ड-12 राजीव कुमार रंजन Team",
    url: "https://ward12.com/register",
    image: "https://ward12.com/images/register.png",
        error: " कुछ गड़बड़ है। कृपया फिर से प्रयास करें।",
        values: req.body
      });
    }

    res.status(500).send("Registration failed");
  }
});

app.get("/download", (req, res) => {
  res.render("download");
});
// Start Server
app.listen(PORT, () => {
  console.log(`🔥 Server running at http://localhost:${PORT}`);
});
