import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProviderAvailability = () => {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [vacationMode, setVacationMode] = useState(false);

  // Get current date and calculate one month ahead
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Generate calendar data
  const generateCalendarDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    // Create array for days of the month
    const days = [];

    // Add empty spaces for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const currentMonthDays = generateCalendarDays(currentYear, currentMonth);
  const nextMonthDays = generateCalendarDays(
    currentMonth === 11 ? currentYear + 1 : currentYear,
    currentMonth === 11 ? 0 : currentMonth + 1
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateClick = (date) => {
    if (!date) return; // Don't handle clicks on empty cells

    if (!fromDate || (fromDate && toDate)) {
      // Start a new selection
      setFromDate(date);
      setToDate(null);
    } else {
      // Complete the selection
      // Ensure toDate is after fromDate
      if (date < fromDate) {
        setToDate(fromDate);
        setFromDate(date);
      } else {
        setToDate(date);
      }
    }
  };

  const isSelectedDate = (date) => {
    if (!date) return false;

    // Check if this is the fromDate
    if (fromDate && date.getTime() === fromDate.getTime()) {
      return "from";
    }

    // Check if this is the toDate
    if (toDate && date.getTime() === toDate.getTime()) {
      return "to";
    }

    // Check if this date is in the range
    if (fromDate && toDate && date > fromDate && date < toDate) {
      return "between";
    }

    return false;
  };

  const handleBack = () => {
    navigate("/provider/profile");
  };

  const handleSave = () => {
    // Format dates for display/API
    const formattedFrom = fromDate
      ? `${fromDate.getFullYear()}-${(fromDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${fromDate.getDate().toString().padStart(2, "0")}`
      : "";

    const formattedTo = toDate
      ? `${toDate.getFullYear()}-${(toDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${toDate.getDate().toString().padStart(2, "0")}`
      : "";

    console.log(
      "Saving availability with range:",
      formattedFrom,
      "to",
      formattedTo
    );
    navigate("/provider/profile");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 flex items-center border-b">
        <button onClick={handleBack} className="mr-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h1 className="text-xl font-medium">Availability</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Date Range Selection Info */}
        <div className="bg-blue-50 p-3 mb-4 rounded-lg">
          <p className="text-sm text-blue-800">
            Select a start date and end date for your availability.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mr-1"></div>
              <span className="text-xs">From</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-1"></div>
              <span className="text-xs">To</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-200 rounded-sm mr-1"></div>
              <span className="text-xs">In between</span>
            </div>
          </div>
          {fromDate && (
            <p className="text-xs mt-2">
              From: {fromDate.toLocaleDateString()}
              {toDate ? ` To: ${toDate.toLocaleDateString()}` : ""}
            </p>
          )}
        </div>

        {/* Current Month */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-medium">
              {monthNames[currentMonth]} {currentYear}
            </h2>
          </div>

          <div className="grid grid-cols-7 mb-1 text-center text-xs text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {currentMonthDays.map((date, index) =>
              date ? (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`
                    aspect-square p-2 text-center text-sm rounded-full
                    ${date < today ? "text-gray-300 cursor-not-allowed" : ""}
                    ${
                      isSelectedDate(date) === "from"
                        ? "bg-blue-500 text-white"
                        : ""
                    }
                    ${
                      isSelectedDate(date) === "to"
                        ? "bg-green-500 text-white"
                        : ""
                    }
                    ${isSelectedDate(date) === "between" ? "bg-blue-200" : ""}
                  `}
                  disabled={date < today}
                >
                  {date.getDate()}
                </button>
              ) : (
                <div key={index} className="aspect-square"></div>
              )
            )}
          </div>
        </div>

        {/* Next Month */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-medium">
              {monthNames[(currentMonth + 1) % 12]}{" "}
              {currentMonth === 11 ? currentYear + 1 : currentYear}
            </h2>
          </div>

          <div className="grid grid-cols-7 mb-1 text-center text-xs text-gray-500">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {nextMonthDays.map((date, index) =>
              date ? (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`
                    aspect-square p-2 text-center text-sm rounded-full
                    ${
                      isSelectedDate(date) === "from"
                        ? "bg-blue-500 text-white"
                        : ""
                    }
                    ${
                      isSelectedDate(date) === "to"
                        ? "bg-green-500 text-white"
                        : ""
                    }
                    ${isSelectedDate(date) === "between" ? "bg-blue-200" : ""}
                  `}
                >
                  {date.getDate()}
                </button>
              ) : (
                <div key={index} className="aspect-square"></div>
              )
            )}
          </div>
        </div>

        {/* Recurring Availability */}
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Recurring Availability</h2>
          <div className="flex justify-between items-center p-3 bg-white border rounded-lg mb-2">
            <div>
              <p className="font-medium">Weekly Schedule</p>
              <p className="text-sm text-gray-500">
                Every Tuesday and Thursday
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Vacation/Blackout Periods */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-2">
            Vacation/Blackout Periods
          </h2>

          {/* Vacation Mode Toggle */}
          <div className="flex justify-between items-center p-3 bg-white border rounded-lg mb-2">
            <div>
              <p className="font-medium">Vacation Mode</p>
              <p className="text-sm text-gray-500">No bookings accepted</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={vacationMode}
                onChange={() => setVacationMode(!vacationMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>

          {/* Blackout Dates */}
          <div className="flex justify-between items-center p-3 bg-white border rounded-lg">
            <div>
              <p className="font-medium">Blackout Dates</p>
              <p className="text-sm text-gray-500">No bookings accepted</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="p-4 pb-24">
        <button
          onClick={handleSave}
          className="bg-black text-white w-full py-3 rounded-full font-medium"
        >
          Save Availability
        </button>
      </div>
    </div>
  );
};

export default ProviderAvailability;
