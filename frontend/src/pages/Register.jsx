import React, { useEffect, useState } from "react"; // ✅ Correct
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [gradientIndex, setGradientIndex] = useState(0);
  const navigate = useNavigate();

  // Premium gradient animations
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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("https://localrepo-production-d703.up.railway.app/api/auth/register", formData);

      if (res.status === 201 || res.status === 200) {
        setSuccess(true);

        // ✅ Delay navigation for 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 overflow-hidden">
      {/* Premium animated background */}
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
      
      {/* Floating particles animation */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full opacity-20"
          initial={{
            x: Math.random() * 100,
            y: Math.random() * 100,
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
          }}
          animate={{
            x: Math.random() * 100,
            y: Math.random() * 100 + 100,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      <Helmet>
        <title>Register | ExpenseTracker</title>
        <meta
          name="description"
          content="Create your free ExpenseTracker account. Start tracking your expenses and managing your finances easily."
        />
        <meta
          name="keywords"
          content="register, create account, signup, ExpenseTracker register, finance app signup"
        />
        <meta name="author" content="Hassan Khan" />
        <link
          rel="canonical"
          href="https://hassan-khan-portfolio.netlify.app/register"
        />

        {/* Open Graph for social sharing */}
        <meta property="og:title" content="Register | ExpenseTracker" />
        <meta
          property="og:description"
          content="Create a free account and start managing your finances."
        />
        <meta
          property="og:url"
          content="https://hassan-khan-portfolio.netlify.app/register"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://hassan-khan-portfolio.netlify.app/og-image.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Register | ExpenseTracker" />
        <meta
          name="twitter:description"
          content="Create your account and start tracking expenses with ExpenseTracker."
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
        <div className="overflow-hidden shadow-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl">
          {/* Header with gradient */}
          <div className="p-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-gray-800">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="mt-2 text-indigo-200 dark:text-purple-300">
                Join us to start tracking your expenses
              </p>
            </motion.div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-3 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-900/30 dark:text-green-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {success}
              </motion.div>
            )}

            <div className="space-y-5">
              {/* Username Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <FiUser className="w-5 h-5 text-gray-500 transition-colors dark:text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-purple-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 transition-all border border-gray-300 rounded-lg shadow-sm bg-white/80 dark:bg-gray-700/80 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white dark:placeholder-gray-400 group-hover:border-gray-400 dark:group-hover:border-gray-500"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <FiMail className="w-5 h-5 text-gray-500 transition-colors dark:text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-purple-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 transition-all border border-gray-300 rounded-lg shadow-sm bg-white/80 dark:bg-gray-700/80 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white dark:placeholder-gray-400 group-hover:border-gray-400 dark:group-hover:border-gray-500"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <FiLock className="w-5 h-5 text-gray-500 transition-colors dark:text-gray-400 group-focus-within:text-indigo-600 dark:group-focus-within:text-purple-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full py-3 pl-12 pr-12 text-gray-900 placeholder-gray-500 transition-all border border-gray-300 rounded-lg shadow-sm bg-white/80 dark:bg-gray-700/80 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 dark:text-white dark:placeholder-gray-400 group-hover:border-gray-400 dark:group-hover:border-gray-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:text-purple-500 dark:focus:ring-purple-500 dark:border-gray-600"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                  I agree to the <a href="#" className="text-indigo-600 dark:text-purple-400 hover:text-indigo-500 dark:hover:text-purple-300">Terms and Conditions</a>
                </label>
              </div>
            </div>

            {/* Animated Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="relative flex items-center justify-center w-full px-6 py-3 space-x-2 font-medium text-white transition-all bg-indigo-600 rounded-lg shadow-lg dark:bg-purple-600 hover:bg-indigo-700 dark:hover:bg-purple-700 group"
            >
              {isLoading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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

          {/* Footer with login link */}
          <div className="px-8 pb-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 transition-colors dark:text-purple-400 hover:text-indigo-500 dark:hover:text-purple-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
