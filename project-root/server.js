const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mahasiswaRoutes = require("./routes/mahasiswaRoutes");
require("./config/database"); // Koneksi ke database

const app = express();
app.use(express.static("public"));
const server = http.createServer(app);
const io = new Server(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.use("/task", taskRoutes);

app.get("/", (req, res) => {
  res.redirect("/task");
});

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('newTask', (task) => {
        io.emit('taskAdded', task);
    });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));