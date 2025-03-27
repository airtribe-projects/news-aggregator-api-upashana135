const express = require("express");
const router = express.Router();
const {getNews} = require("../controllers/newsController");
const {isAuthorized} = require("../middlewares/auth");

router.get("/", [isAuthorized], getNews)

module.exports = router;