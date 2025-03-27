const express = require("express");
const router = express.Router();

const {registerUser, loginUser, usersPreferences, updateUsersPreferences, getAllUsers} = require("../controllers/usersController");
const {validateUser, isAuthorized} = require("../middlewares/auth");

router.get("/", getAllUsers)
router.post("/signup", [validateUser], registerUser);
router.post("/login", loginUser);
router.get("/preferences", [isAuthorized], usersPreferences);
router.put("/preferences", [isAuthorized], updateUsersPreferences);

module.exports = router;
