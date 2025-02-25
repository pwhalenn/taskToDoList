const express = require("express");
const taskController = require("../controllers/taskController");
const { validateTask } = require("../middlewares/taskMiddleware");

const router = express.Router();

router.get("/", taskController.getTasks);
router.get("/create", taskController.createTask);
router.post("/create", validateTask, taskController.createTask);
router.get("/edit/:id", taskController.editTaskPage);
router.post("/edit/:id", validateTask, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;