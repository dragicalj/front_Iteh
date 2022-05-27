import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from './Login';
import { useState } from 'react';

function App() {
  
  const [token, setToken] = useState();

  if(!token) {
    return <Login setToken={setToken} />
  }
  
  return (
    <div>
      
    </div>
  );
  
}

export default App;
