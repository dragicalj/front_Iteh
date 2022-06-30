import React from 'react'
import {Link } from "react-router-dom";
import Login from './Login';
import Post from './Post';
import { useState } from 'react';
import PostForm from './PostForm';


function Home() {

  const [posts, setPosts] = useState();

  React.useEffect(() => {
    callGetPosts();
  }, []);


  const callGetPosts = async e => {
    const posts = await getPosts({});
    localStorage.setItem("posts", JSON.stringify(posts));
    console.log(posts)
  };


  
  
  return (
    <>
    <div style={{marginTop : "20px"}}>
      <div style={{marginBottom : "50px"}} className = "container">
        <PostForm/>
      </div>
     {JSON.parse(localStorage.getItem("posts")).map((post) => (
        <Post post={post}/>
      ))}
    </div>
    </>
  )
}

async function getPosts() {

  //console.log(JSON.stringify(credentials))
  return fetch('http://localhost:8090/api/posts', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'POST,GET,PATCH,OPTIONS'
    },
  })
    .then(data => data.json())
       
 }

export default Home;