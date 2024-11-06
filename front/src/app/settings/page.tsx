import React from 'react';
import Sidebar from './Sidebar';
import './settings.css'; // Import the CSS file for styling

const ContactUs = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h1>This is the Settings Page</h1>
      </div>
    </div>
  );
};

export default ContactUs;
