import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useState } from "react";

function ModalDialog(props) {
  const [groupName, setGroupName] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const initModal = () => {
    props.onClick();
  };

  const callCreateGroup = async (e) => {
    e.preventDefault();
    const groupInformations = await createGroup(groupName, JSON.parse(localStorage.getItem("username")));
    localStorage.setItem(
      "groupInformations",
      JSON.stringify(groupInformations)
    );
  };

  const callJoinGroup = async (e) => {
    e.preventDefault();
    await joinGroup(
      JSON.parse(localStorage.getItem("username")), groupName);
  };

  const callDeleteGroup = async (e) => {
    e.preventDefault();
    await deleteGroup(groupName, JSON.parse(localStorage.getItem("username"))
    );
  };
  return (
    <>
      <Modal show={props.isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ marginLeft: "20px" }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ fontWeight: "bold" }}>
                Group name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter group name"
                onChange={(e) => setGroupName(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
          {props.create && (
              <Button variant="dark" onClick={callCreateGroup}>
              Save
            </Button>
            )}
         {props.join && (
              <Button variant="dark" onClick={callJoinGroup}>
              Join
            </Button>
            )}  
        {props.delete && (
              <Button variant="dark" onClick={callDeleteGroup}>
              Delete
            </Button>
            )}        
        </Modal.Footer>
      </Modal>
    </>
  );
}

function reload(){
    window.location.reload(false);
}

async function createGroup(groupname, username) {
    return fetch("http://localhost:8090/api/group/save", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupname: groupname, username : username}),
    }).then(function (response) {
        if (response.ok) {
          console.log("Uspesno kreirana grupa!");
          alert("Group created successfuly");
          reload();
        } else {
          console.log("Neuspesno kreirana grupa");
          response.json().then((json) => {
            console.log(json.message);
            alert(json.message);
          });
        }
      });
  }

  async function joinGroup(username, groupname) {
    return fetch("http://localhost:8090/api/group/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, groupname: groupname }),
    }).then(function (response) {
        if (response.ok) {
          console.log("Uclanjen u grupu!");
          alert("Group joined");
          reload();
        } else {
          console.log("Neuspesno kreirana grupa");
          response.json().then((json) => {
            console.log(json.message);
            alert(json.message);
          });
        }
      });
  }

  async function deleteGroup(groupname, username) {
    return fetch(
      "http://localhost:8090/api/group/" + groupname + "/" + username,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST,GET,DELETE,PATCH,OPTIONS",
        },
      }
    ).then(function (response) {
        if (response.ok) {
          console.log("Obrisana grupa");
          alert("Group deleted");
          reload();
        } else {
          console.log("Neuspesno obrisana grupa");
          response.json().then((json) => {
            console.log(json.message);
            alert(json.message);
          });
        }
      });
  }
export default ModalDialog;
