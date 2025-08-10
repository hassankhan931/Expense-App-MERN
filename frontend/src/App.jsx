import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiHome,
  FiUser,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages & Components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import ContactUs from "./components/ContactUs";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";

// ✅ Load audio once (outside components)
const clickSound = new Audio("/sounds/click.mp3");
const bgMusic = new Audio("/sounds/soothing.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.4;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    setMenuOpen(false);
  }, [location]);

  // ✅ Background music plays on first click anywhere
  const [hasClickedOnce, setHasClickedOnce] = useState(false);

  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasClickedOnce) {
        bgMusic.play().catch((err) => console.warn("Music play blocked:", err));
        setHasClickedOnce(true);
      }
    };

    window.addEventListener("click", handleFirstClick);
    return () => window.removeEventListener("click", handleFirstClick);
  }, [hasClickedOnce]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleDarkMode = () => {
    try {
      clickSound.currentTime = 0;
      clickSound.play();
    } catch (err) {
      console.warn("Click sound failed:", err);
    }

    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-4 text-white shadow bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-900 dark:to-gray-800"
    >
      <Link to="/" className="text-xl font-bold">
        ExpenseTracker
      </Link>

      {/* Desktop Nav */}
      <div className="items-center hidden gap-6 md:flex">
        <Link to="/" className="flex items-center gap-1 hover:underline">
          <FiHome /> Dashboard
        </Link>
        <Link to="/profile" className="flex items-center gap-1 hover:underline">
          <FiUser /> Profile
        </Link>

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="flex items-center gap-1 hover:underline"
            >
              <FiLogIn /> Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 font-medium text-indigo-600 bg-white rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-200 hover:underline"
          >
            <FiLogOut /> Logout
          </button>
        )}

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-white/10"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className="flex items-center gap-3 md:hidden">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-white/10"
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-white/10"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 text-black bg-white rounded shadow top-16 right-4 dark:bg-gray-800 dark:text-white w-52"
          >
            <div className="flex flex-col py-2">
              <Link
                to="/"
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Profile
              </Link>
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
const App = () => {
  const location = useLocation();
  return (
    <div className="w-full min-h-screen overflow-x-hidden transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>ExpenseTracker | Manage Your Finances Easily</title>
        <meta
          name="description"
          content="Track expenses, manage budgets, and gain full control of your finances with ExpenseTracker. Built by Hassan Khan."
        />
        <meta
          name="keywords"
          content="expense tracker, budget manager, money app, personal finance, Hassan Khan, finance app, react expense app"
        />
        <meta name="author" content="Hassan Khan" />
        <link
          rel="canonical"
          href="https://hassan-khan-portfolio.netlify.app/"
        />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta
          property="og:title"
          content="ExpenseTracker | Manage Your Finances"
        />
        <meta
          property="og:description"
          content="Track your expenses and budgets easily with our modern web app. Built by Hassan Khan."
        />
        <meta
          property="og:url"
          content="https://hassan-khan-portfolio.netlify.app/"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://hassan-khan-portfolio.netlify.app/og-image.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="ExpenseTracker | Manage Your Finances"
        />
        <meta
          name="twitter:description"
          content="Modern budget tracker and expense manager built by Hassan Khan."
        />
        <meta
          name="twitter:image"
          content="https://hassan-khan-portfolio.netlify.app/og-image.png"
        />
      </Helmet>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl px-4 py-8 mx-auto"
        >
          <Routes location={location}>
            {/* ✅ Protected Dashboard */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* ✅ Protected Profile */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            {/* ✅ Redirect if already logged in */}
            <Route
              path="/login"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/register"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register />
                )
              }
            />

            {/* Public Routes */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <footer className="py-6 text-sm text-center text-gray-500 border-t border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <p>
          © {new Date().getFullYear()} Expense Tracker. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs">
          <span>Made with</span>
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-red-500"
          >
            ❤️
          </motion.span>
          <span>by Hassan Khan</span>
        </div>
      </footer>
    </div>
  );
};

const RootApp = () => (
  <Router>
    <App />
  </Router>
);

export default RootApp;
