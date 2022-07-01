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

  function setUsername1(username){
    localStorage.setItem("username", JSON.stringify(username));
    console.log(username);
  }
  
  return(
    
      <body style={{ margin : "230px 0px", textAlign : "center"}}>
      <div className="login-wrapper">
        {/* <h1 style={{marginBottom : "20px"}}>LOGIN FORM</h1> */}
        <form onSubmit={handleSubmit}>
          <label>
            <p style={{fontWeight : "bold", fontSize : "20px"}}>Username</p>
            <input style={{marginRight : "10px" , fontSize : "20px"}} type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p style={{fontWeight : "bold", fontSize : "20px"}}>Password</p>
            <input style={{marginLeft : "10px", fontSize : "20px"}} type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
          <button style={{marginTop : "20px", width : "300px" }} type="submit" class="btn btn-primary mb-2" onClick={setUsername1(username)}>LOG IN</button>
          </div>
        </form>
      </div>
      </body>

    )
}
