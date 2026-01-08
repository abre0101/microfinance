import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Debre_Markos_University_logo.png';
import registerBg from '../assets/register_pic.webp';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    employee_id: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    department: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const nextStep = () => {
    setError('');
    // Validation for each step
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.phone) {
        setError('Please fill in all personal information fields');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.email || !formData.employee_id || !formData.department) {
        setError('Please fill in all employment information fields');
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setError('');
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    try {
      await register(formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { number: 2, title: 'Employment', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { number: 3, title: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{backgroundImage: `url(${registerBg})`}}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-primary-800/20 to-secondary-900/30"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="bg-white/20 backdrop-blur-sm border-b border-white/30 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-3">
                  <img src={logo} alt="Debre Markos University" className="h-10 w-10" />
                  <div>
                    <span className="text-xl font-bold text-white block drop-shadow-lg">
                      Markos Microfinance
                    </span>
                    <span className="text-xs text-white drop-shadow-md">
                      ማርቆስ ማይክሮፋይናንስ
                    </span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition drop-shadow-md"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Register Form */}
        <div className="min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl w-full mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Progress Steps */}
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-6">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          currentStep >= step.number 
                            ? 'bg-white text-primary-600 shadow-lg scale-110' 
                            : 'bg-white/30 text-white'
                        }`}>
                          {currentStep > step.number ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                            </svg>
                          )}
                        </div>
                        <span className={`mt-2 text-sm font-medium ${
                          currentStep >= step.number ? 'text-white' : 'text-white/60'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-24 h-1 mx-4 rounded transition-all duration-300 ${
                          currentStep > step.number ? 'bg-white' : 'bg-white/30'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 lg:p-12">
                <div className="max-w-2xl mx-auto">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h2>
                    <p className="text-gray-600">Step {currentStep} of 3 - {steps[currentStep - 1].title}</p>
                  </div>

                  {/* Error/Success Messages */}
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6 animate-fadeInUp">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-700 text-sm font-medium">{error}</p>
                      </div>
                    </div>
                  )}
                  
                  {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg mb-6 animate-fadeInUp">
                      <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-green-700 text-sm font-medium">{success}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Personal Information */}
                    {currentStep === 1 && (
                      <div className="space-y-5 animate-fadeInUp">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                              First Name *
                            </label>
                            <input
                              id="firstName"
                              type="text"
                              name="firstName"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="block w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                              Last Name *
                            </label>
                            <input
                              id="lastName"
                              type="text"
                              name="lastName"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="block w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            placeholder="+251 912 345 678"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Employment Information */}
                    {currentStep === 2 && (
                      <div className="space-y-5 animate-fadeInUp">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            University Email *
                          </label>
                          <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="your.name@uni.edu"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="employee_id" className="block text-sm font-semibold text-gray-700 mb-2">
                              Employee ID *
                            </label>
                            <input
                              id="employee_id"
                              type="text"
                              name="employee_id"
                              placeholder="EMP001"
                              value={formData.employee_id}
                              onChange={handleChange}
                              required
                              className="block w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label htmlFor="department" className="block text-sm font-semibold text-gray-700 mb-2">
                              Department *
                            </label>
                            <select
                              id="department"
                              name="department"
                              value={formData.department}
                              onChange={handleChange}
                              required
                              className="block w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="">Select Department</option>
                              <option value="engineering">Engineering</option>
                              <option value="science">Science</option>
                              <option value="arts">Arts</option>
                              <option value="business">Business</option>
                              <option value="education">Education</option>
                              <option value="health">Health Sciences</option>
                              <option value="admin">Administration</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Security */}
                    {currentStep === 3 && (
                      <div className="space-y-5 animate-fadeInUp">
                        <div>
                          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Password *
                          </label>
                          <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          />
                          <p className="mt-2 text-sm text-gray-500">Must be at least 8 characters long</p>
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirm Password *
                          </label>
                          <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        <div className="flex items-start">
                          <input
                            id="agreeTerms"
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleChange}
                            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label htmlFor="agreeTerms" className="ml-3 text-sm text-gray-600">
                            I agree to the <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Terms and Conditions</a> and <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Privacy Policy</a>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                          Previous
                        </button>
                      ) : (
                        <div></div>
                      )}

                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="flex items-center px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl ml-auto"
                        >
                          Next
                          <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl ml-auto"
                        >
                          Complete Registration
                          <svg className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Login Link */}
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{' '}
                      <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700 transition">
                        Login here
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
