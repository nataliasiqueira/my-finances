const pool = require("../config/db");

class User {
    static async findByEmail(email) {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        return rows[0];
    }

    static async create(name, email, hashedPassword, role) {
        const [result] = await pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role]
        );
        return result.insertedId;
    }
}

module.exports = User;