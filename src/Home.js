import React from 'react'
import {Link } from "react-router-dom";
import Login from './Login';


function Home() {
  if(!token){
    return<Login setToken={setToken}/>
  }
  if(token){
    return <Home/>
  }
  return (
      <>
    <div>Home</div></>
  )
}

export default Home;