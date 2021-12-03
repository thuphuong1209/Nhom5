import React, { useMemo } from "react";
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";


const SearchBook = () => {
  let history = useHistory();

  useMemo(() => {
    if (!localStorage.getItem("token")) history.push("/");
  }, []);
  return <div></div>;
};


export default SearchBook;
