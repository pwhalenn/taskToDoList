const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Method GET
router.get("/register", (req, res) => {
    res.render("register");
});
router.get("/login", (req, res) => {
    res.render("login");
});

// Method POST
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
