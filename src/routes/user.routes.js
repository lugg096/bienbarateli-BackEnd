const express = require("express");
const router = express.Router();

const user = require("../controllers/user.controller");

router.get("/list", user.getUsers);

router.post("/", user.createUser);

router.get("/:id", user.getUser);

router.post("/update/:id",user.editUser);

router.delete("/:id", user.deleteUser);

router.post("/login", user.LoginUser);

module.exports = router;
