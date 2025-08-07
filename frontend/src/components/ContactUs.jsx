import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async'; // Or 'react-helmet' if you're using that

const ContactUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-[calc(100vh-200px)] bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8"
    >
      <Helmet>
  <title>Contact Us | ExpenseTracker</title>
  <meta
    name="description"
    content="Need help or have questions? Contact Hassan Khan for support related to ExpenseTracker. We’re here to help!"
  />
  <meta
    name="keywords"
    content="Contact Hassan Khan, ExpenseTracker support, get help, email ExpenseTracker, contact page"
  />
  <meta name="author" content="Hassan Khan" />
  <link
    rel="canonical"
    href="https://hassan-khan-portfolio.netlify.app/contact"
  />

  {/* Open Graph */}
  <meta property="og:title" content="Contact Us | ExpenseTracker" />
  <meta
    property="og:description"
    content="Need help with ExpenseTracker? Contact Hassan Khan through this page."
  />
  <meta
    property="og:url"
    content="https://hassan-khan-portfolio.netlify.app/contact"
  />
  <meta property="og:type" content="website" />
  <meta
    property="og:image"
    content="https://hassan-khan-portfolio.netlify.app/og-image.png"
  />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Contact Us | ExpenseTracker" />
  <meta
    name="twitter:description"
    content="Questions or feedback? Reach out to Hassan Khan through the ExpenseTracker contact page."
  />
  <meta
    name="twitter:image"
    content="https://hassan-khan-portfolio.netlify.app/og-image.png"
  />
</Helmet>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Contact Us</h1>

        <div className="space-y-6 text-gray-600 dark:text-gray-300">
          <p>
            If you have any questions or feedback about ExpenseTracker, feel free to get in touch using the options below.
          </p>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-purple-900/50 rounded-lg p-3">
                <svg className="h-6 w-6 text-indigo-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Email Support</h3>
                <p className="mt-1">
                  <a href="mailto:khandaulathassankhan@gmail.com" className="text-indigo-600 dark:text-purple-400 hover:underline">
                    khandaulathassankhan@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-purple-900/50 rounded-lg p-3">
                <svg className="h-6 w-6 text-indigo-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Phone Support</h3>
                <p className="mt-1">+92 335 4232380</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monday - Friday, 9am - 6pm PKT</p>
              </div>
            </div>

            {/* Live Location */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-purple-900/50 rounded-lg p-3">
                <svg className="h-6 w-6 text-indigo-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">Live Location</h3>
                <p className="mt-1">
                  <a
                    href="https://www.google.com/maps/place/Sabzazar+Lahore/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-purple-400 hover:underline"
                  >
                    Sabzazar, Lahore, Pakistan
                  </a>
                </p>
              </div>
            </div>

            {/* Portfolio */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-indigo-100 dark:bg-purple-900/50 rounded-lg p-3">
                <svg className="h-6 w-6 text-indigo-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">My Portfolio</h3>
                <p className="mt-1">
                  <a
                    href="https://hassan-khan-portfolio.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-purple-400 hover:underline"
                  >
                    hassankhanportfolio.netlify.app
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUs;
