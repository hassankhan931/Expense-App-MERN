import React, { useEffect, useState } from "react";
import ExpenseChart from "../components/charts/ExpenseChart";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTrash2,
  FiLogOut,
  FiArrowUp,
  FiArrowDown,
  FiEdit2,
  FiFilter,
  FiPieChart,
  FiTrendingUp,
  FiTrendingDown,
  FiCalendar,
  FiDollarSign,
  FiTag,
  FiAlignLeft,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import CurrencyInput from "react-currency-input-field";

const Dashboard = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [currency, setCurrency] = useState("$");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "all",
    category: "all",
    dateRange: "all",
    minAmount: "",
    maxAmount: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const currencies = [
    { symbol: "$", name: "USD" },
    { symbol: "€", name: "EUR" },
    { symbol: "£", name: "GBP" },
    { symbol: "¥", name: "JPY" },
    { symbol: "₹", name: "INR" },
    { symbol: "₨", name: "PKR" },
    { symbol: "C$", name: "CAD" },
    { symbol: "A$", name: "AUD" },
    { symbol: "¥", name: "CNY" },
    { symbol: "₽", name: "RUB" },
    { symbol: "₩", name: "KRW" },
    { symbol: "₫", name: "VND" },
    { symbol: "฿", name: "THB" },
    { symbol: "₪", name: "ILS" },
    { symbol: "₺", name: "TRY" },
    { symbol: "د.إ", name: "AED" },
    { symbol: "R$", name: "BRL" },
    { symbol: "CHF", name: "CHF" },
    { symbol: "kr", name: "SEK" },
    { symbol: "kr", name: "NOK" },
    { symbol: "kr", name: "DKK" },
    { symbol: "zł", name: "PLN" },
    { symbol: "Kč", name: "CZK" },
    { symbol: "₴", name: "UAH" },
    { symbol: "RM", name: "MYR" },
    { symbol: "S$", name: "SGD" },
    { symbol: "₦", name: "NGN" },
    { symbol: "R", name: "ZAR" },
    { symbol: "৳", name: "BDT" },
  ];

  // Enhanced categories with more options
  const categories = [
    { value: "food", label: "Food", icon: "🍔" },
    { value: "salary", label: "Salary", icon: "💰" },
    { value: "shopping", label: "Shopping", icon: "🛍️" },
    { value: "transportation", label: "Transportation", icon: "🚗" },
    { value: "entertainment", label: "Entertainment", icon: "🎬" },
    { value: "bills", label: "Bills", icon: "🧾" },
    { value: "housing", label: "Housing", icon: "🏠" },
    { value: "health", label: "Health", icon: "🏥" },
    { value: "education", label: "Education", icon: "📚" },
    { value: "gifts", label: "Gifts", icon: "🎁" },
    { value: "investment", label: "Investment", icon: "📈" },
    { value: "travel", label: "Travel", icon: "✈️" },
    { value: "other", label: "Other", icon: "✨" },
  ];

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, filters, activeTab]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "https://localrepo-production-d703.up.railway.app/api/transactions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTransactions = () => {
    let result = [...transactions];

    // Apply tab filter
    if (activeTab === "income") {
      result = result.filter((t) => t.type === "income");
    } else if (activeTab === "expense") {
      result = result.filter((t) => t.type === "expense");
    }

    // Apply other filters
    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    if (filters.dateRange !== "all") {
      const now = new Date();
      if (filters.dateRange === "today") {
        result = result.filter(
          (t) => new Date(t.date).toDateString() === now.toDateString()
        );
      } else if (filters.dateRange === "week") {
        const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
        result = result.filter((t) => new Date(t.date) >= oneWeekAgo);
      } else if (filters.dateRange === "month") {
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        result = result.filter((t) => new Date(t.date) >= oneMonthAgo);
      } else if (filters.dateRange === "year") {
        const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
        result = result.filter((t) => new Date(t.date) >= oneYearAgo);
      }
    }

    if (filters.minAmount) {
      result = result.filter((t) => t.amount >= parseFloat(filters.minAmount));
    }

    if (filters.maxAmount) {
      result = result.filter((t) => t.amount <= parseFloat(filters.maxAmount));
    }

    setFilteredTransactions(result);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAmountChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      amount: value || "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert amount to number before sending
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
      };

      if (editingId) {
        await axios.put(
          `https://localrepo-production-d703.up.railway.app/api/transactions/${editingId}`,
          transactionData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post(
          "https://localrepo-production-d703.up.railway.app/api/transactions",
          transactionData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      fetchTransactions();
      resetForm();
    } catch (err) {
      console.error(
        "Error saving transaction:",
        err.response?.data || err.message
      );
      // Add error notification to user here
    }
  };

  const handleEdit = (transaction) => {
    setFormData({
      title: transaction.title,
      amount: transaction.amount.toString(), // Ensure amount is string for input
      type: transaction.type,
      category: transaction.category,
      description: transaction.description || "", // Handle potential undefined
      date: transaction.date.slice(0, 10), // Format date for date input
    });
    setEditingId(transaction._id);
    setIsFormOpen(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(
          `https://localrepo-production-d703.up.railway.app/api/transactions/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTransactions((prev) => prev.filter((t) => t._id !== id));
      } catch (err) {
        console.error("Error deleting transaction:", err);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      description: "",
      date: new Date().toISOString().slice(0, 10),
    });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const resetFilters = () => {
    setFilters({
      type: "all",
      category: "all",
      dateRange: "all",
      minAmount: "",
      maxAmount: "",
    });
    setActiveTab("all");
  };

  // Calculations
  const income = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  // Get category icon
  const getCategoryIcon = (category) => {
    const found = categories.find((c) => c.value === category);
    return found ? found.icon : "💰";
  };

  // Get category label
  const getCategoryLabel = (category) => {
    const found = categories.find((c) => c.value === category);
    return found ? found.label : "Other";
  };

  return (
    <div className="p-4 mx-auto max-w-7xl md:p-6">
      <Helmet>
        <title>Dashboard | ExpenseTracker Pro</title>
        <meta
          name="description"
          content="Advanced expense tracking with analytics, filtering, and financial insights. Monitor your cash flow with precision."
        />
        <meta
          name="keywords"
          content="expense tracker, personal finance, budget manager, financial dashboard, money management"
        />
        <meta name="author" content="Hassan Khan" />

        {/* Open Graph */}
        <meta property="og:title" content="Dashboard | ExpenseTracker Pro" />
        <meta
          property="og:description"
          content="Advanced financial tracking with powerful analytics and insights."
        />
        <meta
          property="og:url"
          content="https://expensetracker-pro.netlify.app/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://expensetracker-pro.netlify.app/og-image.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dashboard | ExpenseTracker Pro" />
        <meta
          name="twitter:description"
          content="Take control of your finances with our advanced expense tracking dashboard."
        />
        <meta
          name="twitter:image"
          content="https://expensetracker-pro.netlify.app/og-image.png"
        />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white">
            Welcome back,{" "}
            <span className="text-transparent text-gradient bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text">
              {user?.username}
            </span>
          </h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="px-3 py-2 pr-8 text-sm transition-all bg-white border border-gray-200 rounded-lg appearance-none dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-purple-500 focus:border-indigo-500 dark:focus:border-purple-500"
            >
              {currencies.map((curr) => (
                <option key={curr.name} value={curr.symbol}>
                  {curr.name} ({curr.symbol})
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center px-4 py-2 space-x-2 text-white transition-all rounded-lg shadow-md bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-lg"
          >
            <FiLogOut className="text-lg" />
            <span className="hidden sm:inline">Logout</span>
          </motion.button>
        </div>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 transition-shadow bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="flex items-center font-medium text-gray-500 dark:text-gray-400">
                <FiDollarSign className="mr-2" /> Total Balance
              </h3>
              <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                {currency}
                {balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {filteredTransactions.length} transactions
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
              <FiPieChart className="text-2xl text-indigo-600 dark:text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 transition-shadow bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="flex items-center font-medium text-gray-500 dark:text-gray-400">
                <FiTrendingUp className="mr-2" /> Income
              </h3>
              <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                +{currency}
                {income.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {filteredTransactions.filter((t) => t.type === "income").length}{" "}
                transactions
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full dark:bg-green-900/30">
              <FiArrowUp className="text-2xl text-green-600 dark:text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-5 transition-shadow bg-white border border-gray-100 shadow-lg dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="flex items-center font-medium text-gray-500 dark:text-gray-400">
                <FiTrendingDown className="mr-2" /> Expenses
              </h3>
              <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
                -{currency}
                {expense.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {
                  filteredTransactions.filter((t) => t.type === "expense")
                    .length
                }{" "}
                transactions
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full dark:bg-red-900/30">
              <FiArrowDown className="text-2xl text-red-600 dark:text-red-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
        {/* Tabs */}
        <div className="flex p-1 space-x-1 bg-gray-100 rounded-lg dark:bg-gray-800">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "all"
                ? "bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-purple-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("income")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "income"
                ? "bg-white dark:bg-gray-700 shadow-sm text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setActiveTab("expense")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "expense"
                ? "bg-white dark:bg-gray-700 shadow-sm text-red-600 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Expenses
          </button>
        </div>

        <div className="flex space-x-3">
          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm transition-all ${
              isFilterOpen
                ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <FiFilter />
            <span>Filters</span>
          </motion.button>

          {/* Add Transaction Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(!isFormOpen)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm transition-all ${
              isFormOpen
                ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
            }`}
          >
            <FiPlus />
            <span>Add Transaction</span>
          </motion.button>
        </div>
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden bg-white border border-gray-100 shadow-md dark:bg-gray-800 rounded-xl dark:border-gray-700"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800 dark:text-white">
                  Filters
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-sm text-indigo-600 dark:text-purple-400 hover:underline"
                >
                  Reset All
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Transaction Type
                  </label>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all"
                  >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date Range
                  </label>
                  <select
                    name="dateRange"
                    value={filters.dateRange}
                    onChange={handleFilterChange}
                    className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                    <option value="year">Last Year</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Min Amount ({currency})
                  </label>
                  <input
                    type="number"
                    name="minAmount"
                    placeholder="0.00"
                    value={filters.minAmount}
                    onChange={handleFilterChange}
                    className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Max Amount ({currency})
                  </label>
                  <input
                    type="number"
                    name="maxAmount"
                    placeholder="0.00"
                    value={filters.maxAmount}
                    onChange={handleFilterChange}
                    className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Transaction Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mb-8 overflow-hidden bg-white border border-gray-100 shadow-xl dark:bg-gray-800 rounded-xl dark:border-gray-700"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {editingId ? "Edit Transaction" : "Add New Transaction"}
                </h2>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiTag className="mr-2" /> Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Groceries, Salary, etc."
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 transition-all border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiDollarSign className="mr-2" /> Amount
                  </label>
                  <CurrencyInput
                    name="amount"
                    placeholder={`${currency}0.00`}
                    value={formData.amount}
                    onValueChange={handleAmountChange}
                    decimalsLimit={2}
                    prefix={currency}
                    required
                    className="w-full p-3 transition-all border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiTrendingUp className="mr-2" /> Type
                  </label>
                  <div className="flex overflow-hidden border border-gray-200 rounded-lg dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, type: "income" })
                      }
                      className={`flex-1 py-3 px-4 text-center font-medium transition-colors flex items-center justify-center ${
                        formData.type === "income"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <FiArrowUp className="mr-2" /> Income
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, type: "expense" })
                      }
                      className={`flex-1 py-3 px-4 text-center font-medium transition-colors flex items-center justify-center ${
                        formData.type === "expense"
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <FiArrowDown className="mr-2" /> Expense
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiTag className="mr-2" /> Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 transition-all border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiCalendar className="mr-2" /> Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full p-3 transition-all border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <FiAlignLeft className="mr-2" /> Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Additional details..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 transition-all border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  {editingId ? "Update" : "Add"} Transaction
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    
      {/* Transaction List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="overflow-hidden bg-white border border-gray-100 shadow-xl dark:bg-gray-800 rounded-xl dark:border-gray-700"
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Transactions
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredTransactions.length}{" "}
              {filteredTransactions.length === 1
                ? "transaction"
                : "transactions"}
            </span>
            {filters.type !== "all" ||
            filters.category !== "all" ||
            filters.dateRange !== "all" ||
            filters.minAmount ||
            filters.maxAmount ? (
              <span className="px-2 py-1 text-xs text-indigo-800 bg-indigo-100 rounded-full dark:bg-indigo-900/30 dark:text-indigo-200">
                Filtered
              </span>
            ) : null}
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="flex flex-col items-center animate-pulse">
              <div className="w-12 h-12 mb-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              <div className="w-3/4 h-4 mb-2 bg-gray-200 rounded dark:bg-gray-700"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded dark:bg-gray-700"></div>
            </div>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full dark:bg-gray-700">
              <FiArrowUp className="text-3xl text-gray-400" />
              <FiArrowDown className="-ml-3 text-3xl text-gray-400" />
            </div>
            <h3 className="mb-1 text-lg font-medium text-gray-700 dark:text-gray-300">
              No transactions found
            </h3>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              {transactions.length === 0
                ? "Add your first transaction to get started"
                : "Try adjusting your filters"}
            </p>
            <button
              onClick={() => {
                if (transactions.length === 0) {
                  setIsFormOpen(true);
                } else {
                  resetFilters();
                }
              }}
              className="px-4 py-2 font-medium text-white transition-all rounded-lg shadow-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 hover:shadow-md"
            >
              {transactions.length === 0 ? "Add Transaction" : "Reset Filters"}
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredTransactions.map((t) => (
              <motion.li
                key={t._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1 min-w-0 space-x-4">
                    <div
                      className={`mt-1 flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                        t.type === "income"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {getCategoryIcon(t.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-800 truncate dark:text-white">
                          {t.title}
                        </h3>
                        {t.type === "income" ? (
                          <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
                            Income
                          </span>
                        ) : (
                          <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-full">
                            Expense
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {getCategoryLabel(t.category)} •{" "}
                        {new Date(t.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      {t.description && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                          {t.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center ml-4 space-x-3">
                    <span
                      className={`text-lg font-semibold whitespace-nowrap ${
                        t.type === "income"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}
                      {currency}
                      {t.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(t)}
                        className="p-2 text-gray-400 transition-colors hover:text-indigo-500 dark:hover:text-purple-400"
                        aria-label="Edit transaction"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="p-2 text-gray-400 transition-colors hover:text-red-500"
                        aria-label="Delete transaction"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
       {/* Chart Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <ExpenseChart
            transactions={filteredTransactions}
            currency={currency}
          />
        </motion.div>

      {/* Footer */}
      <div className="mt-8 text-sm text-center text-gray-500 dark:text-gray-400">
        <p>ExpenseTracker Pro • {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Dashboard;
