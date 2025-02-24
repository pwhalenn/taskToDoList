const Task = require("../models/Task");

// Tampilkan semua task
exports.index = async (req, res) => {
  try {
    const task = await Task.find();
    res.render("task/index", { task });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Tampilkan form tambah
exports.tambah = (req, res) => {
  res.render("task/tambah");
};

// Proses tambah task
exports.simpan = async (req, res) => {
  try {
    const { nama, nim, jurusan } = req.body;
    const taskBaru = new Task({ nama, nim, jurusan }); // ubah
    await taskBaru.save();
    res.redirect("/task");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Tampilkan form edit
exports.edit = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.render("task/edit", { task });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Proses update task
exports.update = async (req, res) => {
  try {
    const { nama, nim, jurusan } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { nama, nim, jurusan }); // ubah
    res.redirect("/task");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Hapus task
exports.hapus = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/task");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
