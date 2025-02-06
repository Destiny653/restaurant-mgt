 'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ChefHat } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Customer',
    salary: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;

      case 2:
        if (formData.role === 'Staff' && (!formData.salary || formData.salary < 0)) {
          newErrors.salary = 'Valid salary is required for staff members';
        }
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;

      case 3:
        if (!formData.agreeToTerms) {
          newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    setSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const submitData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase(),
        password: formData.password,
        role: formData.role,
        ...(formData.role === 'Staff' && { salary: Number(formData.salary) })
      };
      
      console.log('Registration data:', submitData);
      // Add your API call here
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Registration failed. Please try again.'
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="font-medium text-gray-900 text-lg">Personal Information</h3>
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block font-medium text-gray-700 text-sm">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-red-600 text-sm">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block font-medium text-gray-700 text-sm">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-red-600 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block font-medium text-gray-700 text-sm">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="font-medium text-gray-900 text-lg">Account Details</h3>
            
            <div>
              <label htmlFor="role" className="block font-medium text-gray-700 text-sm">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block border-gray-300 focus:border-yellow-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-yellow-500 sm:text-sm"
              >
                <option value="Customer">Customer</option>
                <option value="Staff">Staff</option>
                <option value="Owner">Owner</option>
              </select>
            </div>

            {formData.role === 'Staff' && (
              <div>
                <label htmlFor="salary" className="block font-medium text-gray-700 text-sm">
                  Salary
                </label>
                <input
                  id="salary"
                  name="salary"
                  type="number"
                  min="0"
                  value={formData.salary}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.salary ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm`}
                />
                {errors.salary && (
                  <p className="mt-1 text-red-600 text-sm">{errors.salary}</p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="password" className="block font-medium text-gray-700 text-sm">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full rounded-md border ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 pr-10 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm`}
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
                <p className="mt-1 text-red-600 text-sm">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block font-medium text-gray-700 text-sm">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full rounded-md border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } px-3 py-2 pr-10 shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="right-0 absolute inset-y-0 flex items-center pr-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-red-600 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="font-medium text-gray-900 text-lg">Terms & Conditions</h3>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="border-gray-300 rounded focus:ring-yellow-500 w-4 h-4 text-yellow-600"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="agreeToTerms" className="text-gray-700 text-sm">
                  I agree to the{' '}
                  <Link href="/terms" className="font-medium text-yellow-600 hover:text-yellow-500">
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-600 text-sm">{errors.agreeToTerms}</p>
            )}

            {errors.submit && (
              <div className="text-center text-red-600 text-sm">{errors.submit}</div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col justify-center bg-gray-50 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <ChefHat className="w-12 h-12 text-yellow-500" />
        </div>
        <h2 className="mt-6 font-bold text-3xl text-center text-gray-900 tracking-tight">
          Create your account
        </h2>
        <p className="mt-2 text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-yellow-600 hover:text-yellow-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="sm:mx-auto mt-8 sm:w-full sm:max-w-md">
        <div className="bg-white shadow px-4 sm:px-10 py-8 sm:rounded-lg">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {['Personal Info', 'Account Details', 'Terms'].map((step, index) => (
                <span
                  key={step}
                  className={`text-sm font-medium ${
                    index + 1 <= currentStep ? 'text-yellow-600' : 'text-gray-400'
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 rounded-full h-2 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between space-x-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 border-gray-300 bg-white hover:bg-gray-50 shadow-sm px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 font-medium text-gray-700 text-sm focus:outline-none"
                >
                  Back
                </button>
              )}
              
              <button
                type={currentStep === 3 ? 'submit' : 'button'}
                onClick={currentStep === 3 ? undefined : handleNext}
                disabled={submitting}
                className={`flex-1 rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  submitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
                }`}
              >
                {currentStep === 3
                  ? (submitting ? 'Creating account...' : 'Create Account')
                  : 'Next'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;