import React, { useState } from 'react';

const ToggleButton = ({ options = ['Customer', 'Provider'], defaultOption = 0, onToggle }) => {
  const [activeOption, setActiveOption] = useState(defaultOption);

  const handleToggle = (index) => {
    setActiveOption(index);
    if (onToggle) {
      onToggle(index);
    }
  };

  return (
    <div className="w-full bg-gray-100 p-2 rounded-full flex">
      {options.map((option, index) => (
        <button
          key={index}
          className={`flex-1 py-2  text-center rounded-full transition-all duration-200 ${
            activeOption === index
              ? 'bg-white text-black font-medium shadow-sm'
              : 'text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => handleToggle(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ToggleButton;