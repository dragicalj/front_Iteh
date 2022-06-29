import React from 'react'
import {Link } from "react-router-dom";
import Login from './Login';
import Post from './Post';
import { useState } from 'react';


function Home({token}) {

  const [posts, setPosts] = useState();
  
  return (
      <>
    <div>
      <Post token={token}/>
      </div></>
  )
}

export default Home;