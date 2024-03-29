import React from "react";
import { useState } from "react";
import {
  Form,
  Button
} from "react-bootstrap";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useNavigate } from "react-router";
import ChartForAdmin from "./ChartForAdmin";
import "./Admin.css";
import logo from "../components/assets/logo.gif";
import TotalUsers from "./total-users";
import { Sales } from "./sales";

function Admin() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNamesForChart, setGroupNamesForChart] = useState([]);
  const [userInGroup, setUsersInGroup] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [increase, setIncrease] = useState(0);

  let navigate = useNavigate();
  React.useEffect(() => {
    if (!JSON.parse(localStorage.getItem("admin"))) {
      console.log("Uslo ovde nekako");
      navigate("../login", { replace: true });
    }
    if (!JSON.parse(localStorage.getItem("token"))) {
      console.log("Uslo ovde nekako");
      navigate("../login", { replace: true });
    }
    callGetGroups();
    callGetUserCount();
    //callGetGroupReport()
  }, []);

  const callGetGroups = async (e) => {
    var groups = await getGroups();
    localStorage.setItem("groups", JSON.stringify(groups));
    setIsLoaded(true);
    console.log("OVO SU GRUPE ADMIN");
    console.log(groups);
  };

  const callGetGroupReport = async (e) => {
    var report = await getGroupReport(groupName);
    setGroupNamesForChart([...groupNamesForChart, groupName]);
    setUsersInGroup([...userInGroup, report.userCount]);
    console.log("Ovo je report grupe");
    console.log(report);
  };

  const callDownloadGroupReport = async (e) => {
    console.log("radi");
    var csvReport = await getCSVDataForReport(groupNamesForChart);
    console.log(csvReport);
    const element = document.createElement("a");
    const file = new Blob([csvReport.data], {
      type: "text/plain;charset-utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "data.csv";
    document.body.appendChild(element);
    element.click();
  };
  const callGetUserCount = async (e) => {
    var userCount = await getUserCount();
    setUserCount(userCount.count);
    setIncrease(userCount.increase)
  };
  

  if (isLoaded) {
    return (
      
     
      <div style={{ textAlign: "left", width: "100%" }}>
         <ResponsiveAppBar></ResponsiveAppBar>
        <div class="pos-f-t">
          <div class="collapse" id="navbarToggleExternalContent">
            <div class="bg-dark p-4">
              <h4 class="text-white">Collapsed content</h4>
              <span class="text-muted">Toggleable via the navbar brand.</span>
            </div>
          </div>
        </div>
        <div className="container mt-3"></div>
        <div
          class="row"
          style={{
            width: "80%",
            textAlign: "center",
            marginLeft: "100px",
            marginTop: "100px",
          }}
        >
          <TotalUsers userCount = {userCount} increase = {increase} ></TotalUsers>
          <Sales></Sales>
          <Form.Label style={{ fontWeight: "bold" }}>
            Enter group name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="New group name"
            onChange={(e) => setGroupName(e.target.value)}
          />
          <div>
            <button
              id="addGroupButton"
              className="btn btn-primary"
              style={{ width: "300px" }}
              type="submit"
              onClick={callGetGroupReport}
            >
              Add group
            </button>
            <button
              id="downloadCSVButton"
              className="btn btn-primary"
              style={{ width: "300px" }}
              type="submit"
              onClick={callDownloadGroupReport}
            >
              Download report
            </button>
          </div>
          <ChartForAdmin
            data={{ groupNamesForChart, userInGroup }}
          ></ChartForAdmin>
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

async function getGroups() {
  return fetch("http://localhost:8090/api/admin/groups", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,PATCH,OPTIONS",
    },
  }).then((data) => data.json());
}

async function changeGroupName(toUpdateG, newNameG) {
  return fetch("http://localhost:8090/api/admin/group/update", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ toUpdate: toUpdateG, newName: newNameG }),
  }).then((data) => data.json());
}

async function getGroupReport(groupname) {
  return fetch("http://localhost:8090/api/admin/group/report", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: groupname }),
  }).then((data) => data.json());
}

async function getCSVDataForReport(groupNamesForCSV) {
  return fetch("http://localhost:8090/api/admin/report", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(groupNamesForCSV),
  }).then((data) => data.json());
}

async function getUserCount() {
  return fetch("http://localhost:8090/api/admin/users/count", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,PATCH,OPTIONS",
    },
  }).then((data) => data.json());
}

export default Admin;
