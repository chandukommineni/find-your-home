import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import {useDispatch} from "react-redux"
import {setUser} from "../store/userSlice"
import { toast } from "react-toastify";
const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin =async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', formData);
      console.log('Login response:', response.data);
      dispatch(setUser(response.data.user))
      toast.success("login successfull")
      // navigate('/dashboard'); // Redirect on successful login
      navigate("/home")
    } catch (error) {
      toast.error("Login Failed Please Enter Valid credentials")
      console.error('Login error:', error);
    }
    
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    navigate("/signup")
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Email Field */}
        <div className="mb-4">
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

        {/* Password Field */}
        <div className="mb-6">
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

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 mr-2"
          >
            Login
          </button>
          <button
            onClick={handleRegister}
            className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200 ml-2"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default Login;
