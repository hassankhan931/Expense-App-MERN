import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiLogIn, FiMail, FiLock, FiLoader } from "react-icons/fi";
import { Helmet } from 'react-helmet-async';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gradientIndex, setGradientIndex] = useState(0);
  const navigate = useNavigate();

  // Animated background gradients
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)",
    "linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

 const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please fill in all fields");
    return;
  }

  setIsLoading(true);
  setError("");

  try {
    const res = await axios.post("https://localrepo-production-d703.up.railway.app/api/auth/login", {
      email,
      password,
    });

    // Save token and user only if both are present
    if (res.data.token && res.data.user) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/"); // Redirect to homepage or dashboard
    } else {
      setError("Invalid server response. Please try again.");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={{
          background: gradients[gradientIndex],
        }}
        animate={{
          background: gradients[gradientIndex],
        }}
        transition={{ duration: 2 }}
      />
      
      {/* Animated floating bubbles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-10"
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
          }}
          animate={{
            x: Math.random() * 100,
            y: Math.random() * 100,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      <Helmet>
        <title>Login | ExpenseTracker</title>
        <meta
          name="description"
          content="Securely login to your ExpenseTracker account. Manage your budget and track expenses with ease."
        />
        <meta
          name="keywords"
          content="login, ExpenseTracker login, sign in, budget app login, finance login, Hassan Khan"
        />
        <meta name="author" content="Hassan Khan" />
        <link rel="canonical" href="https://hassan-khan-portfolio.netlify.app/login" />

        {/* Open Graph for social media */}
        <meta property="og:title" content="Login | ExpenseTracker" />
        <meta
          property="og:description"
          content="Access your ExpenseTracker account. Built by Hassan Khan."
        />
        <meta
          property="og:url"
          content="https://hassan-khan-portfolio.netlify.app/login"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://hassan-khan-portfolio.netlify.app/og-image.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Login | ExpenseTracker" />
        <meta
          name="twitter:description"
          content="Secure login to your ExpenseTracker account."
        />
        <meta
          name="twitter:image"
          content="https://hassan-khan-portfolio.netlify.app/og-image.png"
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="overflow-hidden shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl">
          <div className="p-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-gray-800">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="mt-2 text-indigo-200 dark:text-purple-300">
                Sign in to your account
              </p>
            </motion.div>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-300"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <FiMail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 transition-all border border-gray-300 rounded-lg shadow-sm bg-white/70 dark:bg-gray-700/70 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white dark:placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <FiLock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 transition-all border border-gray-300 rounded-lg shadow-sm bg-white/70 dark:bg-gray-700/70 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white dark:placeholder-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded dark:text-purple-500 focus:ring-indigo-500 dark:focus:ring-purple-500 dark:border-gray-600"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-indigo-600 transition-colors dark:text-purple-400 hover:text-indigo-500 dark:hover:text-purple-300"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="relative flex items-center justify-center w-full px-6 py-3 space-x-2 font-medium text-white transition-all bg-indigo-600 rounded-lg shadow-lg dark:bg-purple-600 hover:bg-indigo-700 dark:hover:bg-purple-700"
            >
              {isLoading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <FiLogIn className="w-5 h-5" />
                  <span>Sign in</span>
                </>
              )}
              {isLoading && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 origin-left bg-indigo-400/50 dark:bg-purple-400/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          </form>

          <div className="px-8 pb-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 transition-colors dark:text-purple-400 hover:text-indigo-500 dark:hover:text-purple-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

