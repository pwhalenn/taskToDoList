const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

module.exports = router;
