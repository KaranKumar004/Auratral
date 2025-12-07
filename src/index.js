// Example: If your entry file is src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // <-- Crucial line for React 18/19 compatibility
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);