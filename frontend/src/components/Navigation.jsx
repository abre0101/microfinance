import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Markos Microfinance
              </span>
              <span className="ml-2 text-sm text-gray-600">
                ማርቆስ ማይክሮፋይናንስ
              </span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary-600 transition"
              >
                Dashboard
              </Link>
              <Link
                to="/loans/apply"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary-600 transition"
              >
                Apply Loan
              </Link>
              <Link
                to="/loans/my-loans"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary-600 transition"
              >
                My Loans
              </Link>
              <Link
                to="/savings"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-primary-600 transition"
              >
                Savings
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-semibold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
