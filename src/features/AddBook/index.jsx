import React, { useMemo, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Table, Button, Modal, Card, Form, Alert } from "react-bootstrap";

const AddBook = () => {
  let history = useHistory();
  const nameBook = useRef();
  const author = useRef();
  const quantity = useRef();
  const type = useRef();
  const detail = useRef();
  const url = useRef();

  const handleAddBook = () => {
    axios
      .post(`http://localhost:8080/book`, {
        "name": nameBook.current.value,
        "author": author.current.value,
        "quantity": quantity.current.value,
        "type": type.current.value,
        "detail": detail.current.value,
        "url": url.current.value
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      }
      )
      .then(() => {
        history.push("/list-book");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Tên sách</Form.Label>
          <Form.Control ref={nameBook} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Tác giả</Form.Label>
          <Form.Control ref={author} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Số lượng</Form.Label>
          <Form.Control ref={quantity} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Thể loại</Form.Label>
          <Form.Control ref={type} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Nội dung</Form.Label>
          <Form.Control ref={detail} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Url</Form.Label>
          <Form.Control ref={url} />
        </Form.Group>
      </Form>

      <Button variant="primary" onClick={handleAddBook}>
        Thêm
      </Button>
    </div>
  );
};

export default AddBook;
