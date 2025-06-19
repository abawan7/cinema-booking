import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.access_token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center bg-[#181926]">
      <div className="w-full flex items-center justify-center bg-[#181926]">
        <div className="flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-[#23243a]">
          {/* Left: Movie Poster */}
        <div className="hidden md:block w-1/2 bg-black">
          <img
            src="https://img.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg?semt=ais_items_boosted&w=740"
            alt="Movie Poster"
            className="object-cover w-full h-full rounded-l-2xl"
          />
        </div>
        {/* Right: Sign In Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-[#23243a]">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back,</h1>
          <p className="text-gray-400 mb-8">Sign in to your account</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#23243a] border ${error ? 'border-red-500' : 'border-gray-600'} text-gray-100 focus:outline-none focus:border-red-500 transition placeholder-gray-500`}
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-12 py-3 rounded-lg bg-[#23243a] border ${error ? 'border-red-500' : 'border-gray-600'} text-gray-100 focus:outline-none focus:border-red-500 transition placeholder-gray-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {/* Error */}
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            {/* Forgot password */}
            <div className="flex justify-between items-center mb-2">
              <div></div>
              <a href="/forgot-password" className="text-sm text-gray-400 hover:text-red-400 transition">Forgot password?</a>
            </div>
            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg shadow-md hover:from-red-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-8 text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <a href="/signup" className="text-red-400 font-semibold hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
