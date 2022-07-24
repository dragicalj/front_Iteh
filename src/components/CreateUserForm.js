import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateUserForm() {
  return (
    <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Name</Form.Label>
          <Form.Control id="disabledTextInput" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Username</Form.Label>
          <Form.Control id="disabledTextInput" placeholder="Enter username" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Password</Form.Label>
          <Form.Control id="disabledTextInput" placeholder="Enter password" type="password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledSelect">Role</Form.Label>
          <Form.Select id="disabledSelect">
            <option>User</option>
            <option>Admin</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit">Submit</Button>
    </Form>
  );
}

export default CreateUserForm;