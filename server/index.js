require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToMongoDB = require("./config/mongoDB");

const app = express();

app.use(cors());
app.use(express.json());
connectToMongoDB();

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/product", require("./routes/product.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/order", require("./routes/order.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

const PORT = 5000;
app.listen(PORT, console.log(`Running on ${PORT}`));
