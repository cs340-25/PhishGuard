//Root Frontend element to render all components. 

import React, { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import NewUserForm from './components/newUser';
import LogInForm from './components/logIn';
import HomePage from './components/HomePage'; 
import AdminDashboard from './components/adminDash';
import Inbox from './components/inbox'; 

function App() {
  const [activeComponent, setActiveComponent] = useState('Home');

  // Switching components on button press. 
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Home':
        return <HomePage />; 
      case 'Create Account':
        return <NewUserForm />; 
      case 'LogIn': 
        return <LogInForm />; 
      case 'AdminDash': 
        return <AdminDashboard />; 
      default:
        return <HomePage />; 
    }
  };
  // buttons along top bar 
  return (
   <Router>
    <div style={styles.app}>
      <nav style={styles.nav}>
        <div style={styles.leftNav}>
          <button
            onClick={() => setActiveComponent('Home')}
            style={styles.smallButton}
          >
            Home
          </button>
        </div>
        <div style={styles.rightNav}>
          <button
            onClick = {() => setActiveComponent('LogIn')}
            style = {styles.smallButton}> 
              Log In
          </button> 
          <button 
            onClick = {() => setActiveComponent('Create Account')} 
            style={styles.smallButton}>
              Create Account
          </button>
          <button
            onClick={() => setActiveComponent('AdminDash')}
            style={styles.smallButton}>
              Admin Dashboard 
            </button>
        </div> 
      </nav>
      <main style={styles.main}>
        <Routes>
          <Route path = "/inbox" element = {<Inbox />} />
          <Route path = "*" element = {renderComponent()} />
        </Routes>
      </main>
    </div>
   </Router> 
  );
}

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#220055',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  leftNav: {
    display: 'flex',
    alignItems: 'center',
  },
  rightNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  smallButton: {
    padding: '5px 15px',
    backgroundColor: '#220088',
    border: 'none',
    borderRadius: '4px',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  smallButtonHover: {
    backgroundColor: '#220099',
  },
  main: {
    padding: '20px',
  },
};

export default App;
