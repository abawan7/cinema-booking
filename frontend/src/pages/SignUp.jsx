import React, { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';

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
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
            <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Sign Up</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
                <div style={{ marginBottom: 16 }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        aria-describedby="name-error"
                        style={{ width: '100%', padding: 8, marginBottom: 4, borderRadius: 4, border: '1px solid #ccc' }}
                        autoFocus
                    />
                    {errors.name && <div id="name-error" style={{ color: 'red', fontSize: 13 }}>{errors.name[0]}</div>}
                </div>
                <div style={{ marginBottom: 16 }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        aria-describedby="email-error"
                        style={{ width: '100%', padding: 8, marginBottom: 4, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                    {errors.email && <div id="email-error" style={{ color: 'red', fontSize: 13 }}>{errors.email[0]}</div>}
                </div>
                <div style={{ marginBottom: 16 }}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        aria-describedby="password-error"
                        style={{ width: '100%', padding: 8, marginBottom: 4, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                    {errors.password && <div id="password-error" style={{ color: 'red', fontSize: 13 }}>{errors.password[0]}</div>}
                </div>
                <div style={{ marginBottom: 16 }}>
                    <input
                        type="password"
                        name="password_confirmation"
                        placeholder="Confirm Password"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        required
                        aria-describedby="password_confirmation-error"
                        style={{ width: '100%', padding: 8, marginBottom: 4, borderRadius: 4, border: '1px solid #ccc' }}
                    />
                    {errors.password_confirmation && <div id="password_confirmation-error" style={{ color: 'red', fontSize: 13 }}>{errors.password_confirmation[0]}</div>}
                </div>
                {errors.general && <div style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{errors.general}</div>}
                <button
                    type="submit"
                    style={{ width: '100%', padding: 10, borderRadius: 4, border: 'none', background: '#646cff', color: '#fff', fontWeight: 600, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer' }}
                    disabled={loading}
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
            </form>
            <p style={{ marginTop: 16, textAlign: 'center' }}>
                Already have an account? <a href="/signin">Sign In</a>
            </p>
        </div>
    );
}
