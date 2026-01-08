import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStaffDashboard } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const StaffDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStaffDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Gradient */}
        <div className="mb-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white shadow-xl animate-fadeInUp">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name || 'User'}! 👋</h1>
              <p className="text-lg text-white/90">Here's what's happening with your account today</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <svg className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-600 absolute top-0"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards with Enhanced Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp group" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Active</span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Active Loans</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData?.active_loans || 0}</p>
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>View details</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp group" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-14 w-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">Balance</span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Loan Balance</p>
                <p className="text-3xl font-bold gradient-text">{(dashboardData?.total_loan_balance || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Birr</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp group" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-14 w-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Savings</span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Savings Balance</p>
                <p className="text-3xl font-bold gradient-text">{(dashboardData?.savings_balance || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Birr</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fadeInUp group" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">Due</span>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Next EMI</p>
                <p className="text-3xl font-bold gradient-text">{(dashboardData?.next_emi || 0).toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">Birr</p>
              </div>
            </div>

            {/* Quick Actions with Enhanced Design */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8 animate-fadeInUp" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/loans/apply"
                  className="group relative overflow-hidden flex items-center justify-center px-6 py-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                  <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-semibold text-lg">Apply for Loan</span>
                </Link>
                <Link
                  to="/loans/my-loans"
                  className="group flex items-center justify-center px-6 py-5 bg-white text-primary-600 border-2 border-primary-600 rounded-xl hover:bg-primary-50 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-semibold text-lg">View My Loans</span>
                </Link>
                <Link
                  to="/savings"
                  className="group flex items-center justify-center px-6 py-5 bg-white text-green-600 border-2 border-green-600 rounded-xl hover:bg-green-50 transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="font-semibold text-lg">View Savings</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
