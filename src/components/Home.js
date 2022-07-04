import React from 'react'
import {Link } from "react-router-dom";
import Login from './Login';
import Post from './Post/Post';
import { useState } from 'react';
import GroupList from './GroupList';
import PostForm from './PostForm';
import NavBar from './NavBar';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'

function Home() {

  
  const[isLoaded, setIsLoaded]=useState(false);
  const[isLoaded2, setIsLoaded2]=useState(false);
  const[groupName, setGroupName] = useState("");

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
    setIsLoaded2(true);
  }


  const callCreateGroup = async e => {
    e.preventDefault();
    const groupInformations = await createGroup(groupName);
    localStorage.setItem("groupInformations", JSON.stringify(groupInformations));
    const joinResponse = await joinGroup(JSON.parse(localStorage.getItem("username")), groupName);
    alert("Successfully created group");
    window.location.reload(true);
  }


  
  if(isLoaded && isLoaded2) {
  return (

    <div style={{textAlign: "left", width:"100%"}}>
      <NavBar></NavBar>
      <div class="row">
        <div class="col" style={{marginTop:"80px", width : "300px", marginLeft : "10px"}}>
          <a style={{textAlign : "center", width : "300px", fontWeight : "bold" , fontSize : "20px", marginLeft:"10px"}} class="list-group-item" id="list-home-list" data-toggle="list" role="tab" aria-controls="home">MY GROUPS</a>
          <GroupList>
          </GroupList>

          <div style={{marginTop: "40px", marginLeft:"10px", width: "300px" }}>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{fontWeight : "bold"}}>Create new group</Form.Label>
          <Form.Control type="text" placeholder="Enter group name" onChange={e => setGroupName(e.target.value)}/>
          <Form.Text className="text-muted">
             Create new group and share posts with your friends.
          </Form.Text>
          </Form.Group>
          <button className="btn btn-primary" style={{width : "300px"}} type="submit" onClick={callCreateGroup}>
            Create group
          </button>
          </Form>
          </div>

          <div style={{marginTop: "40px", marginLeft:"10px", width: "300px" }}>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{fontWeight : "bold"}}>Join group</Form.Label>
          <Form.Control type="text" placeholder="Enter group name" />
          <Form.Text className="text-muted">
             Join to group and share posts with your friends.
          </Form.Text>
          </Form.Group>
          <button className="btn btn-primary" style={{width : "300px"}} type="submit">
            Join group
          </button>
          </Form>
          </div>
          

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

async function createGroup(groupname) {
  return fetch('http://localhost:8090/api/group/save', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {name : groupname})
    })
      .then(data => data.json())
}

async function joinGroup(username, groupname) {
  return fetch('http://localhost:8090/api/group/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {username : username , groupName : groupname})
    })
      .then(data => data.json())
}



export default Home;