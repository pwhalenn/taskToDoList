const User = require("../models/userModel");
const { generateToken } = require("../config/auth");
const bcrypt = require("bcryptjs");

const authController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const userId = await User.create(username, password);
      const token = generateToken(userId);
      // res.status(201).json({ token });
      res.redirect("/auth/login");
    } catch (err) {
      res.status(500).json({ message: "Registration failed" });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", username, password);
    try {
      const user = await User.findByUsername(username);
      console.log("User found:", user);

      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);

      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      const token = generateToken(user.id);
      console.log("Generated token:", token);

      req.session.token = token;
      req.session.user = { id: user.id, username: user.username };

      res.redirect("/tasks");

    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: "Login failed" });
    }
  },
  logout: async (req, res) => {
    try {
      res.json({ message: "Logout successful" });
    } catch (err) {
      res.status(500).json({ message: "Logout failed" });
    }
  },
};

module.exports = authController;
