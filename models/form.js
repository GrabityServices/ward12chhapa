const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      match: [/^[A-Za-zअ-ह\s]+$/, "Invalid name"]
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
      match: [/^[A-Za-zअ-ह\s]+$/, "Invalid father name"]
    },
    adharNumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{12}$/, "Invalid Aadhar number"]
    },
    phone: {
      type: String,
      required: true,
      match: [/^[6-9][0-9]{9}$/, "Invalid phone number"]
    },

    age: {
      type: Number,
      required: true,
      min: 3,
      max: 18
    },

    class: {
      type: String,
      required: true,
      enum: ["1-2", "3-4", "5-6", "7-8"]
    },

    competition: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
