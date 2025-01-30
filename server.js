require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes");
const protectedRoutes = require("./src/routes/protectedRoutes");
const transactionRoutes = require("./src/routes/transactionRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
    res.send("Running API...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running server on port ${PORT}`));

const pool = require("./src/config/db");

pool.getConnection()
    .then(connection => {
        console.log("Database successfully connected!");
        connection.release();
    })
    .catch(err => {
        console.error("Error trying to connect to Database:", err);
    });

