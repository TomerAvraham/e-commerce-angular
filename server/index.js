require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectToMongoDB = require("./config/mongoDB");

const app = express();

app.use(cors());
app.use(express.json());
connectToMongoDB();

app.use("/api/auth", require("./routes/auth.routes"));

const PORT = 5000;
app.listen(PORT, console.log(`Running on ${PORT}`));
