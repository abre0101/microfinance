import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/Debre_Markos_University_logo.png';
import coinsImage from '../../assets/microfinance_pic.jpg';
import pic1 from '../../assets/PIC1.png';
import pic2 from '../../assets/PIC2.png';
import clientsImage from '../../assets/clients-2.png';
import disbImage from '../../assets/disb-1.png';
import savingImage from '../../assets/saving1-2.png';
import moeLogo from '../../assets/MOE.jfif';
import nbeLogo from '../../assets/NBE.jfif';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contactDropdownOpen, setContactDropdownOpen] = React.useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-12">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-400 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  <img src={logo} alt="Debre Markos University" className="h-14 w-14 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <span className="text-2xl font-bold gradient-text block">
                    Markos Microfinance
                  </span>
                  <span className="text-sm text-gray-600">
                    ማርቆስ ማይክሮፋይናንስ
                  </span>
                </div>
              </Link>
              <div className="hidden md:flex space-x-8 items-center">
                {/* About Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                    onBlur={() => setTimeout(() => setAboutDropdownOpen(false), 200)}
                    className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-200 flex items-center space-x-1 py-2"
                  >
                    <span>About</span>
                    <svg className={`h-4 w-4 transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {aboutDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fadeInUp">
                      <Link
                        to="/company-profile"
                        className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 hover:text-primary-600 transition-all duration-200 font-medium rounded-lg mx-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary-100 rounded-lg p-1.5">
                            <svg className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <span>Company Profile</span>
                        </div>
                      </Link>
                      <Link
                        to="/public-document"
                        className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 hover:text-primary-600 transition-all duration-200 font-medium rounded-lg mx-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-blue-100 rounded-lg p-1.5">
                            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span>Public Document</span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
                
                <a href="#services" className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-200 relative group py-2">
                  Services
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a href="#loans" className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-200 relative group py-2">
                  Loans
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                
                {/* Contact Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
                    onBlur={() => setTimeout(() => setContactDropdownOpen(false), 200)}
                    className="text-gray-700 hover:text-primary-600 font-semibold transition-all duration-200 flex items-center space-x-1 py-2"
                  >
                    <span>Contact</span>
                    <svg className={`h-4 w-4 transition-transform duration-300 ${contactDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {contactDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fadeInUp">
                      <Link
                        to="/faq"
                        className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 hover:text-primary-600 transition-all duration-200 font-medium rounded-lg mx-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 rounded-lg p-1.5">
                            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span>FAQ</span>
                        </div>
                      </Link>
                      <Link
                        to="/office"
                        className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-blue-50 hover:text-primary-600 transition-all duration-200 font-medium rounded-lg mx-2"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="bg-purple-100 rounded-lg p-1.5">
                            <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <span>Office</span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary-600 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Scrolling Announcement Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 overflow-hidden">
        <div className="whitespace-nowrap">
          <p className="inline-block animate-marquee text-lg font-medium">
            🎉 Welcome to Markos Microfinance - Empowering University Staff Since 2014 | 
            ✨ Affordable Loans with Competitive Interest Rates | 
            💰 Quick Approval Process - Get Funds in 5-10 Business Days | 
            🏆 Trusted by Over 5,000+ Staff Members | 
            📞 Contact Us: +251 11 123 4567 | 
            ✅ Licensed by National Bank of Ethiopia | 
            🌟 Building Financial Security Together
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInUp">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Empowering University Staff Through
                <span className="gradient-text"> Microfinance</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Access affordable loans, build savings, and secure your financial future with Markos Microfinance - the trusted microfinance platform for Debre Markos University staff.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
                >
                  Get Started Today →
                </Link>
                <a
                  href="#about"
                  className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <div className="animate-float">
                <img 
                  src={coinsImage} 
                  alt="Financial Growth" 
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-2xl border-2 border-primary-100 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                <p className="text-sm text-gray-600 mb-1">Trusted by</p>
                <p className="text-3xl font-bold gradient-text">5,000+</p>
                <p className="text-sm text-gray-600">Staff Members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the page continues... */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Empowering University Staff Through Microfinance
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Access affordable loans, build savings, and secure your financial future with our trusted microfinance solutions designed specifically for university staff members.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg text-center"
                >
                  Get Started Today
                </Link>
                <a
                  href="#loans"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition text-center"
                >
                  View Loan Products
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 rounded-full p-3">
                      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">5,000+</p>
                      <p className="text-blue-100">Active Members</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 rounded-full p-3">
                      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">50M+ Birr</p>
                      <p className="text-blue-100">Loans Disbursed</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 rounded-full p-3">
                      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">98%</p>
                      <p className="text-blue-100">Satisfaction Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Markos <span className="gradient-text">Facts</span>
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that speak for themselves
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group animate-fadeInUp" style={{animationDelay: '0.1s'}}>
              <div className="mb-6 flex justify-center transform transition-transform duration-300 group-hover:scale-110">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <img src={savingImage} alt="Years Experience" className="h-28 w-28 object-contain relative z-10" />
                </div>
              </div>
              <p className="text-5xl font-bold gradient-text mb-3">10+</p>
              <p className="text-lg text-gray-600 font-medium">Years Experience</p>
            </div>
            <div className="text-center group animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <div className="mb-6 flex justify-center transform transition-transform duration-300 group-hover:scale-110">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <img src={clientsImage} alt="Happy Members" className="h-28 w-28 object-contain relative z-10" />
                </div>
              </div>
              <p className="text-5xl font-bold gradient-text mb-3">5,000+</p>
              <p className="text-lg text-gray-600 font-medium">Happy Members</p>
            </div>
            <div className="text-center group animate-fadeInUp" style={{animationDelay: '0.3s'}}>
              <div className="mb-6 flex justify-center transform transition-transform duration-300 group-hover:scale-110">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <img src={disbImage} alt="Birr Disbursed" className="h-28 w-28 object-contain relative z-10" />
                </div>
              </div>
              <p className="text-5xl font-bold gradient-text mb-3">50M+</p>
              <p className="text-lg text-gray-600 font-medium">Birr Disbursed</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                About Markos Microfinance
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Markos Microfinance is a leading microfinance institution dedicated to serving university staff members. We provide accessible, affordable financial services that help our members achieve their personal and professional goals.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With over a decade of experience, we understand the unique financial needs of academic professionals. Our mission is to promote financial inclusion and economic empowerment through innovative microfinance solutions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-green-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700">Licensed and regulated by the National Bank of Ethiopia</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-green-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700">Transparent operations with full accountability</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="h-6 w-6 text-green-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-700">Member-focused services and support</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={pic1} 
                alt="Markos Microfinance Services" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive financial solutions tailored for university staff members
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Microloans</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Access quick loans from 50,000 to 500,000 Birr with competitive interest rates and flexible repayment terms.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Fast approval process
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Competitive rates
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Flexible terms
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Savings</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Build your financial security with our savings programs. Earn competitive interest on your deposits.
              </p>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Attractive interest rates
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Secure deposits
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Easy withdrawals
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="h-16 w-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Insurance</h3>
              <p className="text-gray-600 mb-4">
                Protect your assets and loved ones with our comprehensive insurance coverage options.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Life insurance
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Asset protection
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Affordable premiums
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get your loan in 4 simple steps
            </p>
          </div>
          
          {/* Feature Image */}
          <div className="mb-16">
            <img 
              src={pic2} 
              alt="Loan Process" 
              className="rounded-2xl shadow-xl w-full max-w-4xl mx-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Register</h3>
              <p className="text-gray-600">
                Create your account with basic information and verify your university staff status
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apply</h3>
              <p className="text-gray-600">
                Choose your loan product and submit your application with required documents
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Approval</h3>
              <p className="text-gray-600">
                Our team reviews your application and provides approval within 5-10 business days
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Receive</h3>
              <p className="text-gray-600">
                Get your funds disbursed directly to your bank account and start using them
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Products */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Loan Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary-500 transition">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Emergency Loan</h3>
              <p className="text-3xl font-bold text-primary-600 mb-2">50,000 Birr</p>
              <p className="text-sm text-gray-600 mb-4">8% interest • 12 months</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Quick approval
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No collateral
                </li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary-500 transition">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Personal Loan</h3>
              <p className="text-3xl font-bold text-primary-600 mb-2">150,000 Birr</p>
              <p className="text-sm text-gray-600 mb-4">10% interest • 24 months</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Flexible tenure
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Low interest
                </li>
              </ul>
            </div>

            <div className="border-2 border-primary-500 rounded-xl p-6 bg-primary-50 relative">
              <div className="absolute -top-3 right-4 bg-primary-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Popular
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Asset Finance</h3>
              <p className="text-3xl font-bold text-primary-600 mb-2">500,000 Birr</p>
              <p className="text-sm text-gray-600 mb-4">12% interest • 60 months</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Maximum amount
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Long tenure
                </li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary-500 transition">
              <h3 className="text-lg font-bold text-gray-900 mb-2">School Fees</h3>
              <p className="text-3xl font-bold text-primary-600 mb-2">100,000 Birr</p>
              <p className="text-sm text-gray-600 mb-4">7% interest • 12 months</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lowest rate
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Education focus
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of university staff members who trust Markos Microfinance
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
          >
            Create Your Account
          </Link>
        </div>
      </div>

      {/* Trusted Partners Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Regulated & Trusted Partners
            </h2>
            <p className="text-xl text-gray-600">
              Operating under the supervision of regulatory bodies and in partnership with leading institutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* Debre Markos University */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center h-40">
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-3">
                  <img src={logo} alt="Debre Markos University" className="h-20 w-20 object-contain" />
                </div>
                <p className="text-sm font-semibold text-gray-700">Debre Markos University</p>
              </div>
            </div>
            
            {/* National Bank of Ethiopia */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center h-40">
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-3">
                  <img src={nbeLogo} alt="National Bank of Ethiopia" className="h-20 w-20 object-contain rounded-lg" />
                </div>
                <p className="text-sm font-semibold text-gray-700">National Bank of Ethiopia</p>
              </div>
            </div>
            
            {/* Ministry of Education */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center h-40">
              <div className="text-center">
                <div className="flex items-center justify-center mx-auto mb-3">
                  <img src={moeLogo} alt="Ministry of Education" className="h-20 w-20 object-contain rounded-lg" />
                </div>
                <p className="text-sm font-semibold text-gray-700">Ministry of Education</p>
              </div>
            </div>
            
            {/* Staff Association */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center h-40">
              <div className="text-center">
                <div className="h-20 w-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <svg className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-gray-700">University Staff Association</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} alt="Debre Markos University" className="h-12 w-12" />
                <div>
                  <h3 className="text-2xl font-bold">Markos Microfinance</h3>
                  <span className="text-sm text-gray-400">ማርቆስ ማይክሮፋይናንስ</span>
                </div>
              </div>
              <p className="text-gray-400">
                Empowering university staff with accessible microfinance solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@markosmicrofinance.edu</li>
                <li>Phone: +251 11 123 4567</li>
                <li>Office Hours: Mon-Fri, 8AM-5PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Markos Microfinance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
