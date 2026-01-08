import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../../components/Navigation';

const LoanSchedule = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          `http://localhost:5000/api/amortization/loan/${loanId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setScheduleData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load schedule');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [loanId]);

  if (loading) return <div className="page"><Navigation /><p>Loading...</p></div>;
  if (error) return <div className="page"><Navigation /><p className="error">{error}</p></div>;

  return (
    <div className="page">
      <Navigation />
      <div className="page-content">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        
        <h1>Loan Amortization Schedule</h1>
        
        {scheduleData && (
          <>
            <div className="loan-summary-cards">
              <div className="card">
                <h3>Loan Amount</h3>
                <p className="amount">{scheduleData.loan_amount.toLocaleString()} Birr</p>
              </div>
              <div className="card">
                <h3>Insurance (4.5%)</h3>
                <p className="amount">{scheduleData.insurance_amount.toLocaleString()} Birr</p>
              </div>
              <div className="card">
                <h3>Net Disbursement</h3>
                <p className="amount">{scheduleData.net_disbursement.toLocaleString()} Birr</p>
              </div>
              <div className="card">
                <h3>Monthly EMI</h3>
                <p className="amount">{scheduleData.monthly_emi.toLocaleString()} Birr</p>
              </div>
            </div>

            <div className="summary-section">
              <h2>Repayment Summary</h2>
              <div className="summary-grid">
                <div className="summary-item">
                  <span>Interest Rate:</span>
                  <strong>{scheduleData.interest_rate}% per year</strong>
                </div>
                <div className="summary-item">
                  <span>Tenure:</span>
                  <strong>{scheduleData.tenure_months} months</strong>
                </div>
                <div className="summary-item">
                  <span>Total Interest:</span>
                  <strong>{scheduleData.summary.total_interest.toLocaleString()} Birr</strong>
                </div>
                <div className="summary-item">
                  <span>Total Repayment:</span>
                  <strong>{scheduleData.summary.total_payment.toLocaleString()} Birr</strong>
                </div>
              </div>
            </div>

            <div className="schedule-table-container">
              <h2>Monthly Payment Schedule</h2>
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>EMI (Birr)</th>
                    <th>Principal (Birr)</th>
                    <th>Interest (Birr)</th>
                    <th>Balance (Birr)</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.schedule.map((month) => (
                    <tr key={month.month}>
                      <td>{month.month}</td>
                      <td>{month.emi.toLocaleString()}</td>
                      <td>{month.principal.toLocaleString()}</td>
                      <td>{month.interest.toLocaleString()}</td>
                      <td>{month.balance.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>{scheduleData.summary.total_payment.toLocaleString()}</strong></td>
                    <td><strong>{scheduleData.summary.total_principal.toLocaleString()}</strong></td>
                    <td><strong>{scheduleData.summary.total_interest.toLocaleString()}</strong></td>
                    <td><strong>0.00</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoanSchedule;
