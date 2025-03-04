const express = require("express");
const taskController = require("../controllers/taskController");
const { validateTask } = require("../middlewares/taskMiddleware");

const router = express.Router();

router.get("/", taskController.getTasks); // Mengambil tugas
router.post("/", validateTask, taskController.createTask); // Menambahkan tugas
router.get("/edit/:id", taskController.editTaskPage); // Menampailkan edit
router.post("/edit/:id", validateTask, taskController.updateTask); // update tugas
router.delete("/delete/:id", taskController.deleteTask);  // delete tugas

module.exports = router;