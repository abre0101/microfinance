import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Debre_Markos_University_logo.png';

const PublicDocument = () => {
  const documents = [
    {
      category: 'Legal Documents',
      color: 'primary',
      items: [
        { name: 'Business License', size: '2.5 MB', date: '2024-01-15', type: 'PDF' },
        { name: 'NBE Registration Certificate', size: '1.8 MB', date: '2024-01-10', type: 'PDF' },
        { name: 'Articles of Association', size: '3.2 MB', date: '2023-12-20', type: 'PDF' },
        { name: 'Tax Registration', size: '1.5 MB', date: '2024-01-05', type: 'PDF' },
      ]
    },
    {
      category: 'Financial Reports',
      color: 'green',
      items: [
        { name: 'Annual Report 2025', size: '5.4 MB', date: '2025-12-31', type: 'PDF' },
        { name: 'Audited Financial Statement 2025', size: '4.8 MB', date: '2025-12-31', type: 'PDF' },
        { name: 'Q4 2025 Financial Report', size: '2.1 MB', date: '2025-12-31', type: 'PDF' },
        { name: 'Annual Report 2024', size: '5.2 MB', date: '2024-12-31', type: 'PDF' },
      ]
    },
    {
      category: 'Policies & Guidelines',
      color: 'blue',
      items: [
        { name: 'Loan Policy Manual', size: '3.6 MB', date: '2024-06-01', type: 'PDF' },
        { name: 'Member Handbook', size: '2.8 MB', date: '2024-05-15', type: 'PDF' },
        { name: 'Code of Conduct', size: '1.2 MB', date: '2024-04-20', type: 'PDF' },
        { name: 'Privacy Policy', size: '980 KB', date: '2024-03-10', type: 'PDF' },
        { name: 'Terms and Conditions', size: '1.5 MB', date: '2024-03-10', type: 'PDF' },
      ]
    },
    {
      category: 'Forms & Applications',
      color: 'purple',
      items: [
        { name: 'Loan Application Form', size: '450 KB', date: '2024-01-01', type: 'PDF' },
        { name: 'Membership Application Form', size: '380 KB', date: '2024-01-01', type: 'PDF' },
        { name: 'Savings Account Opening Form', size: '420 KB', date: '2024-01-01', type: 'PDF' },
        { name: 'Complaint Form', size: '320 KB', date: '2024-01-01', type: 'PDF' },
      ]
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: {
        bg: 'bg-primary-100',
        text: 'text-primary-600',
        border: 'border-primary-200',
        hover: 'hover:bg-primary-50'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200',
        hover: 'hover:bg-green-50'
      },
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200',
        hover: 'hover:bg-blue-50'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200',
        hover: 'hover:bg-purple-50'
      }
    };
    return colors[color];
  };

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
            Public Documents
          </h1>
          <p className="text-xl text-white/90 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
            Access our official documents, reports, and forms
          </p>
        </div>
      </div>

      {/* Documents Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Info Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-12 animate-fadeInUp">
          <div className="flex items-start">
            <svg className="h-6 w-6 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-1">Document Access</h3>
              <p className="text-blue-800">
                All documents are available for public viewing. For official copies or additional information, please contact our office or visit us in person.
              </p>
            </div>
          </div>
        </div>

        {/* Document Categories */}
        <div className="space-y-12">
          {documents.map((category, idx) => {
            const colors = getColorClasses(category.color);
            return (
              <div key={idx} className="animate-fadeInUp" style={{animationDelay: `${idx * 0.1}s`}}>
                <div className="flex items-center mb-6">
                  <div className={`${colors.bg} rounded-lg px-4 py-2 mr-4`}>
                    <h2 className={`text-2xl font-bold ${colors.text}`}>{category.category}</h2>
                  </div>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((doc, docIdx) => (
                    <div
                      key={docIdx}
                      className={`bg-white rounded-xl p-6 shadow-md ${colors.hover} transition-all duration-300 border ${colors.border} hover:shadow-lg`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`${colors.bg} rounded-lg p-3 flex-shrink-0`}>
                            <svg className={`h-8 w-8 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{doc.name}</h3>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              <span className="flex items-center">
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {doc.type}
                              </span>
                              <span className="flex items-center">
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                </svg>
                                {doc.size}
                              </span>
                              <span className="flex items-center">
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {doc.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className={`${colors.bg} ${colors.text} p-3 rounded-lg hover:opacity-80 transition flex-shrink-0 ml-4`}>
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-10 text-center text-white animate-fadeInUp">
          <h3 className="text-3xl font-bold mb-4">Need Additional Documents?</h3>
          <p className="text-lg mb-8 text-white/90">
            Contact our office for official copies or additional information
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/office"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Visit Our Office
            </Link>
            <a
              href="mailto:info@markosmicrofinance.edu"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicDocument;
