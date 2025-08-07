const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Transaction = require("../models/Transaction"); // Make sure this exists
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token,
      },
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ✅ GET /api/user/me — return current logged-in user info
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.error("Get user error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET /api/user/stats — return transaction stats
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });

    const total = transactions.reduce((acc, txn) => acc + txn.amount, 0);
    const income = transactions
      .filter((txn) => txn.type === "income")
      .reduce((acc, txn) => acc + txn.amount, 0);
    const expense = transactions
      .filter((txn) => txn.type === "expense")
      .reduce((acc, txn) => acc + txn.amount, 0);

    res.status(200).json({
      totalTransactions: transactions.length,
      total,
      income,
      expense,
    });
  } catch (err) {
    console.error("Stats error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

