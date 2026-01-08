import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import LoanApplication from './pages/LoanApplication';
import MyLoans from './pages/MyLoans';
import Savings from './pages/Savings';
import LoanSchedule from './pages/LoanSchedule';
import FAQ from './pages/FAQ';
import Office from './pages/Office';
import CompanyProfile from './pages/CompanyProfile';
import PublicDocument from './pages/PublicDocument';
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
