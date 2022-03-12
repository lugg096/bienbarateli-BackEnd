const express = require("express");
const router = express.Router();

const entryMerchandise = require("../controllers/entryMerchandise.controller");

router.get("/", entryMerchandise.getEntryMerchandises);

router.post("/", entryMerchandise.createEntryMerchandise);

router.get("/:id", entryMerchandise.getEntryMerchandise);

router.post("/update/:id", entryMerchandise.editEntryMerchandise);

router.delete("/:id", entryMerchandise.deleteEntryMerchandise);

router.post("/byproduct", entryMerchandise.getByProduct);

module.exports = router;
