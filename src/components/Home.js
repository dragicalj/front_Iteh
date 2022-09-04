import React from 'react'
import Post from './Post/Post';
import { useState } from 'react';
import GroupList from './GroupList';
import PostForm from './PostForm';
import NavBar from './NavBar';
import Login from './Login';
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router';

function Home() {
 
  const[isLoaded, setIsLoaded]=useState(false);
  const[isLoaded2, setIsLoaded2]=useState(false);
  const[groupName, setGroupName] = useState("");
  const[deleteGroupName, setDeleteGroupName] = useState("");
  const[newUserName, setNewUserName] = useState("");

  const[joinGroupName, setJoinGruopName] = useState("");
  let navigate = useNavigate();
  var isJoined = false;
  var isDeleted = false;
  //const[isUpdated1, setIsUpdated1]=useState(false);
  var isUpdated1 = false;

  var groups;

  React.useEffect(() => {
    
    if(!JSON.parse(localStorage.getItem("token"))) {
      console.log("Uslo ovde nekako")
      navigate("../login", { replace: true });
    }
      callGetPosts();
      callGetUserData();
  }, []);



  const callGetPosts = async e => {
    const posts = await getPosts(JSON.parse(localStorage.getItem("username")));
    localStorage.setItem("posts", JSON.stringify(posts));
    setIsLoaded(true);
    console.log("OVDE SU POSTOVI")
    console.log(posts)
  };

  const callGetUserData = async e => {
    var username = JSON.parse(localStorage.getItem("username"))
    const userData = await getUserData(username);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("groups", JSON.stringify(userData.groups));
    console.log("OVDE SU USER DATA")
    console.log(userData)
    groups = userData.groups;
    setIsLoaded2(true);
  }


  const callCreateGroup = async e => {
    e.preventDefault();
    const groupInformations = await createGroup(groupName);
    localStorage.setItem("groupInformations", JSON.stringify(groupInformations));
    alert("Group '" + groupName + "'created!");
    const joinResponse = await joinGroup(JSON.parse(localStorage.getItem("username")), groupName);
    window.location.reload(false);
  }

  const callDeleteGroup = async e => {
    e.preventDefault(); 
    await deleteGroup(deleteGroupName, JSON.parse(localStorage.getItem("username")));
    if(isDeleted) {
      alert("Group '" + deleteGroupName + "' deleted!");
    } else {
      alert("Group : '" + deleteGroupName + "' doesn't exist");
    }
    window.location.reload(false);
  }

  const callUpdateUser = async e => {
    e.preventDefault(); 
    await updateUser(JSON.parse(localStorage.getItem("username")), newUserName);
    if(isUpdated1) {
      alert("User name changed!");
    } else {
      alert("Unsuccessful! Try again!");
    }
    window.location.reload(false);
  }

  const callJoinGroup = async e => {
    e.preventDefault();
    await joinGroup(JSON.parse(localStorage.getItem("username")), joinGroupName);
    if(isJoined) {
      alert("successfully joined in '" + joinGroupName + "' group");
    } else {
      alert("Group : '" + joinGroupName + "' doesn't exist");
    }
    window.location.reload(false);
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
          <Form.Control type="text" placeholder="Enter group name" onChange={e => setJoinGruopName(e.target.value)}/>
          <Form.Text className="text-muted">
             Join to group and share posts with your friends.
          </Form.Text>
          </Form.Group>
          <button className="btn btn-primary" style={{width : "300px"}} type="submit" onClick={callJoinGroup}>
            Join group
          </button>
          </Form>
          </div>

          <div style={{marginTop: "40px", marginLeft:"10px", width: "300px" }}>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{fontWeight : "bold"}}>Delete group</Form.Label>
          <Form.Control type="text" placeholder="Enter group name" onChange={e => setDeleteGroupName(e.target.value)}/>
          <Form.Text className="text-muted">
             Delete group if you think that there is anymore to talk about.
          </Form.Text>
          </Form.Group>
          <button className="btn btn-primary" style={{width : "300px"}} type="submit" onClick={callDeleteGroup}>
            Delete group
          </button>
          </Form>
          </div>
          
          <div style={{marginTop: "40px", marginLeft:"10px", width: "300px" }}>
          <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{fontWeight : "bold"}}>Change your name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" onChange={e => setNewUserName(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
          </Form.Group>
          <button className="btn btn-primary" style={{width : "300px"}} type="submit" onClick={callUpdateUser}>
            Save changes
          </button>
          </Form>
          </div>
        </div>
        <div class="col-8" style={{marginTop:"50px"}}>
          <PostForm groups={JSON.parse(localStorage.getItem("userData")).groups}/>
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


  async function joinGroup(username, groupname) {
    return fetch('http://localhost:8090/api/group/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {username : username , groupname : groupname})
      })
      .then(function(response) {
        if(response.ok) {
          console.log("Uspesno joinovan!")
          isJoined = true;
        }
        else {
          isJoined = false;
        }
      })
  }

  async function deleteGroup(groupname, username) {
    return fetch('http://localhost:8090/api/group/'+ groupname + '/'+ username, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'POST,GET,DELETE,PATCH,OPTIONS'
      },
    })
      .then(function(response) {
        if(response.ok) {
          isDeleted = true;
        } else {
          isDeleted = false;
        }
      })
  }
async function updateUser(username, newName) {
  return fetch('http://localhost:8090/api/user/update', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {username : username , newName : newName})
    })
    .then(function(response) {
      if(response.ok) {
        console.log("Uspesno promenjeno ime!")
        isUpdated1 = true;
      }
      else {
        isUpdated1 = false;
      }
    })
}
}



async function getPosts(username) {
  return fetch('http://localhost:8090/api/posts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'POST,GET,PATCH,OPTIONS',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {username : username})
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






export default Home;