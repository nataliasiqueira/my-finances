const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
    res.json({ message: "Welcome, admin! You have full access." });
});

router.get("/analyst", authenticate, authorize(["admin", "analista"]), (req, res) => {
    res.json({ message: "Welcome, Analyst! You can only read data." });
});

module.exports = router;