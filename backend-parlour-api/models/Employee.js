const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  position: {
    type: String,
    required: true,
  },
    status: {
    type: String,
    enum: ["PUNCHED_IN", "PUNCHED_OUT", "NONE"],
    default: "NONE"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming User model exists
  },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
