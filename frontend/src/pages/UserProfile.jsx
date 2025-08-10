import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiEdit2,
  FiSave,
  FiX,
  FiLogOut,
  FiLock,
  FiCreditCard,
  FiShield,
  FiBell,
  FiDollarSign,
} from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stats, setStats] = useState({
    transactions: 0,
    balance: 0,
  });

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [userRes, statsRes] = await Promise.all([
          axios.get("https://localrepo-production-d703.up.railway.app/api/user/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://localrepo-production-d703.up.railway.app/api/user/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userRes.data);
        setStats({
          transactions: statsRes.data.transactions || 0,
          balance: statsRes.data.balance || 0,
        });
        setFormData({
          username: userRes.data.username,
          password: "",
        });
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load user data");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.put("https://localrepo-production-d703.up.railway.app/api/user/me", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Profile updated successfully!");
      setEditMode(false);
      const res = await axios.get("https://localrepo-production-d703.up.railway.app/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Update failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <ErrorScreen error={error} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900 sm:px-6 lg:px-8"
    >
      <Helmet>
        <title>User Profile | ExpenseTracker Pro</title>
        <meta
          name="description"
          content="Manage your account settings and preferences"
        />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden bg-white shadow-xl dark:bg-gray-800 rounded-2xl"
        >
          {/* Profile Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-gray-800 sm:p-6">
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full dark:bg-purple-900/30 sm:w-16 sm:h-16">
                    <FiUser className="text-xl text-indigo-600 dark:text-purple-400 sm:text-3xl" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    {user.username}
                  </h2>
                  <p className="text-sm text-indigo-100 dark:text-purple-200 sm:text-base">
                    {user.email}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center px-3 py-1.5 mt-3 text-xs text-red-300 rounded-lg sm:mt-0 sm:px-4 sm:py-2 sm:text-sm hover:text-white bg-white/10 dark:bg-gray-700/50"
              >
                <FiLogOut className="mr-1 sm:mr-2" /> Sign Out
              </motion.button>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <AnimatePresence>
              {error && <Notification type="error" message={error} />}
              {success && <Notification type="success" message={success} />}
            </AnimatePresence>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-3 mb-6 sm:gap-4 sm:mb-8 md:grid-cols-2">
              <StatCard
                icon={FiCreditCard}
                label="Total Transactions"
                value={stats.transactions}
                color="indigo"
              />
              <StatCard
                icon={FiDollarSign}
                label="Account Balance"
                value={`$${stats.balance.toFixed(2)}`}
                color="green"
              />
            </div>

            {/* Profile Section */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="flex items-center text-base font-semibold dark:text-white sm:text-lg">
                  <FiUser className="mr-2" /> Profile Information
                </h3>
                {!editMode && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditMode(true)}
                    className="flex items-center px-3 py-1.5 text-xs text-white bg-indigo-600 rounded-lg sm:px-4 sm:py-2 sm:text-sm dark:bg-purple-600 hover:bg-indigo-700 dark:hover:bg-purple-700"
                  >
                    <FiEdit2 className="mr-1 sm:mr-2" /> Edit Profile
                  </motion.button>
                )}
              </div>

              {!editMode ? (
                <div className="space-y-3 sm:space-y-4">
                  <InfoField
                    label="Username"
                    value={user.username}
                    icon={FiUser}
                  />
                  <InfoField label="Email" value={user.email} icon={FiMail} />
                  <InfoField
                    label="Account Security"
                    value="Standard"
                    icon={FiShield}
                    action={
                      <button className="text-xs text-indigo-600 dark:text-purple-400 hover:underline sm:text-sm">
                        Upgrade
                      </button>
                    }
                  />
                  <InfoField
                    label="Notifications"
                    value="Enabled"
                    icon={FiBell}
                    action={
                      <button className="text-xs text-indigo-600 dark:text-purple-400 hover:underline sm:text-sm">
                        Manage
                      </button>
                    }
                  />
                </div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleUpdate}
                  className="space-y-4"
                >
                  <InputField
                    icon={FiUser}
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                  />
                  <InputField
                    icon={FiLock}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="New Password (leave blank to keep current)"
                  />

                  <div className="flex pt-2 space-x-2 sm:space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center justify-center flex-1 px-3 py-2 space-x-1 text-sm font-medium text-white transition-colors bg-indigo-600 rounded-lg sm:px-4 sm:py-3 sm:space-x-2 sm:text-base dark:bg-purple-600 hover:bg-indigo-700 dark:hover:bg-purple-700"
                    >
                      <FiSave className="text-sm sm:text-base" />
                      <span>{isLoading ? "Saving..." : "Save Changes"}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setEditMode(false)}
                      className="flex items-center justify-center flex-1 px-3 py-2 space-x-1 text-sm font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg sm:px-4 sm:py-3 sm:space-x-2 sm:text-base dark:border-gray-600 dark:text-gray-300"
                    >
                      <FiX className="text-sm sm:text-base" />
                      <span>Cancel</span>
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Reusable Components
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 text-center bg-white shadow-lg dark:bg-gray-800 rounded-xl sm:p-8"
    >
      <div className="flex flex-col items-center animate-pulse">
        <div className="w-10 h-10 mb-3 bg-indigo-200 rounded-full dark:bg-purple-800 sm:w-12 sm:h-12 sm:mb-4"></div>
        <div className="w-24 h-3 mb-1.5 bg-gray-200 rounded dark:bg-gray-700 sm:w-32 sm:h-4 sm:mb-2"></div>
        <div className="w-20 h-3 bg-gray-200 rounded dark:bg-gray-700 sm:w-24 sm:h-4"></div>
      </div>
    </motion.div>
  </div>
);

const ErrorScreen = ({ error }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 text-center bg-white shadow-lg dark:bg-gray-800 rounded-xl sm:p-8"
    >
      <p className="text-sm text-red-500 dark:text-red-400 sm:text-base">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-3 py-1.5 mt-3 text-sm text-white transition-colors bg-indigo-600 rounded-lg sm:px-4 sm:py-2 sm:mt-4 sm:text-base dark:bg-purple-600 hover:bg-indigo-700 dark:hover:bg-purple-700"
      >
        Try Again
      </button>
    </motion.div>
  </div>
);

const StatCard = ({ icon: Icon, label, value, color }) => {
  const colors = {
    indigo: {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      darkBg: "bg-indigo-900/30",
      darkText: "text-indigo-400",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      darkBg: "bg-purple-900/30",
      darkText: "text-purple-400",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      darkBg: "bg-green-900/30",
      darkText: "text-green-400",
    },
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-3 rounded-xl ${colors[color].bg} dark:${colors[color].darkBg} shadow-sm sm:p-4`}
    >
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div
          className={`p-1.5 rounded-lg ${colors[color].bg} dark:${colors[color].darkBg} sm:p-2`}
        >
          <Icon
            className={`text-lg ${colors[color].text} dark:${colors[color].darkText} sm:text-xl`}
          />
        </div>
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">{label}</p>
          <p className="text-base font-semibold dark:text-white sm:text-lg">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};

const InfoField = ({ label, value, icon: Icon, action }) => (
  <div className="flex items-center justify-between p-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 sm:p-3">
    <div className="flex items-center space-x-2 sm:space-x-3">
      <Icon className="text-sm text-indigo-600 dark:text-purple-400 sm:text-base" />
      <div>
        <p className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">{label}</p>
        <p className="text-sm font-medium dark:text-white sm:text-base">{value}</p>
      </div>
    </div>
    {action}
  </div>
);

const InputField = ({ icon: Icon, type = "text", ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none sm:pl-3">
      <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 sm:w-5 sm:h-5" />
    </div>
    <input
      type={type}
      className="w-full py-2 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-400 transition-colors bg-white border border-gray-200 rounded-lg sm:py-3 sm:pl-10 sm:pr-4 sm:text-base dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white dark:placeholder-gray-500"
      {...props}
    />
  </div>
);

const Notification = ({ type, message }) => {
  const styles = {
    error: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-700 dark:text-red-300",
    },
    success: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-700 dark:text-green-300",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`p-2 text-xs rounded-lg sm:p-3 sm:text-sm ${styles[type].bg} ${styles[type].text}`}
    >
      {message}
    </motion.div>
  );
};

export default UserProfile;