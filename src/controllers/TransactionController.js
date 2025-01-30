const { validationResult } = require("express-validator");
const Transaction = require("../models/TransactionModel");

class TransactionController {
    static async create(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { type, amount, category, description, date } = req.body;
        try {
            const transactiond = await Transaction.create(
                req.user.id, type, amount, category, description, date
            );
            res.status(201).json({ message: "Transaction created successfully!", transactiond });
        } catch (error) {
            res.status(500).json({ message: "Error trying to create transaction.", error });
        }
    }

    static async getAll(req, res) {
        try {
            const transactions = await Transaction.getByUser(req.user.id);
            res.json(transactions);
        } catch (error) {
            res.status(500).json({ message: "Error while searching for transactions.", error });
        }
    }

    static async getOne(req, res) {
        const { id } = req.params;
        try {
            const transaction = await Transaction.getById(req.user.id, id);
            if (!transaction) {
                return res.status(404).json({ message: "Transaction not found." });
            }
            res.json(transaction);
        } catch (error) {
            res.status(500).json({ message: "Error while searching for transaction.", error });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;
        try {
            const deleted = await Transaction.delete(req.user.id, id);
            if (!deleted) {
                return res.status(404).json({ message: "Transaction not found." });
            }
            res.json({ message: "Transaction deleted successfully!" });
        } catch (error) {
            res.status(500).json({ message: "Error while trying to delete transaction.", error });
        }
    }
}

module.exports = TransactionController;