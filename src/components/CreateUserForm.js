import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from 'react-router';


function CreateUserForm() {

    const[name, setName] = useState("");
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    let navigate = useNavigate();

    var isRegistered=false;

    console.log("RADISSSSSSS")
    const callRegisterUser = async e => {
        e.preventDefault();
        console.log("Name");
        console.log(name);
        console.log("Username");
        console.log(username);
        console.log("Password");
        console.log(username);
        await registerUser(username, password, name);
        if(isRegistered) {
          alert("User registered successfully")
         
        } else {
          alert("User already exists! Try again")
          
        }
        window.location.reload(false);
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
        
        <Button type="submit" onClick={callRegisterUser}>Submit</Button>
    </Form>
  );

  async function registerUser(username, password, name) {
    return fetch('http://localhost:8090/api/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {username : username, password : password, name : name})
      })
      .then(function(response) {
        if(response.ok) {
          console.log("Uspesno registrovan user!")
          isRegistered = true;
        } else {
          isRegistered = false;
        }
      })
  }
}

export default CreateUserForm;