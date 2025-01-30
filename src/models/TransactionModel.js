const pool = require("../config/db");

class Transaction {
    static async create(userId, type, amount, category, description, date) {
        const [result] = await pool.query("INSERT INTO transactions (user_id, type, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)",
            [userId, type, amount, category, description, date]
        );
        return result.insertId;
    }

    static async getByUser(userId) {
        const [rows] = await pool.query(
            "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC",
            [userId]
        );
        return rows;
    }

    static async getById(userId, transactionId) {
        const [rows] = await pool.query(
            "SELECT * FROM transactions WHERE id = ? AND user_id = ?",
            [transactionId, userId]
        );
        return rows[0];
    }

    static async delete(userId, transactionId) {
        const [result] = await pool.query("DELETE FROM transactions WHERE id = ? AND user_id = ?",
            [transactionId, userId]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Transaction;