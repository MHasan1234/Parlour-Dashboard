const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token Received:", token);
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded; 
    next();
  } catch (err) {
       console.log(" JWT Error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Optional: Role check
const requireRole = (role) => {
  return (req, res, next) => {
      console.log(" User info in requireRole:", req.user);
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user info" });
    }

    if (req.user.role !== role) {
       console.log(" Forbidden. Required:", role, "but got:", req.user?.role);
      return res.status(403).json({ message: "Forbidden: You don't have permission" });
    }

    next();
  };
};


module.exports = {
  authMiddleware,
  requireRole
};
