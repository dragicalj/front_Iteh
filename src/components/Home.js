import React from 'react'
import {Link } from "react-router-dom";
import Login from './Login';
import Post from './Post/Post';
import { useState } from 'react';
import GroupList from './GroupList';
import PostForm from './PostForm';



function Home() {

  
  const[isLoaded, setIsLoaded]=useState(false);

  React.useEffect(() => {
      callGetPosts();
      callGetUserData();
  }, []);



  const callGetPosts = async e => {
    const posts = await getPosts({});
    localStorage.setItem("posts", JSON.stringify(posts));
    setIsLoaded(true);
  };

  const callGetUserData = async e => {
    var username = JSON.parse(localStorage.getItem("username"))
    const userData = await getUserData(username);
    localStorage.setItem("userData", JSON.stringify(userData));
  }


  
  if(isLoaded) {
  return (

    <div class="container" style={{textAlign: "left"}}>
      <div class="row">
        <div class="col" style={{marginTop:"380px", width : "200px"}}>
          <GroupList>
          </GroupList>
        </div>
        <div class="col-8" style={{marginTop:"50px"}}>
          <PostForm/>
          {JSON.parse(localStorage.getItem("posts")).map((post) => (
          <Post post={post}/>
        ))}
        </div>
        <div class="col">
      
        </div>
      </div>
    </div>

    // <>
    // <div style={{marginTop : "20px"}}>
    //   <div style={{marginBottom : "50px"}} className = "container">
    //     <PostForm/>
    //   </div>
    //  {JSON.parse(localStorage.getItem("posts")).map((post) => (
    //     <Post post={post}/>
    //   ))}
    //   <GroupList></GroupList>
    // </div>
    // </>
  ) } else {
    return (
      <div>
        <h1> LOADING ... </h1>
      </div>
    )
  }

}

async function getPosts() {
  console.log("lalalla")
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

async function getUserData(username) {
  return fetch('http://localhost:8090/api/user/'+username, {
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