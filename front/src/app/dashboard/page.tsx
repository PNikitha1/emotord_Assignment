"use client"; // Add this directive at the top of the file

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';
import { Bar, Pie } from 'react-chartjs-2';
import { BiSearchAlt } from "react-icons/bi";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartData, ChartOptions, ArcElement } from 'chart.js';
import { FaPlus } from 'react-icons/fa'; // Importing a plus icon from react-icons

// Register the required components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const barData: ChartData<'bar'> = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Guest',
        data: [400, 300, 200, 300],
        backgroundColor: '#f28b82',
      },
      {
        label: 'User',
        data: [300, 500, 100, 400],
        backgroundColor: '#34a853',
      },
    ],
  };

  const pieData: ChartData<'pie'> = {
    labels: ['Basic Tees', 'Custom Short Pants', 'Super Hoodies'],
    datasets: [
      {
        data: [55, 31, 14],
        backgroundColor: ['#4285F4', '#FBBC05', '#34A853'],
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <header className="dashboard-header">
          <h2>Dashboard</h2>
          
          <input type="text" placeholder="Search..." />
          <div className="profile-icon"></div><BiSearchAlt size={24} style={{ marginTop: '0px', color: '#4285F4', marginLeft: '-1700px' }} />
        </header>

        <div className="stats-grid">
          <div className="stats-card">Total Revenues <br /> $2,129,430</div>
          <div className="stats-card">Total Transactions <br /> 1,520</div>
          <div className="stats-card">Total Likes <br /> 9,721</div>
          <div className="stats-card">Total Users <br /> 9,721</div>
        </div>

        <div className="chart-section">
          <div className="chart-container">
            <h3>Activities</h3>
            <Bar data={barData} options={options} />
          </div>
        </div>

        <div className="bottom-grid">
          <div className="pie-chart-card">
            <h3>Top Products</h3>
            {/* Set custom width and height for the Pie chart */}
            <div style={{ width: '250px', height: '250px', margin: '0 auto' }}>
              <Pie data={pieData} />
            </div>
          </div>
          <div className="profile-card">
            <h3>Add Profile</h3>
            
            <button onClick={() => setShowModal(true)}><FaPlus size={24} style={{ marginTop: '10px', color: '#4285F4' }} /></button>
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add New Profile</h2>
              <div className="tabs">
                <button className="tab active">Basic</button>
                <button className="tab">Social</button>
              </div>
              <div className="tab-content">
                <input type="text" placeholder="Instagram Link (Optional)" />
                <input type="text" placeholder="YouTube Link (Optional)" />
              </div>
              <div className="modal-footer">
                <button onClick={() => setShowModal(false)}>Back</button>
                <button>Done</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;