import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Form} from "react-bootstrap";
import { useState } from 'react';

function ModalDialog() {
  const [isShow, invokeModal] = React.useState(false)
  const[groupName, setGroupName] = useState("");
  const[newGroupName, setNewGroupName] = useState("");
  const initModal = () => {
    return invokeModal(!isShow)
  }
  const callChangeGroupName = async e => {
    e.preventDefault(); 
    var groups = await changeGroupName(groupName, newGroupName);
    alert("Group '" + groupName + "'changed!");
    window.location.reload(false);
  }
  return (
    <>
      <Button variant="success" onClick={initModal}>
        Open Modal
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Change group name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form style={{marginLeft : "20px"}}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{fontWeight : "bold"}}>Enter group name</Form.Label>
                <Form.Control type="text" placeholder="Old group name" onChange={e => setGroupName(e.target.value)}/>
                <Form.Label style={{fontWeight : "bold"}}>Enter new group name</Form.Label>
                <Form.Control type="text" placeholder="New group name" onChange={e => setNewGroupName(e.target.value)}/>
                <Form.Text className="text-muted">
                </Form.Text>
                </Form.Group>
            </Form>
         </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
          <Button variant="dark" onClick={callChangeGroupName}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
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
export default ModalDialog