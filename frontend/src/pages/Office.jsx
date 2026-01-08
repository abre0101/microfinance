import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Debre_Markos_University_logo.png';

const Office = () => {
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
            Visit Our Office
          </h1>
          <p className="text-xl text-white/90 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            We're here to help you with all your financial needs
          </p>
        </div>
      </div>

      {/* Office Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-fadeInUp">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-lg p-4 flex-shrink-0">
                  <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Address</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Debre Markos University Campus<br />
                    Main Building, 2nd Floor<br />
                    Room 205<br />
                    Debre Markos, Ethiopia
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-4 flex-shrink-0">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <a href="tel:+251111234567" className="hover:text-primary-600 transition">+251 11 123 4567</a> (Main Line)<br />
                    <a href="tel:+251111234568" className="hover:text-primary-600 transition">+251 11 123 4568</a> (Hotline)<br />
                    <a href="tel:+251111234569" className="hover:text-primary-600 transition">+251 11 123 4569</a> (Support)
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-4 flex-shrink-0">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
                  <p className="text-gray-600 leading-relaxed">
                    <a href="mailto:info@markosmicrofinance.edu" className="hover:text-primary-600 transition">info@markosmicrofinance.edu</a><br />
                    <a href="mailto:support@markosmicrofinance.edu" className="hover:text-primary-600 transition">support@markosmicrofinance.edu</a><br />
                    <a href="mailto:loans@markosmicrofinance.edu" className="hover:text-primary-600 transition">loans@markosmicrofinance.edu</a>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-lg p-4 flex-shrink-0">
                  <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Office Hours</h3>
                  <div className="text-gray-600 leading-relaxed space-y-1">
                    <p className="flex justify-between">
                      <span className="font-medium">Monday - Friday:</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Saturday:</span>
                      <span>9:00 AM - 1:00 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span className="text-red-600">Closed</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-3">
                      * Lunch Break: 12:00 PM - 1:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map/Visual Section */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary-100 to-blue-100 rounded-2xl h-96 flex items-center justify-center p-8 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
              <div className="text-center">
                <div className="bg-white rounded-full p-8 inline-block mb-6 shadow-lg">
                  <svg className="h-24 w-24 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Markos Microfinance Office</h3>
                <p className="text-gray-600 mb-6">Located at Debre Markos University Campus</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition shadow-lg"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-fadeInUp" style={{animationDelay: '0.5s'}}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/register"
                  className="block w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition text-center"
                >
                  Apply for a Loan
                </Link>
                <Link
                  to="/faq"
                  className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition text-center"
                >
                  View FAQ
                </Link>
                <a
                  href="mailto:info@markosmicrofinance.edu"
                  className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition text-center"
                >
                  Send Email
                </a>
              </div>
            </div>

            {/* Department Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Departments</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 rounded-lg p-2">
                    <svg className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Loan Department</p>
                    <p className="text-sm text-gray-600">Room 205 - Ext: 205</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 rounded-lg p-2">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Savings Department</p>
                    <p className="text-sm text-gray-600">Room 206 - Ext: 206</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Customer Support</p>
                    <p className="text-sm text-gray-600">Room 207 - Ext: 207</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Office;
