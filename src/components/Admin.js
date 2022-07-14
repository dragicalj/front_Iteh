
import React from "react";
import Post from './Post/Post';
import { useState } from 'react';
import GroupList from './GroupList';
import PostForm from './PostForm';
import NavBar from './NavBar';
import BasicTable from './BasicTable'
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useNavigate } from 'react-router';
import ChartForAdmin from "./ChartForAdmin";

  

// Second simple component with heading tag
function Admin() {
  const[isLoaded, setIsLoaded]=useState(false);
  const[groupName, setGroupName] = useState("");
  let navigate = useNavigate();
  React.useEffect(() => {
    if(!JSON.parse(localStorage.getItem("admin"))){
      console.log("Uslo ovde nekako")
      navigate("../login", { replace: true });
    }
    if(!JSON.parse(localStorage.getItem("token"))) {
      console.log("Uslo ovde nekako")
      navigate("../login", { replace: true });
    }
    callGetGroups()
}, []);



  const callGetGroups = async e => {
    var groups = await getGroups();
    localStorage.setItem("groups", JSON.stringify(groups));
    setIsLoaded(true);
    console.log("OVO SU GRUPE ADMIN")
    console.log(groups)
  }
if(isLoaded){
  return (
    
    <div style={{textAlign: "left", width:"100%"}}>
      <NavBar></NavBar>
      
      <div class="row" >
        <div class="col-4" style={{marginTop:"80px", width : "300px", marginLeft : "10px"}}>
            <Form style={{marginLeft : "20px"}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{fontWeight : "bold"}}>Change group name</Form.Label>
            <Form.Control type="text" placeholder="Enter group name" onChange={e => setGroupName(e.target.value)}/>
            <Form.Text className="text-muted">
            </Form.Text>
            </Form.Group>
            <button className="btn btn-primary" style={{width : "300px", marginBottom : "20px"}} type="submit" >
              Change name
            </button>
            </Form>
            <a style={{textAlign : "center", width : "300px", fontWeight : "bold" , fontSize : "20px", marginLeft:"10px", marginBottom : "10px"}} class="list-group-item" id="list-home-list" data-toggle="list" role="tab" aria-controls="home">MY GROUPS</a>
            <GroupList>
            </GroupList>
        </div>
        <div class = "col-8" style={{marginTop:"80px", width : "1000px", marginLeft : "200px"}}>
        <a style={{textAlign : "center", width : "600px", fontWeight : "bold" , fontSize : "20px", marginLeft:"200px", marginBottom : "30px"}} class="list-group-item" id="list-home-list" data-toggle="list" role="tab" aria-controls="home">GROUP TABLE</a>
            <BasicTable></BasicTable>
        </div>
      </div>
      <div class="row" style={{width : "80%", textAlign : "center" , marginLeft : "100px" , marginTop : "100px"}}>
        <a style={{textAlign : "center", width : "900px", fontWeight : "bold" , fontSize : "20px", marginLeft:"200px", marginBottom : "30px"}} class="list-group-item" id="list-home-list" data-toggle="list" role="tab" aria-controls="home">CHART</a>
        <ChartForAdmin></ChartForAdmin>
      </div>
    </div>
  );
}else{
  return (
    <div>
      <h1> LOADING ... </h1>
    </div>
  )
}
}



async function getGroups() {
  return fetch('http://localhost:8090/api/admin/groups', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':'POST,GET,PATCH,OPTIONS'
    },
  })
    .then(data => data.json())
}

export default Admin;