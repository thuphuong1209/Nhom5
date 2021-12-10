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
            <th>Họ và tên</th>
            <th>Tên đăng nhập</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
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
              <td>Nữ</td>
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
          <Modal.Title>Cập nhật</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control ref={name} defaultValue={tempDataUpdate.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên đăng nhập</Form.Label>
              <Form.Control ref={userName} defaultValue={tempDataUpdate.userName} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control ref={address} defaultValue={tempDataUpdate.address} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control ref={phone} defaultValue={tempDataUpdate.phone} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control ref={birthDate} defaultValue={tempDataUpdate.birthDate} />
            </Form.Group>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>

    </React.Fragment>
  );
};

export default ListAccount;
