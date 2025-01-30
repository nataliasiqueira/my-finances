const express = require("express");
const { check } = require("express-validator");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post(
    "/register",
    [
        check("name", "Name is mandatory").not().isEmpty(),
        check("email", "Enter a valid email address").isEmail(),
        check("password", "Password must have at least 6 characters").isLength({ min: 6 }),
        check("role", "Role must be admin or analyst").isIn(["admin", "analista"]),
    ],
    AuthController.register
);

router.post("/login", AuthController.login);

module.exports = router;