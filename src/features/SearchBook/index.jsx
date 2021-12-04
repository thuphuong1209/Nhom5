import React, { useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { getToken } from "../../heplers/token";
import axios from "axios";
const SearchBook = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) history.push("/");
  }, []);

  const handleOnClickSearch = async () => {
    try {
      const books = await axios
        .get(`http://localhost:8080/books-search?keyword=${searchValue}`, {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }).then(res => res.data);

      setBooks([...books]);
    } catch (error) {
      console.log(error)
    }

  }
  return <div className="search-book-screen w-100">

    <div className="input-group mb-3 w-100 ">
      <input type="text" className="form-control" placeholder="Tìm kiếm theo tên sách ...." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
      <div className="input-group-append ml-3">
        <button className="btn btn-primary text-center  d-flex align-items-center"
          onClick={handleOnClickSearch}
        >Search
          <FaSearch style={{
            marginLeft: "0.5rem"
          }} />
        </button>
      </div>

    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Số Thứ Tự </th>
          <th scope="col">Tên</th>
          <th scope="col">Tác Giả</th>
          <th scope="col">Số Lượng</th>
          <th scope="col">Loại</th>
          <th scope="col">Link Mô Tả</th>

        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => <tr key={index}>
          <th scope="row" style={{
            minWidth: "2rem"
          }}>{index}</th>
          <td>{book.name}</td>
          <td>{book.author}</td>
          <td>{book.quantity}</td>
          <td>{book.type}</td>
          <td>
            <a href={book.url}>link ảnh</a>
          </td>
        </tr>)}

      </tbody>
    </table>
  </div>;
};


export default SearchBook;
