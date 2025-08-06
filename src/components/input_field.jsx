import React, { useState } from "react";
import Button from "../components/button";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  required = false,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full py-3 px-4 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
      />
    </div>
  );
};
