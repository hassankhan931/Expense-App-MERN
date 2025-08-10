import React, { useState } from 'react';
import { Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { FiChevronDown, FiRefreshCw } from 'react-icons/fi';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ transactions = [], currency = "$" }) => {
  const [viewMode, setViewMode] = useState('doughnut');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // ✅ Fixed: added missing parenthesis
  if (!Array.isArray(transactions)) {
    return <div className="p-4 text-red-500">Invalid transaction data</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 glass-pane rounded-xl">
        <div className="flex items-center justify-center w-24 h-24 mb-4 rounded-full bg-gradient-to-r from-blue-100 to-purple-100">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700">No transactions yet</h3>
        <p className="mt-1 text-sm text-gray-500">Add expenses to see visualizations</p>
      </div>
    );
  }

  // Process data
  const { categoryData, totalAmount } = transactions.reduce((acc, transaction) => {
    const amount = Number(transaction.amount) || 0;
    acc.categoryData[transaction.category] = (acc.categoryData[transaction.category] || 0) + amount;
    acc.totalAmount += amount;
    return acc;
  }, { categoryData: {}, totalAmount: 0 });

  const categoryPercentages = {};
  Object.keys(categoryData).forEach(category => {
    categoryPercentages[category] = Math.round((categoryData[category] / totalAmount) * 100);
  });

  // Generate dynamic colors
  const generateColors = (keys) => {
    return keys.map((_, i) => {
      const hue = (i * (360 / keys.length)) % 360;
      return selectedCategory === keys[i]
        ? `hsl(${hue}, 90%, 45%)`
        : `hsl(${hue}, 80%, 65%)`;
    });
  };

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [{
      data: Object.values(categoryData),
      backgroundColor: generateColors(Object.keys(categoryData)),
      borderWidth: 0,
      cutout: viewMode === 'doughnut' ? '75%' : '0%',
      borderRadius: 8,
      spacing: 2,
      hoverOffset: 12,
      borderColor: 'rgba(255,255,255,0.2)'
    }]
  };

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleChartHover = (event, elements) => {
    if (elements.length > 0) {
      setSelectedCategory(chartData.labels[elements[0].index]);
    } else {
      setSelectedCategory(null);
    }
  };

  return (
    <div className="p-6 shadow-2xl glass-pane rounded-2xl backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Expense Analytics</h2>
          <p className="text-gray-600">Interactive visualization of your spending</p>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode(viewMode === 'doughnut' ? 'pie' : 'doughnut')}
            className="flex items-center space-x-1 px-3 py-1.5 bg-white/50 hover:bg-white/70 rounded-lg text-sm font-medium transition-all"
          >
            <span>{viewMode === 'doughnut' ? 'Pie View' : 'Doughnut View'}</span>
            <FiChevronDown className="transition-transform transform" />
          </button>

          <button
            onClick={triggerAnimation}
            className="p-1.5 bg-white/50 hover:bg-white/70 rounded-lg transition-all"
            disabled={isAnimating}
          >
            <FiRefreshCw className={`w-5 h-5 ${isAnimating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Chart + List */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="relative h-80">
            {viewMode === 'doughnut' ? (
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      enabled: !selectedCategory,
                      backgroundColor: 'rgba(0,0,0,0.85)',
                      bodyColor: '#fff',
                      padding: 12,
                      cornerRadius: 8,
                      displayColors: false,
                      callbacks: {
                        label: (ctx) =>
                          `${ctx.label}: ${currency}${ctx.raw.toFixed(2)} (${categoryPercentages[ctx.label]}%)`
                      }
                    }
                  },
                  onHover: handleChartHover,
                  onClick: (e, elements) => {
                    if (elements.length > 0) {
                      setSelectedCategory(prev =>
                        prev === chartData.labels[elements[0].index]
                          ? null
                          : chartData.labels[elements[0].index]
                      );
                    }
                  },
                  animation: {
                    animateScale: isAnimating,
                    animateRotate: isAnimating
                  },
                  cutout: '75%'
                }}
              />
            ) : (
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      enabled: !selectedCategory,
                      backgroundColor: 'rgba(0,0,0,0.85)',
                      bodyColor: '#fff',
                      padding: 12,
                      cornerRadius: 8,
                      displayColors: false,
                      callbacks: {
                        label: (ctx) =>
                          `${ctx.label}: ${currency}${ctx.raw.toFixed(2)} (${categoryPercentages[ctx.label]}%)`
                      }
                    }
                  },
                  onHover: handleChartHover,
                  onClick: (e, elements) => {
                    if (elements.length > 0) {
                      setSelectedCategory(prev =>
                        prev === chartData.labels[elements[0].index]
                          ? null
                          : chartData.labels[elements[0].index]
                      );
                    }
                  },
                  animation: {
                    animateScale: isAnimating,
                    animateRotate: isAnimating
                  }
                }}
              />
            )}

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-gray-800">
                  {selectedCategory
                    ? `${categoryPercentages[selectedCategory]}%`
                    : `${currency}${totalAmount.toFixed(2)}`}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {selectedCategory || 'Total Expenses'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Category Breakdown</h3>
            <span className="text-xs text-gray-500">{transactions.length} transactions</span>
          </div>

          <div className="pr-2 space-y-3 overflow-y-auto max-h-80">
            {Object.entries(categoryData)
              .sort((a, b) => b[1] - a[1])
              .map(([category, amount]) => (
                <div
                  key={category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    selectedCategory === category ? 'bg-white shadow-md' : 'bg-white/50 hover:bg-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 mr-3 rounded-full"
                        style={{
                          backgroundColor:
                            chartData.datasets[0].backgroundColor[chartData.labels.indexOf(category)]
                        }}
                      />
                      <span className="font-medium">{category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {currency}{amount.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">{categoryPercentages[category]}%</div>
                    </div>
                  </div>
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${categoryPercentages[category]}%`,
                        backgroundColor:
                          chartData.datasets[0].backgroundColor[chartData.labels.indexOf(category)]
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .glass-pane {
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        .chartjs-render-monitor {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default ExpenseChart;
