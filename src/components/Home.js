import React from 'react'
import {Link } from "react-router-dom";
import Login from './Login';
import Post from './Post/Post';
import { useState } from 'react';
import GroupList from './GroupList';
import PostForm from './PostForm';
import NavBar from './NavBar';



function Home() {

  
  const[isLoaded, setIsLoaded]=useState(false);
  const[isLoaded2, setIsLoaded2]=useState(false);

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
    console.log(userData)
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsLoaded2(true);
  }


  
  if(isLoaded && isLoaded2) {
  return (

    <div style={{textAlign: "left", width:"100%"}}>
      <NavBar></NavBar>
      <div class="row">
        <div class="col" style={{marginTop:"80px", width : "300px", marginLeft : "10px"}}>
        <a style={{textAlign : "center", width : "300px", fontWeight : "bold" , fontSize : "20px"}} class="list-group-item" id="list-home-list" data-toggle="list" role="tab" aria-controls="home">MY GROUPS</a>
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