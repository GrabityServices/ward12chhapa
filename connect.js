const mongoose = require("mongoose");
console.log (process.env.MONGODB); 
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error", err));
