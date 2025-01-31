require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("../src/routes/authRoutes");
const transactionRoutes = require("../src/routes/transactionRoutes");
const protectedRoutes = require("../src/routes/protectedRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
    res.send("Running API...");
});

module.exports = app;