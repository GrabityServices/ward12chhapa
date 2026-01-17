const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid phone number"]
  },
  password: {
    type: String,
    required: true
  }
});

// hash password before saver
Admin=mongoose.model("Admin", adminSchema);
// async function ccc (params)  {
//   password=await bcrypt.hash("ward12@1234S", 10);
// const add1= await Admin.create({
//     username:"subhashhjh",
//     phone:"8340577606",
//     password:password
// });
// const add2= await Admin.create({
//     username:"rajeevhjh",
//     phone:"8603130434",
//     password:password
// });
// }
// ccc()
module.exports = Admin

