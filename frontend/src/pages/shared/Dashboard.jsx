import React from 'react';
import { useAuth } from '../../context/AuthContext';
import StaffDashboard from '../staff/StaffDashboard';
import OfficerDashboard from '../loan-officer/OfficerDashboard';
import CommitteeDashboard from '../loan-committee/CommitteeDashboard';
import InspectorDashboard from '../inspector/InspectorDashboard';
import AccountantDashboard from '../accountant/AccountantDashboard';
import AdminDashboard from '../admin/AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  // Route to appropriate dashboard based on user role
  switch (user?.role) {
    case 'loan_officer':
      return <OfficerDashboard />;
    case 'loan_committee':
      return <CommitteeDashboard />;
    case 'inspector':
      return <InspectorDashboard />;
    case 'accountant':
      return <AccountantDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'staff':
    default:
      return <StaffDashboard />;
  }
};

export default Dashboard;
