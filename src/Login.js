import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState } from 'react';
import {Link } from "react-router-dom";
import { useNavigate } from 'react-router';



async function loginUser(credentials) {
    console.log(JSON.stringify(credentials))
    return fetch('http://localhost:8090/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "username="+credentials.username+"&"+"password="+credentials.password  //"username=john&password=1234"
    })
      .then(data => data.json())

   }


export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();
   
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    localStorage.setItem("token", JSON.stringify(token.access_token));
    setToken(token.access_token);
    console.log(token.access_token);
    navigate("../home", { replace: true });
  }
  
  return(
    
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
          <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
}
