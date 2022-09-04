import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import { useState } from 'react';
import {Link } from "react-router-dom";
import { useNavigate } from 'react-router';




export default function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();
  let isAdmin = false;
   
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    
    localStorage.setItem("token", JSON.stringify(token.access_token));

    const roles = await getRoles({
      username
    })

    //setToken(token.access_token);
    console.log(token.access_token);
    console.log("ROLE");
    console.log(roles);
    roles.forEach(r => {
      if(r.name == "ROLE_ADMIN"){
        isAdmin = true;
      }
    });
    localStorage.setItem("admin", JSON.stringify("false"));
    if(isAdmin){
      localStorage.setItem("admin", JSON.stringify("true"));
      navigate("../admin", { replace: true });
      window.location.reload()
    }else{
      navigate("../home", { replace: true });
      window.location.reload()
    }
  }

  function setUsername1(username){
    localStorage.setItem("username", JSON.stringify(username));
    console.log(username);
  }
  const createUser =  async e =>{
    console.log("CreateUserFOrm");
    navigate("../createuser", { replace: true });
    window.location.reload()
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
          <button style={{marginTop : "20px", width : "300px" }} type="submit" className="btn btn-primary mb-2" onClick={setUsername1(username)}>LOG IN</button>
          </div>
          <div>
          <button style={{marginTop : "10px", width : "300px" }} type="submit" className="btn btn-primary mb-2" onClick={createUser}>Don't have an account? Register here</button>
          </div>
        </form>
      </div>
      </body>

    )
}

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

 async function getRoles(username1) {
  console.log("GET ROLES")
  console.log(username1)
  return fetch('http://localhost:8090/api/role', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(username1)
    })
    .then( data => data.json());
}
