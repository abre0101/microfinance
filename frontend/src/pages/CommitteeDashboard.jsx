import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const CommitteeDashboard = () => {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:5000/api/committee/pending-loans', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPendingLoans(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApprove = async (loanId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`http://localhost:5000/api/committee/approve/${loanId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingLoans(pendingLoans.filter(loan => loan._id !== loanId));
    } catch (error) {
      console.error('Failed to approve loan', error);
    }
  };

  const handleRequestInspection = async (loanId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`http://localhost:5000/api/committee/request-inspection/${loanId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingLoans(pendingLoans.filter(loan => loan._id !== loanId));
    } catch (error) {
      console.error('Failed to request inspection', error);
    }
  };

  const handleReject = async (loanId) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(`http://localhost:5000/api/committee/reject/${loanId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingLoans(pendingLoans.filter(loan => loan._id !== loanId));
    } catch (error) {
      console.error('Failed to reject loan', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Loan Committee Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome, {user?.name || 'Committee Member'}</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-90">Pending Review</p>
                    <p className="text-4xl font-bold mt-2">{pendingLoans.length}</p>
                  </div>
                  <div className="h-12 w-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approved This Month</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rejected This Month</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Inspection Requested</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Reviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Loans Pending Committee Review</h2>
              {pendingLoans.length > 0 ? (
                <div className="space-y-6">
                  {pendingLoans.map((loan) => (
                    <div key={loan._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Borrower Details */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Borrower Details</h3>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium text-gray-700">Name:</span> {loan.borrower?.name}</p>
                            <p><span className="font-medium text-gray-700">Employee ID:</span> {loan.borrower?.employee_id}</p>
                            <p><span className="font-medium text-gray-700">Department:</span> {loan.borrower?.department}</p>
                            <p><span className="font-medium text-gray-700">Salary:</span> {loan.borrower?.basic_salary?.toLocaleString()} Birr</p>
                          </div>
                        </div>

                        {/* Loan Details */}
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Loan Request</h3>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium text-gray-700">Amount:</span> <span className="text-lg font-bold text-blue-600">{loan.amount.toLocaleString()} Birr</span></p>
                            <p><span className="font-medium text-gray-700">Tenure:</span> {loan.tenure_months} months</p>
                            <p><span className="font-medium text-gray-700">Monthly EMI:</span> {loan.monthly_emi.toLocaleString()} Birr</p>
                            <p><span className="font-medium text-gray-700">Status:</span> <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">{loan.status}</span></p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col justify-center space-y-3">
                          <button
                            onClick={() => handleApprove(loan._id)}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm flex items-center justify-center"
                          >
                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Approve
                          </button>
                          <button
                            onClick={() => handleRequestInspection(loan._id)}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm flex items-center justify-center"
                          >
                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Request Inspection
                          </button>
                          <button
                            onClick={() => handleReject(loan._id)}
                            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm flex items-center justify-center"
                          >
                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
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
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No loans pending review</h3>
                  <p className="mt-2 text-gray-600">All loan applications have been processed</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CommitteeDashboard;
