import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Debre_Markos_University_logo.png';
import loginBg from '../assets/for_login.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{backgroundImage: `url(${loginBg})`}}
    >
      {/* Overlay - Very light for maximum background visibility */}
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
                  to="/register"
                  className="bg-white text-primary-600 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium transition shadow-lg"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Login Form - Positioned to the right */}
        <div className="min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Welcome Message (Hidden on mobile) */}
            <div className="hidden lg:block">
              <div className="text-white space-y-6 animate-fadeInUp">
                <h2 className="text-5xl font-bold leading-tight" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.5)'}}>
                  Empowering University Staff
                </h2>
                <p className="text-xl leading-relaxed" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>
                  Access your microfinance account and manage your loans, savings, and financial goals all in one place.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>Quick loan approvals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>Competitive interest rates</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-white/30 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>Secure and transparent</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
              <div className="bg-white rounded-3xl shadow-2xl p-10 lg:p-12 animate-fadeInUp border border-gray-100" style={{animationDelay: '0.2s'}}>
                <div className="mb-8">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-br from-primary-100 to-blue-100 rounded-full p-4">
                      <img src={logo} alt="Debre Markos University" className="h-16 w-16" />
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-center mb-2">
                    <span className="gradient-text">Markos Microfinance</span>
                  </h1>
                  <p className="text-center text-sm text-gray-500 mb-4">ማርቆስ ማይክሮፋይናንስ</p>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                    <p className="text-gray-600">Sign in to access your account</p>
                  </div>
                </div>
                
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
                
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      University Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
                      <input
                        id="email"
                        type="email"
                        placeholder="your.name@uni.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center items-center py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    <span>Sign in</span>
                    <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700 transition">
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
