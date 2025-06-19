import React, { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, ArrowRight } from 'lucide-react';

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
        <div className="w-full h-full flex items-center justify-center bg-[#181926]">
            <div className="flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-[#23243a]">
                {/* Left: Movie Poster */}
                <div className="hidden md:block w-1/2 bg-black">
                    <img
                        src="https://img.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg?semt=ais_items_boosted&w=740"
                        alt="Movie Poster"
                        className="object-cover w-full h-full rounded-l-2xl"
                    />
                </div>
                {/* Right: Sign Up Form */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-[#23243a]">
                    <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
                    <p className="text-gray-400 mb-8">Sign up to book your next movie experience</p>
                    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
                        {/* Name field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <UserPlus className="w-5 h-5" />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    aria-describedby="name-error"
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#23243a] border ${errors.name ? 'border-red-500' : 'border-gray-600'} text-gray-100 focus:outline-none focus:border-red-500 transition placeholder-gray-500`}
                                />
                            </div>
                            {errors.name && <div id="name-error" className="text-red-500 text-sm mt-1">{errors.name[0]}</div>}
                        </div>
                        {/* Email field */}
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
                                    aria-describedby="email-error"
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#23243a] border ${errors.email ? 'border-red-500' : 'border-gray-600'} text-gray-100 focus:outline-none focus:border-red-500 transition placeholder-gray-500`}
                                />
                            </div>
                            {errors.email && <div id="email-error" className="text-red-500 text-sm mt-1">{errors.email[0]}</div>}
                        </div>
                        {/* Password field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    aria-describedby="password-error"
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#23243a] border ${errors.password ? 'border-red-500' : 'border-gray-600'} text-gray-100 focus:outline-none focus:border-red-500 transition placeholder-gray-500`}
                                />
                            </div>
                            {errors.password && <div id="password-error" className="text-red-500 text-sm mt-1">{errors.password[0]}</div>}
                        </div>
                        {/* Confirm Password field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                    <Lock className="w-5 h-5" />
                                </span>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="Confirm Password"
                                    value={form.password_confirmation}
                                    onChange={handleChange}
                                    required
                                    aria-describedby="password_confirmation-error"
                                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#23243a] border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-600'} text-gray-100 focus:outline-none focus:border-red-500 transition placeholder-gray-500`}
                                />
                            </div>
                            {errors.password_confirmation && <div id="password_confirmation-error" className="text-red-500 text-sm mt-1">{errors.password_confirmation[0]}</div>}
                        </div>
                        {/* General error */}
                        {errors.general && <div className="text-red-500 text-sm mb-2">{errors.general}</div>}
                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg shadow-md hover:from-red-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span>Signing Up...</span>
                                    <ArrowRight className="w-5 h-5 animate-spin" />
                                </>
                            ) : (
                                <>
                                    <span>Sign Up</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>
                    <div className="mt-8 text-center">
                        <span className="text-gray-400">Already have an account? </span>
                        <a href="/signin" className="text-red-400 font-semibold hover:underline">Sign in</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
