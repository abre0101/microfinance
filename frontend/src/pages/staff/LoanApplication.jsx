import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoanProducts, applyLoan } from '../../services/api';
import Navigation from '../../components/Navigation';

const LoanApplication = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '',
    amount: '',
    tenure_months: ''
  });
  const [loanSummary, setLoanSummary] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getLoanProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load loan products');
      }
    };
    fetchProducts();
  }, []);

  const calculateSummary = useCallback(() => {
    if (formData.amount && formData.tenure_months) {
      const amount = parseFloat(formData.amount);
      const insurance = amount * 0.045; // 4.5% insurance
      const netDisbursement = amount - insurance;
      
      setLoanSummary({
        loanAmount: amount,
        insurance: insurance,
        netDisbursement: netDisbursement
      });
    }
  }, [formData.amount, formData.tenure_months]);

  useEffect(() => {
    calculateSummary();
  }, [calculateSummary]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const result = await applyLoan({
        ...formData,
        amount: parseFloat(formData.amount),
        tenure_months: parseInt(formData.tenure_months)
      });
      setSuccess(`Loan application submitted! 
        Loan Amount: ${result.loan_amount.toLocaleString()} Birr
        Insurance (4.5%): ${result.insurance_amount.toLocaleString()} Birr
        Net Disbursement: ${result.net_disbursement.toLocaleString()} Birr
        Monthly EMI: ${result.monthly_emi.toLocaleString()} Birr`);
      setTimeout(() => navigate('/loans/my-loans'), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Application failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Apply for Loan</h1>
          <p className="mt-2 text-gray-600">Fill out the form below to apply for a loan</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700 text-sm whitespace-pre-line">{success}</p>
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
                Loan Product
              </label>
              <select
                id="product"
                value={formData.product_id}
                onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name} - {product.interest_rate}% interest
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount (Birr)
              </label>
              <input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                min="1000"
                max="500000"
                step="1000"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="Enter amount"
              />
              <p className="mt-2 text-sm text-gray-500">Maximum loan amount: 500,000 Birr</p>
            </div>

            <div>
              <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 mb-2">
                Tenure (Months)
              </label>
              <input
                id="tenure"
                type="number"
                value={formData.tenure_months}
                onChange={(e) => setFormData({ ...formData, tenure_months: e.target.value })}
                min="1"
                max="60"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="Enter tenure in months"
              />
            </div>

            {loanSummary && (
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-6 border border-primary-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700">Loan Amount:</span>
                    <strong className="text-xl text-gray-900">{loanSummary.loanAmount.toLocaleString()} Birr</strong>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-primary-200">
                    <span className="text-gray-700">Insurance (4.5% - Paid Upfront):</span>
                    <strong className="text-xl text-red-600">- {loanSummary.insurance.toLocaleString()} Birr</strong>
                  </div>
                  <div className="flex justify-between items-center py-3 border-t-2 border-primary-300 bg-white bg-opacity-50 rounded px-3">
                    <span className="text-gray-900 font-semibold">Net Disbursement:</span>
                    <strong className="text-2xl text-green-600">{loanSummary.netDisbursement.toLocaleString()} Birr</strong>
                  </div>
                </div>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-sm text-blue-800">
                    <svg className="inline h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Insurance is mandatory and will be deducted from the loan amount at disbursement
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;
