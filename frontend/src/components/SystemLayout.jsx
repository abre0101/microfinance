import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/Debre_Markos_University_logo.png';

const SystemLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Role-based menu items
  const getMenuItems = () => {
    const role = user?.role;
    
    const menus = {
      admin: [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Users', path: '/admin/users', icon: '👥' },
        { name: 'Loan Products', path: '/admin/products', icon: '📦' },
        { name: 'All Loans', path: '/admin/loans', icon: '📋' },
        { name: 'Reports', path: '/admin/reports', icon: '📈' },
        { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
      ],
      loan_officer: [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Pending Applications', path: '/officer/pending', icon: '⏳' },
        { name: 'Approved Loans', path: '/officer/approved', icon: '✅' },
        { name: 'Reports', path: '/officer/reports', icon: '📈' },
      ],
      loan_committee: [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Pending Review', path: '/committee/pending', icon: '⏳' },
        { name: 'Reviewed Loans', path: '/committee/reviewed', icon: '✅' },
        { name: 'History', path: '/committee/history', icon: '📜' },
      ],
      inspector: [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Pending Inspections', path: '/inspector/pending', icon: '🔍' },
        { name: 'Scheduled', path: '/inspector/scheduled', icon: '📅' },
        { name: 'Completed', path: '/inspector/completed', icon: '✅' },
      ],
      accountant: [
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Disbursements', path: '/accountant/disbursements', icon: '💰' },
        { name: 'Financial Reports', path: '/accountant/reports', icon: '📈' },
        { name: 'Reconciliation', path: '/accountant/reconciliation', icon: '🧮' },
      ],
    };

    return menus[role] || [];
  };

  const menuItems = getMenuItems();

  const getRoleName = () => {
    const roleNames = {
      admin: 'System Administrator',
      loan_officer: 'Loan Officer',
      loan_committee: 'Loan Committee',
      inspector: 'Inspector',
      accountant: 'Accountant',
    };
    return roleNames[user?.role] || 'User';
  };

  const getRoleColor = () => {
    const colors = {
      admin: 'from-purple-600 to-pink-600',
      loan_officer: 'from-blue-600 to-indigo-600',
      loan_committee: 'from-yellow-600 to-orange-600',
      inspector: 'from-indigo-600 to-blue-600',
      accountant: 'from-green-600 to-teal-600',
    };
    return colors[user?.role] || 'from-gray-600 to-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 shadow-lg`}
        style={{ width: '280px' }}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-10 w-10" />
              <div>
                <span className={`text-lg font-bold bg-gradient-to-r ${getRoleColor()} bg-clip-text text-transparent block`}>
                  Markos MF
                </span>
                <span className="text-xs text-gray-500">System Portal</span>
              </div>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${getRoleColor()} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-lg">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {getRoleName()}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? `bg-gradient-to-r ${getRoleColor()} text-white shadow-md`
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition font-medium"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all ${sidebarOpen ? 'ml-[280px]' : 'ml-0'}`}
      >
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    {menuItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
                  <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* User Menu */}
                <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                  <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${getRoleColor()} flex items-center justify-center`}>
                    <span className="text-white font-semibold text-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SystemLayout;
