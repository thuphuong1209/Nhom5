import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Login.css";
import { GlobalContext } from "../../useContext";

const Login = () => {
  const history = useHistory();
  const userName = useRef();
  const password = useRef();
  const { handleLogin } = React.useContext(GlobalContext);
  const login = async () => {
    if (userName.current.value !== "" && password.current.value !== "") {
      const passwordDB = window.btoa(
        userName.current.value + ":" + password.current.value
      );
      await axios
        .post("http://localhost:8080/authenticate", {
          username: userName.current.value,
          password: passwordDB,
        })
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("name", res.data.name);
            console.log("run local");
            handleLogin({
              ...res.data,
              isLoggedIn: true,
              isAdmin: res.data.role === "admin",
            });
            history.push("/home");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else console.log("NULL");
  };

  return (
    <div className="border px-5 py-5 mt-1 ">
      <div className="text-center">
        {" "}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_Kinh_t%E1%BA%BF_%C4%90%C3%A0_N%E1%BA%B5ng.jpg"
          width="150"
          height="150"
        />
      </div>
      <div class="mb-3 text-center">
        <h3>ĐĂNG NHẬP</h3>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Tài khoản</Form.Label>
          <Form.Control ref={userName} placeholder="Nhập tên đăng nhập" />
          <Form.Text className="text-muted">
            Tài khoản không chứa kí tự đặc biệt
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            ref={password}
            type="password"
            placeholder="Nhập mật khẩu"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button className="bt-1" variant="primary" onClick={login}>
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};

export default Login;
