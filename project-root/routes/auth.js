const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const taskController = require("../controllers/taskController");
const secretKey = process.env.JWT_SECRET || 'secret123';

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id, username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;

// Masih mau diubah

router.get("/", taskController.index);
router.get("/tambah", taskController.tambah);
router.post("/simpan", taskController.simpan);
router.get("/edit/:id", taskController.edit);
router.post("/update/:id", taskController.update);
router.get("/hapus/:id", taskController.hapus);

module.exports = router;
