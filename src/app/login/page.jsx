'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ChefHat, Github, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { localUrl } from '../components/Url';

const LoginPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role:'customer',
        rememberMe: false
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiPath = formData.role; 
        if (!validateForm()) return;
    
        setIsLoading(true);
        try {
            const res = await fetch(`${localUrl}/api/${apiPath}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with your authentication token
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
            const req = await res.json();
            if (!res.ok) {
                alert('Login error: ' + req.message);
                console.log('Login error: ' + req.message);
                return;
            }
            // Set JWT token in local storage
            localStorage.setItem('token', req.token);
            localStorage.setItem('userRole', formData.role.toLowerCase()); // Store user role
            alert("Login successful!");
            // Redirect to dashboard page
            router.push('/');
            return;
        } catch (error) {
            console.error('Login error:', error);
            alert("Internal error: " + error.message);
            return;
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // For checkbox inputs, use the checked property
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        }
        // For select input (role)
        else if (name === 'role') {
            setFormData(prev => ({
                ...prev,
                [name]: value.toLowerCase() // Store role in lowercase
            }));
        }
        // For all other inputs (email, password)
        else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    
        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    

    return (
        <div className="flex justify-center items-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <div className="space-y-8 bg-white shadow-lg p-8 rounded-2xl w-full max-w-md">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center items-center bg-yellow-500 mx-auto rounded-xl w-12 h-12">
                        <ChefHat className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="mt-6 font-extrabold text-3xl text-gray-900">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-gray-600 text-sm">
                        Please sign in to your account
                    </p>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                    <button
                        type="button"
                        className="flex justify-center items-center border-gray-300 bg-white hover:bg-gray-50 shadow-sm px-4 py-2 border rounded-lg w-full font-medium text-gray-700 text-sm transition-colors"
                    >
                        <img
                            className="mr-2 w-5 h-5"
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                        />
                        Continue with Google
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="border-gray-300 border-t w-full" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Login Form */}
                <form className="space-y-6 mt-8" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Role Selection */}
                        <div>
                            <label
                                htmlFor="role"
                                className="block font-medium text-gray-700 text-sm"
                            >
                                Login as
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="block border-gray-300 focus:border-yellow-500 shadow-sm mt-1 px-3 py-2 border rounded-lg focus:ring-yellow-500 w-full focus:outline-none"
                            >
                                <option value="customer">Customer</option>
                                <option value="staff">Staff</option>
                                <option value="owner">Owner</option>
                            </select>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block font-medium text-gray-700 text-sm"
                            >
                                Email address
                            </label>
                            <div className="relative mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'
                                        } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                                    placeholder="you@example.com"
                                />
                                <Mail className="top-2.5 right-3 absolute w-5 h-5 text-gray-400" />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-red-600 text-sm">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block font-medium text-gray-700 text-sm"
                            >
                                Password
                            </label>
                            <div className="relative mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'
                                        } rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="right-0 absolute inset-y-0 flex items-center pr-3"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-red-600 text-sm">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="rememberMe"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                                className="border-gray-300 rounded focus:ring-yellow-500 w-4 h-4 text-yellow-600"
                            />
                            <label
                                htmlFor="remember-me"
                                className="block ml-2 text-gray-900 text-sm"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link
                                href="/forgot-password"
                                className="font-medium text-yellow-600 hover:text-yellow-500"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex justify-center bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 shadow-sm px-4 py-2 border border-transparent rounded-lg focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 w-full font-medium text-sm text-white focus:outline-none transition-colors disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <svg
                                    className="mr-3 -ml-1 w-5 h-5 text-white animate-spin"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Signing in...
                            </div>
                        ) : (
                            'Sign in'
                        )}
                    </button>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <Link
                                href="/signup"
                                className="font-medium text-yellow-600 hover:text-yellow-500"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;