const express = require("express");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, "public")));

const session = require("express-session");

// Gunakan session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret", // Gunakan variabel env
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 }, // 1 jam
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", authMiddleware, taskRoutes);

// Redirect root to login
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
