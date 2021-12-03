import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";

const ListAccount = () => {
  let history = useHistory();

  useMemo(() => {
    if (!localStorage.getItem("token")) history.push("/");
  }, []);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ListAccount;
