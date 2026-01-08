import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
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
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Navigation />
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        <p className="subtitle">Welcome, {user?.name} - System Administrator</p>
        
        {stats && (
          <>
            <div className="dashboard-cards">
              <div className="card">
                <h3>Total Loans</h3>
                <p className="card-value">{stats.total_loans}</p>
              </div>
              <div className="card highlight">
                <h3>Pending Applications</h3>
                <p className="card-value">{stats.pending_applications}</p>
              </div>
              <div className="card">
                <h3>Total Disbursed</h3>
                <p className="card-value">{stats.total_disbursed.toLocaleString()} Birr</p>
              </div>
              <div className="card">
                <h3>Active Users</h3>
                <p className="card-value">6</p>
              </div>
            </div>

            <div className="admin-sections">
              <div className="admin-section">
                <h2>System Management</h2>
                <div className="admin-links">
                  <Link to="/admin/users" className="admin-link">Manage Users</Link>
                  <Link to="/admin/products" className="admin-link">Loan Products</Link>
                  <Link to="/admin/settings" className="admin-link">System Settings</Link>
                </div>
              </div>

              <div className="admin-section">
                <h2>Reports & Analytics</h2>
                <div className="admin-links">
                  <Link to="/admin/reports" className="admin-link">Financial Reports</Link>
                  <Link to="/admin/analytics" className="admin-link">Analytics Dashboard</Link>
                  <Link to="/admin/audit" className="admin-link">Audit Logs</Link>
                </div>
              </div>

              <div className="admin-section">
                <h2>Loan Management</h2>
                <div className="admin-links">
                  <Link to="/admin/loans" className="admin-link">All Loans</Link>
                  <Link to="/admin/approvals" className="admin-link">Pending Approvals</Link>
                  <Link to="/admin/defaults" className="admin-link">Defaulted Loans</Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
