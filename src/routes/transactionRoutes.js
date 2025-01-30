const express = require("express");
const { check } = require("express-validator");
const TransactionController = require("../controllers/TransactionController");
const authenticate = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize(["admin", "analista"]),
    [
        check("type", "Transaction type is mandatory (income or expense").isIn(["income", "expense"]),
        check("amount", "Amount is mandatory and must be a number").isFloat({ gt: 0 }),
        check("date", "Date is mandatory").isISO8601()
    ],
    TransactionController.create
);

router.get("/", authenticate, authorize(["admin", "analista"]), TransactionController.getAll);
router.get("/:id", authenticate, authorize(["admin", "analista"]), TransactionController.getOne);
router.delete("/:id", authenticate, authorize(["admin"]), TransactionController.delete);

module.exports = router;