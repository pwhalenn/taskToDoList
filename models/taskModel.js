const db = require("../config/db");

const Task = {
  // Menambahkan tugas baru ke database
    create: async (userId, title, category, status, deadline) => {
      await db
        .promise()
        .query(
          "INSERT INTO tasks (user_id, title, category, status, deadline) VALUES (?, ?, ?, ?, ?)",
          [userId, title, category, status, deadline]
        );
    },

  // Mengambil semua tugas berdasarkan user_id
  findAllByUserId: async (userId) => {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM tasks WHERE user_id = ?", [userId]);
    return rows;
  },

  // Mengambil satu tugas berdasarkan ID (untuk edit)
  findById: async (taskId) => {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM tasks WHERE id = ?", [taskId]);
    return rows[0]; // Mengembalikan satu objek tugas
  },

  // Memperbarui tugas berdasarkan ID
  update: async (taskId, title, category, status, deadline) => {
    await db
      .promise()
      .query(
        "UPDATE tasks SET title = ?, category = ?, status = ?, deadline = ? WHERE id = ?",
        [title, category, status, deadline, taskId]
      );
  },

  updateById: async (id, { title, category, deadline, status }) => {
    const query = "UPDATE tasks SET title = ?, category = ?, deadline = ?, status = ? WHERE id = ?";
    const [result] = await db.promise().query(query, [title, category, deadline, status, id]);
    return result.affectedRows > 0; // Return true jika ada yang diupdate
  },

  deleteById: async (id) => {
    const query = "DELETE FROM tasks WHERE id = ?";
    const [result] = await db.promise().query(query, [id]);
    return result.affectedRows > 0; // Return true jika berhasil dihapus
  },

  // Menghapus tugas berdasarkan ID
  delete: async (taskId) => {
    await db.promise().query("DELETE FROM tasks WHERE id = ?", [taskId]);
  },
};

module.exports = Task;
