const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Settings
app.set("port", process.env.PORT || 1808);


// Middlewares
// const corsOptions = {origin: "http://localhost:4200"}
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/order", require("./routes/order.routes"));
app.use("/api/product", require("./routes/product.routes"));
app.use("/api/merchandise", require("./routes/entryMerchandise.routes"));
app.use("/api/rol", require("./routes/rol.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/facebookAds", require("./routes/facebookAds.routes"));

module.exports = app;
