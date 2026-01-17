const express = require("express");
const path = require("path");
const Registration = require("./models/form.js");
require("./connect.js");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Home Page
app.get("/", (req, res) => {
  res.render("index", 
  );
});

// About Page
app.get("/about", (req, res) => {
  res.render("about") 
});

// Game Rules Page
app.get("/rules", (req, res) => {
  res.render("rules");
});

// Registration Page
app.get("/register", (req, res) => {
  res.render("form");
});

app.post("/register", async (req, res) => {
  try {
    const { name, fatherName, phone, age, class: studentClass, competition,adharNumber } =
      req.body;

    // 🔒 Extra server-side regex safety
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
      return res.render("form", {
           views: req.body,
        error: "Invalid phone number",
      }); 
    }

    if (!/^[A-Za-zअ-ह\s]+$/.test(name)) {
            return res.render("form", {
        
              views: req.body,
        error: "अमान्य फ़ोन नंबर",
      }); 
    }
    if (!/^[A-Za-zअ-ह\s]+$/.test(fatherName)) {
            return res.render("form", {
      views: req.body,
        error: "अमान्य पिता का नाम",
      }); 
    }
    if (!(age >= 3 && age <= 15)) {
            return res.render("form", {
        error: "अमान्य आयु",
        values: req.body
      }); 
    }
    if(!/^\d{12}$/.test(adharNumber)) {
           return res.render("form", {
            
        error: "अमान्य आधार या पहले से मौजूद है",
        values: req.body
      });
            }
            const existingRegistration = await Registration.findOne({ adharNumber });
    if (existingRegistration) {
      return res.render("form", {
            
        error: "अमान्य आधार या पहले से मौजूद है",
        values: req.body
      });
    }
    const compCounts =await Registration.find({ competition })
    if (compCounts.length >= 20) {
      return res.render("form", {
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
