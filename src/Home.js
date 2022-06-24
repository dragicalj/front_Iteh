import React from 'react'
import {Link } from "react-router-dom";
import Login from './Login';
import Post from './Post';


function Home({token}) {
  
  return (
      <>
    <div>
      <Post token={token}/>
      </div></>
  )
}

export default Home;