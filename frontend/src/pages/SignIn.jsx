import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Film } from 'lucide-react';
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#1c1c1c]">
      {/* Cinema-themed background decorations (optional) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Subtle spotlights or film grain could go here if desired */}
      </div>
      <div className="relative z-10 w-full flex justify-center">
        {/* Distinct, floating card */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-400/30 px-16 py-14 flex flex-col items-center" style={{boxShadow: '0 8px 40px 0 rgba(0,0,0,0.45)'}}>
          {/* Logo/Icon */}
          <div className="mb-8 flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-300">
              <Film className="w-14 h-14 text-white" />
            </div>
            <span className="mt-4 text-yellow-400 font-extrabold tracking-widest text-2xl uppercase">CineBook</span>
          </div>
          {/* Tagline */}
          <h1 className="text-5xl font-extrabold text-white mb-4 text-center font-cinzel tracking-tight">Welcome Back</h1>
          <p className="text-gray-200 text-xl mb-12 text-center">Sign in to book your next movie night</p>
          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-8">
            {/* Email field */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-yellow-200 block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Mail className="h-7 w-7 text-yellow-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-16 pr-6 py-4 bg-white/10 border-2 border-yellow-700 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder-yellow-300 text-yellow-100 text-lg backdrop-blur-md"
                />
              </div>
            </div>
            {/* Password field */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-yellow-200 block">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Lock className="h-7 w-7 text-yellow-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-16 pr-16 py-4 bg-white/10 border-2 border-yellow-700 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder-yellow-300 text-yellow-100 text-lg backdrop-blur-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-6 flex items-center text-yellow-400 hover:text-yellow-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-7 w-7" /> : <Eye className="h-7 w-7" />}
                </button>
              </div>
            </div>
            {/* Error message */}
            {error && (
              <div className="bg-red-900/80 border border-red-700 text-red-200 px-6 py-4 rounded-xl text-lg animate-in slide-in-from-top-2 duration-300">
                {error}
              </div>
            )}
            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-gray-900 font-extrabold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 text-2xl"
            >
              {isLoading ? (
                <>
                  <div className="w-7 h-7 border-2 border-yellow-300/30 border-t-yellow-300 rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-7 h-7" />
                </>
              )}
            </button>
            {/* Forgot password */}
            <div className="text-center">
              <a
                href="/forgot-password"
                className="text-lg text-yellow-400 hover:text-yellow-200 transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          </form>
          {/* Divider */}
          <div className="my-12 flex items-center">
            <div className="flex-1 border-t border-yellow-800"></div>
            <span className="px-6 text-lg text-yellow-300 bg-transparent">or</span>
            <div className="flex-1 border-t border-yellow-800"></div>
          </div>
          {/* Sign up link */}
          <div className="text-center">
            <p className="text-yellow-200 text-lg">
              Don't have an account?{' '}
              <a
                href="/signup"
                className="font-extrabold text-yellow-400 hover:text-yellow-200 transition-colors"
              >
                Create one now
              </a>
            </p>
          </div>
          {/* Footer text */}
          <p className="text-md text-yellow-300 text-center mt-12">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
