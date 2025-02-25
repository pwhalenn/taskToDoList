const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log(`🔹 Incoming Request: ${req.method} ${req.path}`);

  // Ambil token dari session, bukan dari Authorization header
  const token = req.session.token; 

  if (!token) {
    console.log("❌ No token provided. Access denied.");
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Simpan user info ke req.user
    console.log("✅ Token verified.");
    next();
  } catch (err) {
    console.log("❌ Invalid token.");
    res.status(400).json({ message: "Invalid token" });
  }
};

// Middleware untuk validasi input task
const validateTask = (req, res, next) => {
  const { title, category, deadline, status } = req.body;
  if (!title || !category || !deadline || !status) {
    return res.status(400).json({ message: "Semua field harus diisi!" });
  }
  next();
};

module.exports = authMiddleware;