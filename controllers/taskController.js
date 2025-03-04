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

  // Ke edit forum
  editTaskPage: async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).send("Task not found");
      }
      res.render("tasks/edit", { task });
    } catch (err) {
      console.error("Error saat menampilkan halaman edit:", err);
      res.status(500).send("Failed to load edit page");
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
      await Task.delete(id);
      res.json({ message: "Task deleted" });
    } catch (err) {
      res.status(500).json({ message: "Task deletion failed" });
    }
  },
};

module.exports = taskController;