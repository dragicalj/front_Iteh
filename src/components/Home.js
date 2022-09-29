import React from "react";
import Post from "./Post/Post";
import { useState } from "react";
import GroupList from "./GroupList";
import PostForm from "./PostForm";
import NavBar from "./NavBar";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import logo from "../components/assets/logo.gif";
import HomeNavBar from "../components/HomeNavBar";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [deleteGroupName, setDeleteGroupName] = useState("");
  const [newUserName, setNewUserName] = useState("");

  const [joinGroupName, setJoinGruopName] = useState("");
  let navigate = useNavigate();
  var isJoined = false;
  var isDeleted = false;
  //const[isUpdated1, setIsUpdated1]=useState(false);
  var isUpdated1 = false;

  var groups;

  React.useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      console.log("Uslo ovde nekako");
      navigate("../login", { replace: true });
    }
    callGetPosts();
    callGetUserData();
  }, []);

  const callGetPosts = async (e) => {
    const posts = await getPosts(JSON.parse(localStorage.getItem("username")));
    localStorage.setItem("posts", JSON.stringify(posts));
    setIsLoaded(true);
    console.log("OVDE SU POSTOVI");
    console.log(posts);
  };

  const callGetUserData = async (e) => {
    var username = JSON.parse(localStorage.getItem("username"));
    const userData = await getUserData(username);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("groups", JSON.stringify(userData.groups));
    console.log("OVDE SU USER DATA");
    console.log(userData);
    groups = userData.groups;
    setIsLoaded2(true);
  };

  if (isLoaded && isLoaded2) {
    return (
     
      <div style={{ textAlign: "left", width: "100%" }}>
        <HomeNavBar></HomeNavBar>
        <div class="row">
          <div
            class="col"
            style={{ marginTop: "80px", width: "300px", marginLeft: "10px" }}
          >
            <a
              style={{
                textAlign: "center",
                width: "300px",
                fontWeight: "bold",
                fontSize: "20px",
                marginLeft: "10px",
              }}
              class="list-group-item"
              id="list-home-list"
              data-toggle="list"
              role="tab"
              aria-controls="home"
            >
              MY GROUPS
            </a>
            <GroupList></GroupList>

            <div
              style={{ marginTop: "40px", marginLeft: "10px", width: "300px" }}
            >
            </div>
          </div>
          <div class="col-8" style={{ marginTop: "50px" }}>
            <PostForm
              groups={JSON.parse(localStorage.getItem("userData")).groups}
            />
            {JSON.parse(localStorage.getItem("posts")).map((post) => (
              <Post post={post} />
            ))}
          </div>
          <div class="col"></div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <img src={logo} alt="loading..." />
        </h1>
      </div>
    );
  }
}

async function getPosts(username) {
  return fetch("http://localhost:8090/api/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,PATCH,OPTIONS",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username }),
  }).then((data) => data.json());
}

async function getUserData(username) {
  return fetch("http://localhost:8090/api/user/" + username, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,PATCH,OPTIONS",
    },
  }).then((data) => data.json());
}

async function createGroup(groupname) {
  return fetch("http://localhost:8090/api/group/save", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: groupname }),
  }).then((data) => data.json());
}

export default Home;
