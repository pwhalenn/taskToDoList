const Task = require("../models/taskModel");

const taskController = {
  createTask: async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;
    try {
      const taskId = await Task.create(userId, title, description);
      res.redirect("/tasks"); // Redirect to tasks page after creation
    } catch (err) {
      res.status(500).json({ message: "Task creation failed" });
    }
  },
  getTasks: async (req, res) => {
    const userId = req.user.id;
    try {
      const tasks = await Task.findAllByUserId(userId);
      res.render("tasks/index", { tasks }); // Render EJS view
    } catch (err) {
      res.status(500).send("Failed to fetch tasks");
    }
  },
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
      await Task.update(id, title, description, completed);
      res.redirect("/tasks"); // Redirect after update
    } catch (err) {
      res.status(500).json({ message: "Task update failed" });
    }
  },
  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      await Task.delete(id);
      res.redirect("/tasks"); // Redirect after deletion
    } catch (err) {
      res.status(500).json({ message: "Task deletion failed" });
    }
  },
};

module.exports = taskController;
