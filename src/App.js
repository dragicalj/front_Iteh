import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from './components/Login';
import { useState } from 'react';
import Home from './components/Home';
import Group from './components/Group';
import Admin from './components/Admin'
import { BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  
  const [token, setToken] = useState();
  

  if(!JSON.parse(localStorage.getItem("token"))) {
    console.log("Uslo ovde nekako")
    return <Login setToken={setToken}/> 
  }
  else{
    
  }

  return (
    <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/group' element={<Group/>}></Route>
        <Route path='/admin' element={<Admin/>}></Route> 
      </Routes>
  )

}

export default App;
