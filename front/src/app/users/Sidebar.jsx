import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Board</h2>
      <nav>
        <ul>
          <li><a href='/dashboard'>Dashboard</a></li>
          <li><a href='/transactions'>Transactions</a></li>
          <li><a href='/schedule'>Schedules</a></li>
          <li><a href='/users'>Users</a></li>
          <li><a href='/settings'>Settings</a></li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p><a href='/help'>Help</a></p>
        <p><a href='/contactus'>Contact Us</a></p>
      </div>
    </div>
  );
}

export default Sidebar;