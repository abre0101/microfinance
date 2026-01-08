import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import SystemLayout from '../../components/SystemLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:5000/api/dashboard/admin', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <SystemLayout>
      <div>
        {/* Welcome Card */}
        <div className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name || 'Administrator'}! 👋</h2>
          <p className="text-white/90">Here's what's happening with the system today</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            {stats && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Total Loans</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total_loans}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-14 w-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Pending</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Pending Applications</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.pending_applications}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-14 w-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Total Disbursed</p>
                  <p className="text-3xl font-bold gradient-text">{stats.total_disbursed.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">Birr</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900">6</p>
                </div>
              </div>
            )}

            {/* Management Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* System Management */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">System Management</h2>
                </div>
                <div className="space-y-3">
                  <Link to="/admin/users" className="block px-4 py-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition text-gray-700 hover:text-blue-600 font-medium">
                    👥 Manage Users
                  </Link>
                  <Link to="/admin/products" className="block px-4 py-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition text-gray-700 hover:text-blue-600 font-medium">
                    📦 Loan Products
                  </Link>
                  <Link to="/admin/settings" className="block px-4 py-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition text-gray-700 hover:text-blue-600 font-medium">
                    ⚙️ System Settings
                  </Link>
                </div>
              </div>

              {/* Reports & Analytics */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Reports & Analytics</h2>
                </div>
                <div className="space-y-3">
                  <Link to="/admin/reports" className="block px-4 py-3 bg-gray-50 hover:bg-green-50 rounded-lg transition text-gray-700 hover:text-green-600 font-medium">
                    📊 Financial Reports
                  </Link>
                  <Link to="/admin/analytics" className="block px-4 py-3 bg-gray-50 hover:bg-green-50 rounded-lg transition text-gray-700 hover:text-green-600 font-medium">
                    📈 Analytics Dashboard
                  </Link>
                  <Link to="/admin/audit" className="block px-4 py-3 bg-gray-50 hover:bg-green-50 rounded-lg transition text-gray-700 hover:text-green-600 font-medium">
                    🔍 Audit Logs
                  </Link>
                </div>
              </div>

              {/* Loan Management */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Loan Management</h2>
                </div>
                <div className="space-y-3">
                  <Link to="/admin/loans" className="block px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition text-gray-700 hover:text-purple-600 font-medium">
                    📋 All Loans
                  </Link>
                  <Link to="/admin/approvals" className="block px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition text-gray-700 hover:text-purple-600 font-medium">
                    ⏳ Pending Approvals
                  </Link>
                  <Link to="/admin/defaults" className="block px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition text-gray-700 hover:text-purple-600 font-medium">
                    ⚠️ Defaulted Loans
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </SystemLayout>
  );
};

export default AdminDashboard;
