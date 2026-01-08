import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const OfficerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [pendingLoans, setPendingLoans] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        // Get admin dashboard stats
        const statsRes = await axios.get('http://localhost:5000/api/dashboard/admin', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(statsRes.data);

        // Get pending loans
        const loansRes = await axios.get('http://localhost:5000/api/committee/pending-loans', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPendingLoans(loansRes.data.slice(0, 5)); // Show first 5
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
        <h1>Loan Officer Dashboard</h1>
        <p className="subtitle">Welcome, {user?.name}</p>
        
        {stats && (
          <div className="dashboard-cards">
            <div className="card highlight">
              <h3>Pending Applications</h3>
              <p className="card-value">{stats.pending_applications}</p>
              <Link to="/officer/pending" className="card-link">Review Now →</Link>
            </div>
            <div className="card">
              <h3>Total Loans</h3>
              <p className="card-value">{stats.total_loans}</p>
            </div>
            <div className="card">
              <h3>Total Disbursed</h3>
              <p className="card-value">{stats.total_disbursed.toLocaleString()} Birr</p>
            </div>
            <div className="card">
              <h3>This Month</h3>
              <p className="card-value">0 Birr</p>
            </div>
          </div>
        )}

        <div className="recent-applications">
          <h2>Recent Applications</h2>
          {pendingLoans.length > 0 ? (
            <div className="applications-list">
              {pendingLoans.map((loan) => (
                <div key={loan._id} className="application-item">
                  <div className="applicant-info">
                    <h4>{loan.borrower?.name}</h4>
                    <p>{loan.borrower?.department}</p>
                  </div>
                  <div className="loan-info">
                    <p><strong>{loan.amount.toLocaleString()} Birr</strong></p>
                    <p>{loan.tenure_months} months</p>
                  </div>
                  <div className="action-buttons">
                    <button className="approve-btn">Review</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No pending applications</p>
          )}
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <Link to="/officer/pending" className="action-btn">Review Applications</Link>
          <Link to="/officer/approved" className="action-btn">View Approved Loans</Link>
          <Link to="/officer/reports" className="action-btn">Generate Reports</Link>
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
