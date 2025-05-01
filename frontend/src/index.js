// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
require('dotenv').config();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId = {process.env.GOOGLE_CLIENT_ID} >
    <App /> 
  </GoogleOAuthProvider>
);