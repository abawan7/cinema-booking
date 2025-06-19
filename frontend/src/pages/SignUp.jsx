import React, { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, ArrowRight, Film } from 'lucide-react';

export default function SignUp() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        try {
            await register(form);
            setForm({
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            });
            setLoading(false);
            navigate('/signin');
        } catch (err) {
            setLoading(false);
            if (err?.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: err?.response?.data?.message || 'Registration failed' });
            }
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#1c1c1c]">
            <div className="absolute inset-0 pointer-events-none select-none z-0"></div>
            <div className="relative z-10 w-full flex justify-center">
                <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-400/30 px-16 py-14 flex flex-col items-center" style={{boxShadow: '0 8px 40px 0 rgba(0,0,0,0.45)'}}>
                    {/* Logo/Icon */}
                    <div className="mb-8 flex flex-col items-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-300">
                            <UserPlus className="w-14 h-14 text-white" />
                        </div>
                        <span className="mt-4 text-yellow-400 font-extrabold tracking-widest text-2xl uppercase">CineBook</span>
                    </div>
                    {/* Tagline */}
                    <h1 className="text-5xl font-extrabold text-white mb-4 text-center font-cinzel tracking-tight">Create Account</h1>
                    <p className="text-gray-200 text-xl mb-12 text-center">Sign up to book your next movie experience</p>
                    <form onSubmit={handleSubmit} autoComplete="off" className="w-full max-w-lg mx-auto space-y-8">
                        {/* Name field */}
                        <div className="space-y-2">
                            <label className="text-lg font-semibold text-yellow-200 block">Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <UserPlus className="h-7 w-7 text-yellow-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    aria-describedby="name-error"
                                    className="w-full pl-16 pr-6 py-4 bg-white/10 border-2 border-yellow-700 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder-yellow-300 text-yellow-100 text-lg backdrop-blur-md"
                                    autoFocus
                                />
                            </div>
                            {errors.name && <div id="name-error" className="text-red-600 text-xs mt-1">{errors.name[0]}</div>}
                        </div>
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
                                    aria-describedby="email-error"
                                    className="w-full pl-16 pr-6 py-4 bg-white/10 border-2 border-yellow-700 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder-yellow-300 text-yellow-100 text-lg backdrop-blur-md"
                                />
                            </div>
                            {errors.email && <div id="email-error" className="text-red-600 text-xs mt-1">{errors.email[0]}</div>}
                        </div>
                        {/* Password field */}
                        <div className="space-y-2">
                            <label className="text-lg font-semibold text-yellow-200 block">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Lock className="h-7 w-7 text-yellow-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    aria-describedby="password-error"
                                    className="w-full pl-16 pr-6 py-4 bg-white/10 border-2 border-yellow-700 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder-yellow-300 text-yellow-100 text-lg backdrop-blur-md"
                                />
                            </div>
                            {errors.password && <div id="password-error" className="text-red-600 text-xs mt-1">{errors.password[0]}</div>}
                        </div>
                        {/* Confirm Password field */}
                        <div className="space-y-2">
                            <label className="text-lg font-semibold text-yellow-200 block">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Lock className="h-7 w-7 text-yellow-400" />
                                </div>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Confirm your password"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    required
                                    aria-describedby="password_confirmation-error"
                                    className="w-full pl-16 pr-6 py-4 bg-white/10 border-2 border-yellow-700 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 placeholder-yellow-300 text-yellow-100 text-lg backdrop-blur-md"
                                />
                            </div>
                            {errors.password_confirmation && <div id="password_confirmation-error" className="text-red-600 text-xs mt-1">{errors.password_confirmation[0]}</div>}
                        </div>
                        {/* General error */}
                        {errors.general && <div className="bg-red-900/80 border border-red-700 text-red-200 px-6 py-4 rounded-xl text-lg animate-in slide-in-from-top-2 duration-300">{errors.general}</div>}
                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-yellow-400 to-red-500 hover:from-yellow-500 hover:to-red-600 text-gray-900 font-extrabold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 text-2xl"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="w-7 h-7 border-2 border-yellow-300/30 border-t-yellow-300 rounded-full animate-spin"></div>
                                    <span>Signing Up...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign Up</span>
                                    <ArrowRight className="w-7 h-7" />
                                </>
                            )}
                        </button>
                    </form>
                    {/* Sign in link */}
                    <div className="text-center mt-8">
                        <p className="text-yellow-200 text-lg">
                            Already have an account?{' '}
                            <a
                                href="/signin"
                                className="font-extrabold text-yellow-400 hover:text-yellow-200 transition-colors"
                            >
                                Sign In
                            </a>
                        </p>
                    </div>
                    {/* Footer text */}
                    <p className="text-md text-yellow-300 text-center mt-12">
                        By signing up, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
}
