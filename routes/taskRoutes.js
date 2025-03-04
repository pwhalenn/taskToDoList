const express = require("express");
const taskController = require("../controllers/taskController");
const { validateTask } = require("../middlewares/taskMiddleware");

const router = express.Router();

router.get("/", taskController.getTasks); // Mengambil tugas
router.post("/", validateTask, taskController.createTask); // Menambahkan tugas
router.post("/:id", validateTask, taskController.updateTask); // update tugas
router.post("/delete/:id", taskController.deleteTask);  // delete tugas

module.exports = router;