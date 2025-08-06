import React from 'react';
import { LineChart, Line, XAxis } from 'recharts';
import { useNavigate } from "react-router-dom";

const ProviderProfile = () => {
  // Sample data for the chart

  const navigate = useNavigate();

  const chartData = [
    { name: 'Jan', value: 40 },
    { name: 'Feb', value: 30 },
    { name: 'Mar', value: 45 },
    { name: 'Apr', value: 50 },
    { name: 'May', value: 35 },
    { name: 'Jun', value: 60 },
    { name: 'Jul', value: 25 },
  ];

  // Rating data
  const ratings = [
    { stars: 5, percentage: 70 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white pb-16">
      <div className="text-center pt-4 pb-2 border-b">
        <h1 className="text-center text-2xl font-bold mb-9">Provider Profile</h1>
      </div>

      <div className="flex flex-col items-center px-4 pt-5 pb-4">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 mb-3">
          <img src="https://via.placeholder.com/80" alt="Provider" />
        </div>
        <h1 className="text-xl font-bold">Ethan Carter</h1>
        <p className="text-gray-500 text-sm">Professional Plumber</p>

        <button 
          className="mt-3 px-4 py-1.5 border border-black rounded-full text-sm"
          onClick={() => navigate('/provider/availability')}
        >
          Update Availability
        </button>
      </div>

      {/* Salary Growth Section */}
      <div className="px-4 py-3 border-t border-b">
        <p className="text-sm font-medium">Salary Growth</p>
        <div className="flex items-baseline">
          <p className="text-2xl font-bold text-green-600">+15%</p>
        </div>
        <p className="text-xs text-gray-500">
          Last 12 Months <span className="text-green-600">+15%</span>
        </p>

        {/* Chart */}
        <div className="h-20 mt-2">
          <LineChart width={320} height={80} data={chartData}>
            <XAxis dataKey="name" hide={true} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#84b3a8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>7d</span>
          <span>1M</span>
          <span>3M</span>
          <span>YY</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 px-4 py-3 border-b">
        <div>
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="text-lg font-bold">$12,500</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Job Completion Rate</p>
          <p className="text-lg font-bold">95%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 py-3 border-b">
        <div>
          <p className="text-sm text-gray-500">Total Reviews</p>
          <p className="text-lg font-bold">120</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average Rating</p>
          <p className="text-lg font-bold">4.8</p>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="px-4 py-3">
        <div className="flex items-center mb-3">
          <p className="text-2xl font-bold mr-2">4.8</p>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${
                  star <= 4 ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {ratings.map((rating) => (
          <div key={rating.stars} className="flex items-center mb-1.5">
            <span className="w-3 text-xs text-gray-600">{rating.stars}</span>
            <div className="w-full bg-gray-200 rounded-full h-2 mx-2">
              <div
                className="bg-black h-2 rounded-full"
                style={{ width: `${rating.percentage}%` }}
              ></div>
            </div>
            <span className="w-8 text-xs text-gray-600 text-right">
              {rating.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderProfile;