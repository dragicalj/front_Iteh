import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from './components/Login';
import { useState } from 'react';
import Home from './components/Home';
import { BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  
  const [token, setToken] = useState();
  

  if(!token) {
    return <Login setToken={setToken}/> }
 

  return (
    <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route> 
      </Routes>
  )

}

export default App;
