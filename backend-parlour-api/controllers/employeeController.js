const Employee = require("../models/Employee");

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      message: "Fetched all employees",
      employees,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.addEmployee = async (req, res) => {
  const { name, email, position } = req.body;

  try {
    const employee = new Employee({
      name,
      email,
      position,
      createdBy: req.user.id, 
    });

    await employee.save();

    res.status(201).json({
      message: "Employee added successfully",
      employee,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, position } = req.body;

  try {
    const updated = await Employee.findByIdAndUpdate(
      id,
      { name, email, position },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee updated", employee: updated });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    console.log(" User info:", req.user);
    if (req.user.role !== "super-admin") {
      return res.status(403).json({ message: "Only Super Admin can delete employees" });
    }

    const { id } = req.params;
    console.log("Attempting to delete employee with ID:", id); 

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted", employee });
  } catch (err) {
    console.error(" Delete error:", err);  
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
