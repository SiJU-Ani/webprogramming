import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Layout = () => {
  const [showChatButton, setShowChatButton] = useState(true);
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/ai-assistant');
    setShowChatButton(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <Link to="/">FoodiGoodi</Link>
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/billing">Billing</Link></li>
            <li><Link to="/reservations">Reservations</Link></li>
            <li><Link to="/order-online">Order Online</Link></li>
            <li><Link to="/lucky-wheel">Lucky Wheel</Link></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      {showChatButton && (
        <div 
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#0A3E42',
            color: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            zIndex: 1000
          }}
          onClick={handleChatClick}
        >
          <MessageCircle size={30} />
        </div>
      )}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} FoodiGoodi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout; 