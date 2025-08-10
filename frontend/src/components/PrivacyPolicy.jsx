import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet-async"; // or 'react-helmet'

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-200px)] bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
<Helmet>
  <title>Privacy Policy | ExpenseTracker</title>
  <meta
    name="description"
    content="Learn how ExpenseTracker, developed by Hassan Khan, collects, uses, and protects your data. Your privacy is important to us."
  />
  <meta
    name="keywords"
    content="privacy policy, data protection, Hassan Khan, expense tracker privacy, data security, user privacy"
  />
  <meta name="author" content="Hassan Khan" />
  <link
    rel="canonical"
    href="https://hassan-khan-portfolio.netlify.app/privacy"
  />

  {/* Open Graph Meta */}
  <meta property="og:title" content="Privacy Policy | ExpenseTracker" />
  <meta
    property="og:description"
    content="Understand how your data is handled with our privacy policy. ExpenseTracker by Hassan Khan."
  />
  <meta
    property="og:url"
    content="https://hassan-khan-portfolio.netlify.app/privacy"
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:image"
    content="https://hassan-khan-portfolio.netlify.app/og-image.png"
  />

  {/* Twitter Meta */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Privacy Policy | ExpenseTracker" />
  <meta
    name="twitter:description"
    content="Read the privacy policy of ExpenseTracker to see how your data is secured and protected."
  />
  <meta
    name="twitter:image"
    content="https://hassan-khan-portfolio.netlify.app/og-image.png"
  />
</Helmet>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <div className="w-20 h-1 bg-indigo-600 dark:bg-purple-500 mx-auto"></div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <p className="mb-6">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="mb-4">
              ExpenseTracker ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              2. Data We Collect
            </h2>
            <p className="mb-2">We may collect the following information:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Personal identification information (Name, email address, etc.)</li>
              <li>Financial transaction data you choose to track</li>
              <li>Device and usage information (IP address, browser type, etc.)</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              3. How We Use Your Data
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              4. Data Protection
            </h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit and at rest.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              5. Third-Party Services
            </h2>
            <p className="mb-4">
              We may employ third-party companies and individuals to facilitate our service ("Service Providers"). These third parties have access to your personal data only to perform these tasks and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              6. Your Data Rights
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Access, update or delete your information</li>
              <li>Rectify inaccurate or incomplete data</li>
              <li>Object to our processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request portability of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              7. Changes to This Policy
            </h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              8. Contact Us
            </h2>
            <p className="mb-2">
              If you have any questions about this Privacy Policy, feel free to contact me:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: <a href="mailto:khandaulathassankhan@gmail.com" className="text-indigo-600 dark:text-purple-400 hover:underline">khandaulathassankhan@gmail.com</a></li>
              <li>Portfolio: <a href="https://hassan-khan-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-purple-400 hover:underline">hassankhanportfolio.netlify.app</a></li>
            </ul>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;

