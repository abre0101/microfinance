import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Navigation from '../../components/Navigation';

const AccountantDashboard = () => {
  const [report, setReport] = useState(null);
  const [pendingDisbursements, setPendingDisbursements] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        
        const reportRes = await axios.get('http://localhost:5000/api/accountant/financial-report', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReport(reportRes.data);

        const disbursementsRes = await axios.get('http://localhost:5000/api/accountant/pending-disbursements', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPendingDisbursements(disbursementsRes.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Accountant Dashboard</h1>
              <p className="text-lg text-white/90">Welcome, {user?.name || 'Accountant'}! 💰</p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <svg className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            {report && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-14 w-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Urgent</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Pending Disbursements</p>
                  <p className="text-3xl font-bold text-gray-900">{pendingDisbursements.length}</p>
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
                  <p className="text-3xl font-bold gradient-text">{report.total_amount_disbursed.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">Birr</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Insurance Collected</p>
                  <p className="text-3xl font-bold gradient-text">{report.total_insurance_collected.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">Birr</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">Outstanding Balance</p>
                  <p className="text-3xl font-bold gradient-text">{report.outstanding_balance.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">Birr</p>
                </div>
              </div>
            )}

            {/* Pending Disbursements */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Approved Loans - Ready for Disbursement</h2>
              {pendingDisbursements.length > 0 ? (
                <div className="space-y-6">
                  {pendingDisbursements.map((loan) => (
                    <div key={loan._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Borrower Info */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Borrower Details</h3>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium text-gray-700">Name:</span> {loan.borrower?.name}</p>
                            <p><span className="font-medium text-gray-700">Employee ID:</span> {loan.borrower?.employee_id}</p>
                            <p><span className="font-medium text-gray-700">Department:</span> {loan.borrower?.department}</p>
                          </div>
                        </div>

                        {/* Amount Breakdown */}
                        <div className="bg-green-50 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Amount Breakdown</h3>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium text-gray-700">Loan Amount:</span> <span className="text-lg font-bold text-green-600">{loan.amount.toLocaleString()} Birr</span></p>
                            <p><span className="font-medium text-gray-700">Insurance (4.5%):</span> {loan.insurance_amount?.toLocaleString()} Birr</p>
                            <p><span className="font-medium text-gray-700">Net Disbursement:</span> <span className="font-bold text-blue-600">{(loan.amount - (loan.insurance_amount || 0)).toLocaleString()} Birr</span></p>
                          </div>
                        </div>

                        {/* Action */}
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => handleDisburse(loan._id)}
                            className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg font-semibold text-lg flex items-center justify-center"
                          >
                            <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Disburse Loan
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-4 text-gray-600">No loans pending disbursement</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link to="/accountant/disbursements" className="flex items-center justify-center px-6 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg">
                  <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="font-semibold text-lg">All Disbursements</span>
                </Link>
                <Link to="/accountant/reports" className="flex items-center justify-center px-6 py-5 bg-white text-green-600 border-2 border-green-600 rounded-xl hover:bg-green-50 transition-all transform hover:scale-105 shadow-md">
                  <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-semibold text-lg">Financial Reports</span>
                </Link>
                <Link to="/accountant/reconciliation" className="flex items-center justify-center px-6 py-5 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-md">
                  <svg className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold text-lg">Reconciliation</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AccountantDashboard;
