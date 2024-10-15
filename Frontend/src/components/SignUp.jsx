import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    whatsappNumber: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to validate password
  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const hasAlphabet = /[a-zA-Z]/.test(password); // Checks for alphabets
    const hasNumber = /\d/.test(password); // Checks for digits
    return lengthCheck && hasAlphabet && hasNumber;
  };

  // Function to validate phone numbers (both phone and WhatsApp)
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+91\d{10}$/; // Matches +91 followed by exactly 10 digits
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors

    // Validate password
    if (!validatePassword(formData.password)) {
      setErrorMessage('Password must be at least 8 characters long and contain both alphabets and numbers.');
      return;
    }

    // Validate both phone and WhatsApp number
    if (!validatePhoneNumber(formData.phone) || !validatePhoneNumber(formData.whatsappNumber)) {
      setErrorMessage('Both Phone number and WhatsApp number must follow the format +91XXXXXXXXXX.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/users/signup', formData);
      console.log('Signup response:', response.data);
      navigate('/'); // Redirect on successful signup
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message); // Display error from backend
      } else {
        setErrorMessage('An error occurred during signup');
      }
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        {/* Username and Email in one row */}
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="landlord">Landlord</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        {/* Phone and WhatsApp Number in one row */}
        <div className="mb-6 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 mb-2" htmlFor="whatsappNumber">WhatsApp Number</label>
            <input
              type="tel"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
