import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";

const AddBook = () => {
  let history = useHistory();

  useMemo(() => {
    if (!localStorage.getItem("token")) history.push("/");
  }, []);
  return <div></div>;
};

export default AddBook;
