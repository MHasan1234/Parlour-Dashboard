const express = require("express");
const router = express.Router();
const { punch, getAllLogs } = require("../controllers/attendanceController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/punch", punch); 
router.get("/logs", authMiddleware, getAllLogs); 

module.exports = router;
