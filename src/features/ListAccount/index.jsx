import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button, Modal, Card, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { GlobalContext } from "../../useContext";

const ListAccount = () => {
  let history = useHistory();
  const [data, setData] = useState([]);

  const [showUpdate, setShowUpdate] = useState(false);

  const [tempUserId, setTempUserId] = useState();
  const [tempDataUpdate, setDataUpdate] = useState([]);
  const handleCloseUpdate = () => setShowUpdate(false);


  const name = useRef();
  const userName = useRef();
  const address = useRef();
  const phone = useRef();
  const birthDate = useRef();
  const gender = useRef();

  useEffect(() => {
    if (!localStorage.getItem("token")) history.push("/");
    callApiUser();
  }, []);

  const callApiUser = () => {
    axios
      .get(`http://localhost:8080/user`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };

  const handleShowUpdate = (userId) => {
    setShowUpdate(true);
    setTempUserId(userId);
    axios
      .get(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setDataUpdate(res.data);
      });
  };

  const handleUpdate = () => {
    console.log(tempUserId)
    axios
      .put(
        `http://localhost:8080/user/${tempUserId}`,
        {
          name: name.current.value,
          userName: userName.current.value,
          address: address.current.value,
          phone: phone.current.value,
          birthDate: birthDate.current.value,
          gender: gender.current.value,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setShowUpdate(false);
        callApiUser();
      });

  };



  return (
    <React.Fragment>
      <Table striped bordered hover className="align-middle text-center">
        <thead>
          <tr>
            <th>H??? v?? t??n</th>
            <th>T??n ????ng nh???p</th>
            <th>?????a ch???</th>
            <th>S??? ??i???n tho???i</th>
            <th>Ng??y sinh</th>
            <th>Gi???i t??nh</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.userId}>
              <td>{item.name}</td>
              <td>{item.userName}</td>
              <td>{item.address}</td>
              <td>{item.phone}</td>
              <td>{item.birthDate}</td>
              <td>N???</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleShowUpdate(item.userId)}
                >
                  <i className="fas fa-pen-square"></i>
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
      {/* MODAL UPDATE */}
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>C???p nh???t</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>H??? v?? t??n</Form.Label>
              <Form.Control ref={name} defaultValue={tempDataUpdate.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>T??n ????ng nh???p</Form.Label>
              <Form.Control ref={userName} defaultValue={tempDataUpdate.userName} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>?????a ch???</Form.Label>
              <Form.Control ref={address} defaultValue={tempDataUpdate.address} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>S??? ??i???n tho???i</Form.Label>
              <Form.Control ref={phone} defaultValue={tempDataUpdate.phone} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ng??y sinh</Form.Label>
              <Form.Control ref={birthDate} defaultValue={tempDataUpdate.birthDate} />
            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            ????ng
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            C???p nh???t
          </Button>
        </Modal.Footer>
      </Modal>

    </React.Fragment>
  );
};

export default ListAccount;
