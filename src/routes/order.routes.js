const express = require("express");
const router = express.Router();

const order = require("../controllers/order.controller");

router.post("/list", order.getOrders);

router.post("/", order.createOrder);

router.get("/:id", order.getOrder);

router.post("/update/:id", order.editOrder);

router.delete("/:id", order.deleteOrder);

router.post("/stock", order.stock);

router.post("/workToday", order.getOrderToday);




module.exports = router;
