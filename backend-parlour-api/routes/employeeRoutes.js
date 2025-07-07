const express = require("express");
const router = express.Router();
const { getEmployees, addEmployee, updateEmployee, deleteEmployee  } = require("../controllers/employeeController");
const { authMiddleware, requireRole } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getEmployees);
router.post("/", authMiddleware, requireRole("super-admin"), addEmployee);
router.put("/:id", authMiddleware, requireRole("super-admin"), updateEmployee);
router.delete('/:id', authMiddleware, requireRole("super-admin"), deleteEmployee);
module.exports = router;
