import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navigation from '../components/Navigation';

const InspectorDashboard = () => {
  const [pendingInspections, setPendingInspections] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:5000/api/inspection/pending', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPendingInspections(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Navigation />
      <div className="dashboard-content">
        <h1>Inspector Dashboard</h1>
        <p className="subtitle">Welcome, {user?.name}</p>
        
        <div className="dashboard-cards">
          <div className="card highlight">
            <h3>Pending Inspections</h3>
            <p className="card-value">{pendingInspections.length}</p>
          </div>
          <div className="card">
            <h3>Completed This Month</h3>
            <p className="card-value">0</p>
          </div>
          <div className="card">
            <h3>Scheduled</h3>
            <p className="card-value">0</p>
          </div>
          <div className="card">
            <h3>Average Time</h3>
            <p className="card-value">2 days</p>
          </div>
        </div>

        <div className="inspections-section">
          <h2>Pending Inspections</h2>
          {pendingInspections.length > 0 ? (
            <div className="inspections-list">
              {pendingInspections.map((inspection) => (
                <div key={inspection._id} className="inspection-item">
                  <div className="inspection-details">
                    <h4>Inspection #{inspection._id.slice(-6)}</h4>
                    <p><strong>Type:</strong> {inspection.inspection_type}</p>
                    <p><strong>Status:</strong> <span className="badge">{inspection.status}</span></p>
                    <p><strong>Requested:</strong> {new Date(inspection.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="inspection-actions">
                    <button className="btn-schedule">Schedule</button>
                    <button className="btn-complete">Complete</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No pending inspections</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectorDashboard;
