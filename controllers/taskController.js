const Task = require("../models/taskModel");

const taskController = {
  // Menampilkan halaman tambah tugas
  createTaskPage: (req, res) => {
    res.render("tasks/create");
  },

  // Menyimpan task ke database
  createTask: async (req, res) => {
    const { title, category, deadline, status } = req.body;
    const userId = req.user.id; // Ambil user ID dari session/token

    try {
      await Task.create(userId, title, category, status, deadline);
      res.redirect("/tasks"); // Redirect ke halaman tugas
    } catch (err) {
      console.error("Error saat membuat task:", err);
      res.status(500).json({ message: "Task creation failed" });
    }
  },

  // Menampilkan semua task milik user
  getTasks: async (req, res) => {
    const userId = req.user.id;
    try {
      const tasks = await Task.findAllByUserId(userId);
      res.render("tasks/index", { tasks }); // Render tampilan EJS
    } catch (err) {
      console.error("Error saat mengambil tasks:", err);
      res.status(500).send("Failed to fetch tasks");
    }
  },

  // Menampilkan halaman edit task
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

  // Mengupdate task di database
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

  // Menghapus task dari database
  deleteTask: async (req, res) => {
    const { id } = req.params;

    try {
        const isDeleted = await Task.deleteById(id);
        if (!isDeleted) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.redirect("/tasks");
    } catch (err) {
        console.error("Error saat menghapus task:", err);
        res.status(500).json({ message: "Task deletion failed" });
    }
  },
};

module.exports = taskController;