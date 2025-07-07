const express = require("express");
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const { authMiddleware, requireRole } = require("../middlewares/authMiddleware");


router.get("/", authMiddleware, getTasks);


router.post("/", authMiddleware, requireRole("super-admin"), createTask);
router.put("/:id", authMiddleware, requireRole("super-admin"), updateTask);
router.delete("/:id", authMiddleware, requireRole("super-admin"), deleteTask);
module.exports = router;
