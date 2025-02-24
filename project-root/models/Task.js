const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  deadline: { type: Date, required: true },
  status: { type: String, enum: ['Belum Selesai', 'Selesai'], default: 'Belum Selesai' }
});

module.exports = mongoose.model('Task', TaskSchema);
