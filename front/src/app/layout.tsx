import './globals.css';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <nav className="navbar">
            <ul className="nav-links">
              <li><a href="/">Sign In</a></li>
              <li><a href="/contactus">Contact Us</a></li>
              <li><a href="/signup">Sign Up</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/transactions">Transactions</a></li>
              <li><a href="/schedule">Schedule</a></li>
              <li><a href="/users">Users</a></li>
              <li><a href="/settings">Settings</a></li>
              <li><a href="/addprofile">Add Profile</a></li>
              <li><a href="/contactus">Contact Us</a></li>
              <li><a href="/help">Help</a></li>
            </ul>
          </nav>
          <main className="content">
            {children} {/* This renders the current page content */}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
