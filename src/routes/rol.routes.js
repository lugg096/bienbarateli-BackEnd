const express = require("express");
const router = express.Router();

const rol = require("../controllers/rol.controller");

router.get("/", rol.getRols);

router.post("/", rol.createRol);

router.get("/:id", rol.getRol);

router.put("/:id", rol.editRol);

router.delete("/:id", rol.deleteRol);

module.exports = router;
