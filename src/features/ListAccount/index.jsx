import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";

const ListAccount = () => {
  let history = useHistory();
  /* const [data, setData] = useState([]);
   const [tempAccount, setTempAccount] = useState([]);
 
   const [showAccount, setShowAccount] = useState(false);
 
   const userName = useRef();
   const name = useRef();
   const address = useRef();
   const phone = useRef();
   const birthDate = useRef();
   const gender = useRef();
 
   const handle
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
 
   useEffect(() => {
     if (!localStorage.getItem("token")) history.push("/");
   }, []);
 
   useEffect(() => {
     callApiUser();
   }, []);
   const handleShowAccount = () => {
     setTempAccount();
     setShowAccount(true);
   }
 */
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Họ và tên</th>
          <th>Tên đăng nhập</th>
          <th>Địa chỉ</th>
          <th>Số điện thoại</th>
          <th>Ngày sinh</th>
          <th>Giới tính</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Thu Phuong</td>
          <td>Phuong1234</td>
          <td>jgjygtjuy</td>
          <td>01659784</td>
          <td>12/12/2020</td>
          <td>Nu</td>
        </tr>
        <tr>
          <td>Le Hien</td>
          <td>Hien123</td>
          <td>bjhkh</td>
          <td>012658578</td>
          <td>10/11/2020</td>
          <td>Nam</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ListAccount;
