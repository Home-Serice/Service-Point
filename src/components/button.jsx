import React from 'react';

const Button = ({ 
  label, 
  onClick, 
  variant = 'primary', 
  className = '',
  fullWidth = false,
  disabled = false,
  type = 'button',
  icon = null
}) => {


  const baseStyles = "font-medium rounded-full transition-colors focus:outline-none";
  
  const variantStyles = {
    primary: "bg-black text-white py-3 px-6 hover:bg-gray-800",
    secondary: "bg-white border border-gray-300 text-gray-800 py-3 px-6 hover:bg-gray-100",
    text: "bg-transparent text-gray-800 py-2 hover:bg-gray-100 hover:text-gray-900"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </div>
    </button>
  );
};

export default Button;