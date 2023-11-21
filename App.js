// App.js

import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = () => {
    // You can add your login logic here
    console.log('Login logic goes here');
    setCurrentPage('dashboard');
  };

  const handleAddItem = () => {
    const newItem = { id: items.length + 1, name: `Item ${items.length + 1}` };
    setItems([...items, newItem]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onNavigate={() => handleNavigation('register')} onLogin={handleLogin} />;
      case 'register':
        return <Register onNavigate={() => handleNavigation('login')} />;
      case 'dashboard':
        return (
          <Dashboard
            onNavigate={handleNavigation}
            items={items}
            onAddItem={handleAddItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <NavigationBar onNavigate={handleNavigation} />
      {renderPage()}
    </div>
  );
};

const Dashboard = ({ onNavigate, items, onAddItem }) => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button onClick={onAddItem}>Add New Item</button>
      <table className="item-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <span className="back-link" onClick={() => onNavigate('login')}>
          Back to Login
        </span>
      </p>
    </div>
  );
};

const Login = ({ onNavigate, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onLogin}>Login</button>
        <p>or login with</p>

        <div className="social-login-options">
          <a href="#google-login" className="google-login">
            <i className="fab fa-google"></i> Sign up with Google
          </a>
          <a href="#facebook-login" className="facebook-login">
            <i className="fab fa-facebook"></i> Sign up with Facebook
          </a>
        </div>

        <p>
          Don't have an account?{' '}
          <span className="register-link" onClick={onNavigate}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

const Register = ({ onNavigate }) => {
  // Existing register component code
};

const NavigationBar = ({ onNavigate }) => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li onClick={() => onNavigate('login')}>Login</li>
        <li onClick={() => onNavigate('register')}>Register</li>
        <li onClick={() => onNavigate('dashboard')}>Dashboard</li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default App;
