/*import React from "react";
import { Button, Form } from "react-bootstrap";

const Register = () => {
  return (
    <div className="border px-5 py-5 mt-1 ">
      <div class="mb-3 text-center">
        <h3>ĐĂNG KÍ</h3>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Tài khoản</Form.Label>
          <Form.Control placeholder="Enter username" />
          <Form.Text className="text-muted">
            Tài khoản không chứa kí tự đặc biệt
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Đăng Kí
        </Button>
      </Form>
    </div>
  );
};

export default Register;
*/
import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Button, Form } from "react-bootstrap";


function Register() {
  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState("true");

  let history = useHistory();


  const submitSignup = () => {
    axios.post("http://localhost:8080/user", {
      "userName": username,
      "password": password,
      "name": name,
      "address": address,
      "phone": phone,
      "birthDate": birthday,
      "gender": gender,
      "role": 1
    })
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form>
      <div className="container">

        <div className="form-group">
          <label htmlFor="name"> Họ và tên: </label>
          <input name="name" type="text" placeholder="Nhập họ và tên" className="form-control"
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username"> Tên đăng nhập: </label>
          <input name="username" type="text" placeholder="Nhập tên đăng nhập" className="form-control"
            onChange={e => setUsername(e.target.value)}
          />

        </div>
        <div className="form-group">
          <label htmlFor="password"> Mật khẩu: </label>
          <input name="password" type="password" placeholder="Nhập mật khẩu" className="form-control"
            onChange={e => setPassword(e.target.value)}
          />

        </div>
        <div className="form-group">
          <label htmlFor="address"> Địa chỉ: </label>
          <input name="address" type="text" placeholder="Nhập địa chỉ" className="form-control"
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone"> Số điện thoại: </label>
          <input name="phone" type="text" placeholder="Nhập số điện thoại" className="form-control"
            onChange={e => setPhone(e.target.value)}
          />

        </div>
        <div className="form-group">
          <label htmlFor="birthday"> Ngày sinh: </label>
          <input name="birthday" type="date" className="form-control"
            onChange={e => setBirthday(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender"> Giới tính: </label>
          <select onChange={e => setGender(e.target.value)} defaultValue="selected" className="form-control">
            <option selected value="true">Nam</option>
            <option value="false">Nu</option>
          </select>
        </div>

        <Button variant="primary" type="submit">
          Đăng Kí
        </Button>
      </div>
    </form >

  )
}

export default Register;


