import React, { useState, useEffect, useRef, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button, Modal, Card, Form, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { GlobalContext } from "../../useContext";

const ListBook = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [tempArray, setTempArray] = useState([]);
  const [tempBookId, setTempBookId] = useState();
  const [tempDataUpdate, setDataUpdate] = useState([]);

  const [showDetail, setShowDetail] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { isAdmin, isLoggedIn } = React.useContext(GlobalContext);
  const title = useRef();
  const author = useRef();
  const quantity = useRef();
  const type = useRef();
  const detail = useRef();
  const url = useRef();

  const handleCloseDetail = () => setShowDetail(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleCloseDelete = () => setShowDelete(false);

  const callApiBook = () => {
    axios
      .get(`http://localhost:8080/book`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) history.push("/");
  }, []);

  useEffect(() => {
    callApiBook();
  }, []);

  const handleShowDetail = (bookId) => {
    setShowDetail(true);
    setTempBookId(bookId);
    axios
      .get(`http://localhost:8080/book/${bookId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTempArray(res.data);
      });
  };

  const handleShowUpdate = (bookId) => {
    setShowUpdate(true);
    setTempBookId(bookId);
    axios
      .get(`http://localhost:8080/book/${bookId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setDataUpdate(res.data);
      });
  };

  const handleShowDelte = (bookId) => {
    setShowDelete(true);
    setTempBookId(bookId);
  };
  console.log(tempArray, tempBookId);

  const handleBorrow = async () => {
    try {
      const data = {
        userId: localStorage.getItem("userId"),
        statusBorrow: "NOT_YET",
        bookId: tempBookId,
        quantity: 1,
        date: new Date(),
        payDate: null,
      };
      const response = await axios.post("http://localhost:8080/borrow", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.data) {
        toast.success("Mu???n s??ch th??nh c??ng");
        handleCloseDetail();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8080/book/${tempBookId}`,
        {
          name: title.current.value,
          author: author.current.value,
          quantity: quantity.current.value,
          type: type.current.value,
          detail: detail.current.value,
          url: url.current.value,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setShowUpdate(false);
        callApiBook();
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/book/${tempBookId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setShowDelete(false);
        callApiBook();
      });
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Table striped bordered hover className="align-middle text-center">
        <thead>
          <tr>
            <th>T??n s??ch</th>
            <th>T??c gi???</th>
            <th>S??? l?????ng</th>
            <th>Th??? lo???i</th>

            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.bookId}>
              <td>{item.name}</td>
              <td>{item.author}</td>
              <td>{item.quantity}</td>
              <td>{item.type}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleShowDetail(item.bookId)}
                >
                  <i className="fas fa-bars"></i>
                </Button>
              </td>
              {isAdmin ? (
                <React.Fragment>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleShowUpdate(item.bookId)}
                    >
                      <i className="fas fa-pen-square"></i>
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleShowDelte(item.bookId)}
                    >
                      <i className="fas fa-trash-alt fa-1x"></i>
                    </Button>
                  </td>
                </React.Fragment>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
      {/* MODAL SHOW DETAL */}
      <Modal show={showDetail} onHide={handleCloseDetail}>
        <Modal.Header closeButton>
          <Modal.Title>Chi ti???t</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Img variant="top" src={tempArray.url} />
            <Card.Body>
              <Card.Title>
                {tempArray.name} - {tempArray.type}
              </Card.Title>
              <Card.Text>{tempArray.detail}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                T??c gi???: {tempArray.author} - S??? l?????ng:
                {tempArray.quantity}
              </small>
            </Card.Footer>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>
            ????ng
          </Button>
          <Button variant="primary" onClick={handleBorrow}>
            M?????n s??ch
          </Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL UPDATE */}
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>C???p nh???t</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>T??n s??ch</Form.Label>
              <Form.Control ref={title} defaultValue={tempDataUpdate.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>T??c gi???</Form.Label>
              <Form.Control ref={author} defaultValue={tempDataUpdate.author} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>S??? l?????ng</Form.Label>
              <Form.Control
                ref={quantity}
                defaultValue={tempDataUpdate.quantity}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Th??? lo???i</Form.Label>
              <Form.Control ref={type} defaultValue={tempDataUpdate.type} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>N???i dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                ref={detail}
                defaultValue={tempDataUpdate.detail}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>URL</Form.Label>
              <Form.Control ref={url} defaultValue={tempDataUpdate.url} />
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
      {/* MODAL DELETE */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Body>B???n c?? mu???n xo?? s??ch n??y kh??ng</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            ????ng
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Xo??
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ListBook;
