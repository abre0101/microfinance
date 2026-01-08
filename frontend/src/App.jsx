import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/shared/Dashboard';
import LoanApplication from './pages/staff/LoanApplication';
import MyLoans from './pages/staff/MyLoans';
import Savings from './pages/staff/Savings';
import LoanSchedule from './pages/staff/LoanSchedule';
import FAQ from './pages/public/FAQ';
import Office from './pages/public/Office';
import CompanyProfile from './pages/public/CompanyProfile';
import PublicDocument from './pages/public/PublicDocument';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/office" element={<Office />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/public-document" element={<PublicDocument />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/loans/apply" element={<PrivateRoute><LoanApplication /></PrivateRoute>} />
          <Route path="/loans/my-loans" element={<PrivateRoute><MyLoans /></PrivateRoute>} />
          <Route path="/loans/schedule/:loanId" element={<PrivateRoute><LoanSchedule /></PrivateRoute>} />
          <Route path="/savings" element={<PrivateRoute><Savings /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
