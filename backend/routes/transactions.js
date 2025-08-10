const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");

// ✅ Create transaction
router.post("/", auth, async (req, res) => {
  try {
    const { type, category, amount, title, date, description } = req.body;

    const newTransaction = await Transaction.create({
      user: req.user.id,
      type,
      category,
      amount,
      title,
      date,
      description,
    });

    res.status(201).json(newTransaction);
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get user's transactions
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update a transaction (missing in your version)
router.put("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // only allow updating own transactions
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete a transaction
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

