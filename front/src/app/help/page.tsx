import React from 'react';
import Sidebar from './Sidebar';
import './Help.css'; // Import the CSS file for styling

const ContactUs = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h1>This is the Help Page</h1>
      </div>
    </div>
  );
};

export default ContactUs;
