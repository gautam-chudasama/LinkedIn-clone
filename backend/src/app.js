const express = require("express");
const postRoutes = require("./routes/post.route");
const userRoutes = require("./routes/user.route");

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
