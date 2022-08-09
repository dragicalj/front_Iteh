import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

function CreateUserForm() {

    const[name, setName] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[role, setRole] = useState("");

    const saveUser = async e => {
        e.preventDefault();
        console.log("Name");
        console.log(name);
        console.log("Role");
        console.log(role);
      }

  return (
    <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Name</Form.Label>
          <Form.Control id="disabledTextInput" placeholder="Enter name"  onChange={e => setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Username</Form.Label>
          <Form.Control id="disabledTextInput" placeholder="Enter username" onChange={e => setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Password</Form.Label>
          <Form.Control id="disabledTextInput" placeholder="Enter password" type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledSelect" >Role</Form.Label>
          <Form.Control 
          as="select"
          onChange={e => setRole(e.target.value)}>
            <option>Select role</option>
            <option>User</option>
            <option>Admin</option>
          </Form.Control>
        </Form.Group> 
        <Button type="submit" onClick={saveUser}>Submit</Button>
    </Form>
  );
}

export default CreateUserForm;