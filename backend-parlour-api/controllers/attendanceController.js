const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee"); 

exports.punch = async (req, res) => {
  const { employeeId, status } = req.body;

  

  if (!["PUNCHED_IN", "PUNCHED_OUT"].includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }

  try {
    
    const employee = await Employee.findByIdAndUpdate(
      employeeId,
      { status },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    
    const record = await Attendance.create({ employee: employeeId, status });

    req.io.emit("attendance-update", record);

    res.status(201).json({ message: "Attendance recorded", data: record });
  } catch (err) {
    console.error("Punch error:", err);
    res.status(500).json({ message: "Error recording attendance" });
  }
};

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Attendance.find().populate("employee", "name email").sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching attendance logs" });
  }
};
