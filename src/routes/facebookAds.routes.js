const express = require("express");
const router = express.Router();

const facebook = require("../controllers/facebookAds.controller");

router.get("/list", facebook.list);

router.post("/", facebook.create);

router.get("/:id", facebook.get);

router.post("/update/:id", facebook.edit);

router.delete("/:id", facebook.delete);

module.exports = router;
