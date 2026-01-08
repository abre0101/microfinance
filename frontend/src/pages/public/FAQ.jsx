import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Debre_Markos_University_logo.png';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Public Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="Debre Markos University" className="h-12 w-12" />
              <div>
                <span className="text-2xl font-bold text-primary-600 block">
                  Markos Microfinance
                </span>
                <span className="text-sm text-gray-600">
                  ማርቆስ ማይክሮፋይናንስ
                </span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 px-5 py-2 rounded-lg font-medium transition"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary-600 px-5 py-2 rounded-lg font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition shadow-md"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            Find answers to common questions about our services
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-6">
          {/* General Questions */}
          <div className="animate-fadeInUp">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-primary-600 text-white rounded-lg px-3 py-1 mr-3">General</span>
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3">Q</span>
                  Who is eligible for a loan?
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">
                  All permanent staff members of Debre Markos University with at least 6 months of service are eligible to apply for loans. You must have an active employment status and a good credit history.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3">Q</span>
                  What documents do I need to apply?
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">
                  You'll need: Valid ID, employment letter, recent pay slips (last 3 months), bank statements, and any collateral documents if applicable. All documents should be recent and verified.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3">Q</span>
                  How long does the approval process take?
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">
                  Loan applications are typically reviewed and approved within 5-10 business days after all required documents are submitted. Emergency loans may be processed faster.
                </p>
              </div>
            </div>
          </div>

          {/* Loan Products */}
          <div className="animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-600 text-white rounded-lg px-3 py-1 mr-3">Loan Products</span>
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3">Q</span>
                  What are the interest rates?
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">
                  Interest rates vary by loan product: Emergency Loan (8%), Personal Loan (10%), Asset Finance (12%), and School Fees (7%). All rates are competitive and transparent with no hidden charges.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3">Q</span>
                  What is the maximum loan amount I can get?
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">
                  The maximum loan amount depends on the product: Emergency Loan (50,000 Birr), Personal Loan (150,000 Birr), Asset Finance (500,000 Birr), and School Fees (100,000 Birr). Your eligibility also depends on your salary and credit history.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3">Q</span>
                  Can I apply for multiple loans?
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">
                  Yes, you can have multiple loans simultaneously. However, the total monthly repayment cannot exceed 40% of your net monthly salary to ensure you maintain financial stability.
                </p>
              </div>
            </div>
          </div>

          {/* Repayment */}
          <div className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-blue-600 text-white rounded-lg px-3 py-1 mr-3">Repayment</span>
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3">Q</span>
                  How do I repay my loan?
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">
                  Loan repayments are automatically deducted from your monthly salary through our integrated HRMS system. This makes repayment convenient, hassle-free, and ensures you never miss a payment.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3">Q</span>
                  Can I pay off my loan early?
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">
                  Yes, you can make early repayments or pay off your loan in full at any time without penalties. Early repayment can help you save on interest charges.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3">Q</span>
                  What happens if I miss a payment?
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">
                  Since payments are automatically deducted from your salary, missed payments are rare. However, if you face financial difficulties, contact us immediately to discuss restructuring options.
                </p>
              </div>
            </div>
          </div>

          {/* Insurance & Savings */}
          <div className="animate-fadeInUp" style={{animationDelay: '0.3s'}}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-purple-600 text-white rounded-lg px-3 py-1 mr-3">Insurance & Savings</span>
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3">Q</span>
                  Is loan insurance mandatory?
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">
                  Yes, all loans include a 4.5% insurance deduction to protect you and your family. This covers loan balance in case of death or permanent disability.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <span className="bg-primary-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-sm mr-3">Q</span>
                  Can I open a savings account?
                </h3>
                <p className="text-gray-600 ml-11 leading-relaxed">
                  Yes, we offer competitive savings accounts with attractive interest rates. You can open an account with a minimum deposit and enjoy secure, accessible savings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-lg mb-6">Our team is here to help you with any inquiries</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/office"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Visit Our Office
            </Link>
            <a
              href="tel:+251111234567"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
