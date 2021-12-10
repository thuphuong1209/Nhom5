import React, { useState, useEffect, useRef, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Table, Button, Modal, Card, Form, Alert } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const ListBook = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [tempArray, setTempArray] = useState([]);
  const [tempBookId, setTempBookId] = useState();
  const [tempDataUpdate, setDataUpdate] = useState([]);

  const [showDetail, setShowDetail] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

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
  console.log(tempArray, tempBookId)

  const handleBorrow = async () => {
    try {
      const data = {
        userId: localStorage.getItem("userId"),
        statusBorrow: "NOT_YET",
        bookId: tempBookId,
        quantity: 1,
        date: new Date(),
        payDate: null
      }
      const response = await axios.post("http://localhost:8080/borrow", data
        , {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      if (response.data) {
        toast.success("Muợn sách thành công");
        handleCloseDetail();
      }
    } catch (error) {
      console.log(error)
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
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Số lượng</th>
            <th>Thể loại</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
      {/* MODAL SHOW DETAL */}
      <Modal show={showDetail} onHide={handleCloseDetail}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết</Modal.Title>
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
                Tác giả: {tempArray.author} - Số lượng:
                {tempArray.quantity}

              </small>
            </Card.Footer>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleBorrow}>
            Mượn sách
          </Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL UPDATE */}
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên sách</Form.Label>
              <Form.Control ref={title} defaultValue={tempDataUpdate.name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tác giả</Form.Label>
              <Form.Control ref={author} defaultValue={tempDataUpdate.author} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                ref={quantity}
                defaultValue={tempDataUpdate.quantity}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Thể loại</Form.Label>
              <Form.Control ref={type} defaultValue={tempDataUpdate.type} />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Nội dung</Form.Label>
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
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
      {/* MODAL DELETE */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Body>Bạn có muốn xoá sách này không</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ListBook;
