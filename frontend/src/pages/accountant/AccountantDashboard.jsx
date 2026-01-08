import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const AccountantDashboard = () => {
  const [report, setReport] = useState(null);
  const [pendingDisbursements, setPendingDisbursements] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        // Get financial report
        const reportRes = await axios.get('http://localhost:5000/api/accountant/financial-report', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReport(reportRes.data);

        // Get pending disbursements
        const disbursementsRes = await axios.get('http://localhost:5000/api/accountant/pending-disbursements', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPendingDisbursements(disbursementsRes.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []);

  const handleDisburse = async (loanId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`http://localhost:5000/api/loans/${loanId}/disburse`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Loan disbursed successfully!');
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to disburse loan');
    }
  };

  return (
    <div className="dashboard">
      <Navigation />
      <div className="dashboard-content">
        <h1>Accountant Dashboard</h1>
        <p className="subtitle">Welcome, {user?.name}</p>
        
        {report && (
          <div className="dashboard-cards">
            <div className="card highlight">
              <h3>Pending Disbursements</h3>
              <p className="card-value">{pendingDisbursements.length}</p>
            </div>
            <div className="card">
              <h3>Total Disbursed</h3>
              <p className="card-value">{report.total_amount_disbursed.toLocaleString()} Birr</p>
            </div>
            <div className="card">
              <h3>Insurance Collected</h3>
              <p className="card-value">{report.total_insurance_collected.toLocaleString()} Birr</p>
            </div>
            <div className="card">
              <h3>Outstanding Balance</h3>
              <p className="card-value">{report.outstanding_balance.toLocaleString()} Birr</p>
            </div>
          </div>
        )}

        <div className="disbursement-section">
          <h2>Approved Loans - Ready for Disbursement</h2>
          {pendingDisbursements.length > 0 ? (
            <div className="disbursement-list">
              {pendingDisbursements.map((loan) => (
                <div key={loan._id} className="disbursement-item">
                  <div className="borrower-info">
                    <h4>{loan.borrower?.name}</h4>
                    <p>Employee ID: {loan.borrower?.employee_id}</p>
                    <p>Department: {loan.borrower?.department}</p>
                  </div>
                  <div className="amount-breakdown">
                    <p><strong>Loan Amount:</strong> {loan.amount.toLocaleString()} Birr</p>
                    <p><strong>Insurance (4.5%):</strong> {loan.insurance_amount?.toLocaleString()} Birr</p>
                    <p><strong>Net Disbursement:</strong> {(loan.amount - (loan.insurance_amount || 0)).toLocaleString()} Birr</p>
                  </div>
                  <div className="disbursement-action">
                    <button 
                      onClick={() => handleDisburse(loan._id)}
                      className="disburse-btn"
                    >
                      Disburse Loan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No loans pending disbursement</p>
          )}
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <Link to="/accountant/disbursements" className="action-btn">View All Disbursements</Link>
          <Link to="/accountant/reports" className="action-btn">Financial Reports</Link>
          <Link to="/accountant/reconciliation" className="action-btn">Reconciliation</Link>
        </div>
      </div>
    </div>
  );
};

export default AccountantDashboard;
