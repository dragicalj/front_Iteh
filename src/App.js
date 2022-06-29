import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from './Login';
import { useState } from 'react';
import Home from './Home';
import { BrowserRouter, Routes, Route} from "react-router-dom";


function App() {
  
  const [token, setToken] = useState();
  

  if(!token) {
    return <Login setToken={setToken} />
  }
  if(token){
    return <Home token={token}/>
  }
  return (<>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />}></Route>
       
       <Route path='/home' element={<Home />}></Route>
       
      </Routes>
    
    </BrowserRouter>
    </>
  );
  
}

export default App;
