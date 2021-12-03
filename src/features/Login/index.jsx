import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  let history = useHistory();
  const userName = useRef();
  const password = useRef();

  const login = () => {
    if (userName.current.value !== "" && password.current.value !== "") {
      const passwordDB = window.btoa(
        userName.current.value + ":" + password.current.value
      );
      axios
        .post("http://localhost:8080/authenticate", {
          username: userName.current.value,
          password: passwordDB,
        })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            history.push("/list-book");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else console.log("NULL");
  };

  return (
    <div className="border px-5 py-5 mt-1 ">
      <div class="mb-3 text-center">
        <h3>ĐĂNG NHẬP</h3>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Tài khoản</Form.Label>
          <Form.Control ref={userName} placeholder="Enter username" />
          <Form.Text className="text-muted">
            Tài khoản không chứa kí tự đặc biệt
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control ref={password} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" onClick={login}>
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};

export default Login;
