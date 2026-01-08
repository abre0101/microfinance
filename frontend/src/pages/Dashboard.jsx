import React from 'react';
import { useAuth } from '../context/AuthContext';
import StaffDashboard from './StaffDashboard';
import OfficerDashboard from './OfficerDashboard';
import CommitteeDashboard from './CommitteeDashboard';
import InspectorDashboard from './InspectorDashboard';
import AccountantDashboard from './AccountantDashboard';
import AdminDashboard from './AdminDashboard';

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
