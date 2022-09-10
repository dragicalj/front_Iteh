import Table from "react-bootstrap/Table";

function BasicExample() {
  let groups = JSON.parse(localStorage.getItem("groups"));

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((g) => (
          <tr>
            <td>{g.groupID}</td>
            <td>{g.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BasicExample;
