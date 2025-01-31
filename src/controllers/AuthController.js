const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/UserModel");

class AuthController {
    static async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, role } = req.body;
        try {
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "Email address already exists." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = await User.create(name, email, hashedPassword, role);

            res.status(201).json({ message: "User created successfully!", userId });
        } catch (error) {
            res.status(500).json({ message: "Error trying to create user.", error });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findByEmail(email);
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: "Invalid credentials." });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials." });
            }

            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.json({ token });
        } catch (error) {
            console.error("Error trying to authenticate:", error);
            res.status(500).json({ message: "Error trying to authenticate.", error });
        }
    }
}

module.exports = AuthController;