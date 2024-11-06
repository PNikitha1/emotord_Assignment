import React from 'react';
import Sidebar from './Sidebar';
import './users.css'; // Import the CSS file for styling

const ContactUs = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h1>This is the Users Page</h1>
      </div>
    </div>
  );
};

export default ContactUs;
