import './globals.css';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="container">
          
          <main className="content">
            {children} {/* This renders the current page content */}
          </main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
