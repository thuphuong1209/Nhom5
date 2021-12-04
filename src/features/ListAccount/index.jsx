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
          <th>Stt</th>
          <th>Họ và tên</th>
          <th>Tên đăng nhập</th>
          <th>Số điện thoại</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>01659784</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>012658578</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ListAccount;
