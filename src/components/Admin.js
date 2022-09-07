
import React from "react";
import { useState } from 'react';
import NavBar from './NavBar';
import BasicTable from './BasicTable'
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useNavigate } from 'react-router';
import ChartForAdmin from "./ChartForAdmin";
import './Admin.css';
import ModalDialog from "./ModalDialog";

function Admin() {
  const[isLoaded, setIsLoaded]=useState(false);
  const[groupName, setGroupName] = useState("");
  const[newGroupName, setNewGroupName] = useState("");
  const[groupNamesForChart, setGroupNamesForChart] = useState([]);
  const[userInGroup, setUsersInGroup] = useState([]);
  const [isShow, invokeModal] = React.useState(true)

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
    //callGetGroupReport()
}, []);

 const callGetGroups = async e => {
    var groups = await getGroups();
    localStorage.setItem("groups", JSON.stringify(groups));
    setIsLoaded(true);
    console.log("OVO SU GRUPE ADMIN")
    console.log(groups)
  }

  const callGetGroupReport = async e =>{
    var report = await getGroupReport(groupName);
    setGroupNamesForChart([...groupNamesForChart,groupName]);
    setUsersInGroup([...userInGroup,report.userCount]);
    console.log("Ovo je report grupe");
    console.log(report);
  }

  const callDownloadGroupReport = async e =>{
    console.log("radi");
    var csvReport = await getCSVDataForReport(groupNamesForChart);
    console.log(csvReport);
    const element = document.createElement("a");
    const file = new Blob([csvReport.data],{
      type:"text/plain;charset-utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "data.csv";
    document.body.appendChild(element);
    element.click(); 
  }

if(isLoaded){
  return (
    <div style={{textAlign: "left", width:"100%"}}>
      <NavBar></NavBar>
      <div className="container mt-3">
      <ModalDialog />
      </div>
      <div class="row" style={{width : "80%", textAlign : "center" , marginLeft : "100px" , marginTop : "100px"}}>
        <a style={{textAlign : "center", width : "900px", fontWeight : "bold" , fontSize : "20px", marginLeft:"200px", marginBottom : "30px"}} class="list-group-item" id="list-home-list" data-toggle="list" role="tab" aria-controls="home">CHART</a>
        <Form.Label style={{fontWeight : "bold"}}>Enter group name</Form.Label>
        <Form.Control type="text" placeholder="New group name" onChange={e => setGroupName(e.target.value)}/>
        <div>
        <button id = "addGroupButton" className="btn btn-primary" style={{width : "300px"}} type="submit" onClick={callGetGroupReport}>Add group</button>
        <button id = "downloadCSVButton" className="btn btn-primary" style={{width : "300px"}} type="submit" onClick={callDownloadGroupReport}>Download report</button>
        </div>
        <ChartForAdmin data = {{groupNamesForChart, userInGroup}}></ChartForAdmin>
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

async function changeGroupName(toUpdateG, newNameG) {
  return fetch('http://localhost:8090/api/admin/group/update', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {toUpdate : toUpdateG, newName: newNameG})
    })
      .then(data => data.json())
}

async function getGroupReport(groupname) {
  return fetch('http://localhost:8090/api/admin/group/report', {
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

async function getCSVDataForReport(groupNamesForCSV) {
  return fetch('http://localhost:8090/api/admin/report', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(groupNamesForCSV)
    })
      .then(data => data.json())
}

export default Admin;