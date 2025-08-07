import React from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-200px)] bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
      <Helmet>
        <title>Terms of Service | ExpenseTracker</title>
        <meta
          name="description"
          content="Read the Terms of Service for ExpenseTracker, developed by Hassan Khan. Understand your rights and responsibilities as a user."
        />
        <meta
          name="keywords"
          content="terms of service, user agreement, Hassan Khan, ExpenseTracker terms, finance app legal"
        />
        <meta name="author" content="Hassan Khan" />
        <link
          rel="canonical"
          href="https://hassan-khan-portfolio.netlify.app/terms"
        />

        {/* Open Graph (Facebook, LinkedIn) */}
        <meta property="og:title" content="Terms of Service | ExpenseTracker" />
        <meta
          property="og:description"
          content="Review the terms that govern your use of ExpenseTracker, built by Hassan Khan."
        />
        <meta
          property="og:url"
          content="https://hassan-khan-portfolio.netlify.app/terms"
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
          content="Terms of Service | ExpenseTracker"
        />
        <meta
          name="twitter:description"
          content="Understand your rights and obligations as a user of ExpenseTracker."
        />
        <meta
          name="twitter:image"
          content="https://hassan-khan-portfolio.netlify.app/og-image.png"
        />
      </Helmet>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Terms of Service
          </h1>
          <div className="w-20 h-1 bg-indigo-600 dark:bg-purple-500 mx-auto"></div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <p className="mb-6">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing or using ExpenseTracker ("the Service"), you agree to
              be bound by these Terms of Service and our Privacy Policy. If you
              disagree with any part of the terms, you may not access the
              Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              2. User Responsibilities
            </h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>You must be at least 13 years old to use this Service</li>
              <li>
                You are responsible for maintaining the confidentiality of your
                account
              </li>
              <li>You agree not to use the Service for any unlawful purpose</li>
              <li>
                You are responsible for all activities that occur under your
                account
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              3. Service Modifications
            </h2>
            <p className="mb-4">
              We reserve the right to modify or discontinue, temporarily or
              permanently, the Service (or any part thereof) with or without
              notice. We shall not be liable to you or any third party for any
              modification, suspension, or discontinuance of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              4. Limitation of Liability
            </h2>
            <p className="mb-4">
              In no event shall ExpenseTracker, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              5. Governing Law
            </h2>
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the
              laws of the State of California, United States, without regard to
              its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              6. Changes to Terms
            </h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. We will provide at least 30 days' notice
              prior to any new terms taking effect. By continuing to access or
              use our Service after those revisions become effective, you agree
              to be bound by the revised terms.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you have any questions about these Terms, please contact me at{" "}
            <a
              href="mailto:khandaulathassankhan@gmail.com"
              className="text-indigo-600 dark:text-purple-400 hover:underline"
            >
              khandaulathassankhan@gmail.com
            </a>{" "}
            or visit{" "}
            <a
              href="https://hassan-khan-portfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-purple-400 hover:underline"
            >
              https://hassan-khan-portfolio.netlify.app/
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsOfService;
