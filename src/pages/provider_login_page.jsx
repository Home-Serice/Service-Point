import React, { useState } from 'react';
import Button from '../components/button';
import { useNavigate } from 'react-router-dom';


const InputField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder,
  name,
  required = false 
}) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
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

const ProviderLoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', formData);
    navigate('/provider/profile'); 
  };

  return (
    <div className="flex flex-col p-4">
      <div className="text-center mb-2">
        <h1 className="text-center text-2xl font-bold">Service Point</h1>
      </div>

 
        <div className="w-24 h-24">
            {/* This is a placeholder for your logo */}
        </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center mb-5">Welcome Back</h1>

          <form onSubmit={handleSubmit}>
            <InputField
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username or Email"
              required
            />

            <InputField
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />

            <div className="text-right mb-5">
              <button type="button" className="text-sm text-gray-600">
                Forgot Password?
              </button>
            </div>

            <Button type="submit" label="Login" variant="primary" fullWidth />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProviderLoginPage;