import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Debre_Markos_University_logo.png';

const CompanyProfile = () => {
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
            Company Profile
          </h1>
          <p className="text-xl text-white/90 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            Learn about our mission, vision, and commitment to serving university staff
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center animate-fadeInUp">
            <div className="bg-primary-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Established</h3>
            <p className="text-3xl font-bold gradient-text">2014</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Members</h3>
            <p className="text-3xl font-bold gradient-text">5,000+</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Loans Disbursed</h3>
            <p className="text-3xl font-bold gradient-text">50M+ Birr</p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 mb-12 animate-fadeInUp" style={{animationDelay: '0.3s'}}>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Markos Microfinance</h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            <p className="leading-relaxed">
              Markos Microfinance is a leading microfinance institution established in 2014, dedicated to serving the financial needs of Debre Markos University staff members. We operate as a cooperative microfinance institution, providing accessible and affordable financial services to empower our members.
            </p>
            <p className="leading-relaxed">
              With over a decade of experience, we have grown to serve more than 5,000 staff members, disbursing over 50 million Birr in loans. Our commitment to transparency, accountability, and member-focused services has made us the trusted financial partner for university employees.
            </p>
            <p className="leading-relaxed">
              We are licensed and regulated by the National Bank of Ethiopia, ensuring that all our operations meet the highest standards of financial integrity and security.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-10 shadow-lg animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            <div className="bg-primary-600 rounded-lg h-12 w-12 flex items-center justify-center mb-6">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To provide accessible, affordable, and sustainable microfinance services that empower university staff members to achieve their financial goals and improve their quality of life through innovative financial solutions.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-10 shadow-lg animate-fadeInUp" style={{animationDelay: '0.5s'}}>
            <div className="bg-green-600 rounded-lg h-12 w-12 flex items-center justify-center mb-6">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be the leading microfinance institution for university staff in Ethiopia, recognized for excellence in service delivery, financial inclusion, and positive impact on members' lives.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 mb-12 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Integrity</h4>
              <p className="text-sm text-gray-600">Honest and transparent in all our dealings</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Member Focus</h4>
              <p className="text-sm text-gray-600">Putting our members' needs first</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Innovation</h4>
              <p className="text-sm text-gray-600">Continuously improving our services</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Sustainability</h4>
              <p className="text-sm text-gray-600">Building long-term financial security</p>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 animate-fadeInUp" style={{animationDelay: '0.7s'}}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary-100 to-blue-100 rounded-full h-32 w-32 flex items-center justify-center mx-auto mb-4">
                <svg className="h-16 w-16 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Dr. Abebe Tadesse</h4>
              <p className="text-primary-600 font-medium mb-2">Chief Executive Officer</p>
              <p className="text-sm text-gray-600">20+ years in microfinance</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full h-32 w-32 flex items-center justify-center mx-auto mb-4">
                <svg className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">Ato Mulugeta Bekele</h4>
              <p className="text-green-600 font-medium mb-2">Chief Financial Officer</p>
              <p className="text-sm text-gray-600">15+ years in finance</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full h-32 w-32 flex items-center justify-center mx-auto mb-4">
                <svg className="h-16 w-16 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-1">W/ro Tigist Alemayehu</h4>
              <p className="text-blue-600 font-medium mb-2">Head of Operations</p>
              <p className="text-sm text-gray-600">12+ years in operations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
