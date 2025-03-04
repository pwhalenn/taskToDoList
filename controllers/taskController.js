const Task = require("../models/taskModel");

const taskController = {
  // Simpan task ke database

  createTask: async (req, res) => {
    const { title, category, deadline, status } = req.body;
    const userId = req.user.id;
    try {
      const id = await Task.create(userId, title, category, deadline, status);
      res.redirect("/tasks");
    } catch (err) {
      res.status(500).json({ message: "Task creation failed" });
    }
  },

  // Tampil semua task
  getTasks: async (req, res) => {
    const userId = req.user.id;
    try {
      const tasks = await Task.findAllByUserId(userId);
      res.render("tasks", { tasks });
    } catch (err) {
      console.error("Error saat mengambil tasks:", err);
      res.status(500).send("Failed to fetch tasks");
    }
  },

  // Simpan update tasknya
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { title, category, deadline, status } = req.body;

    try {
        const isUpdated = await Task.updateById(id, { title, category, deadline, status });
        if (!isUpdated) {
            return res.status(404).json({ message: "Task not found or not updated" });
        }
        res.redirect("/tasks");
    } catch (err) {
        console.error("Error saat mengupdate task:", err);
        res.status(500).json({ message: "Task update failed" });
    }
  },

  // Menghapus task
  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      await Task.deleteById(id);
      res.redirect("/tasks");
    } catch (err) {
      res.status(500).json({ message: "Task deletion failed" });
    }
  },
};

module.exports = taskController;