const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usersRouter = require("./src/routes/usersRoutes");
const newsRouter = require("./src/routes/newsRoutes");

app.use("/users", usersRouter);
app.use("/news", newsRouter);

module.exports = app;