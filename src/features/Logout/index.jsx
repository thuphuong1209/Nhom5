import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("token")) history.push("/");
  }, []);

  useEffect(() => {
    localStorage.clear();
    history.push("/");
  }, []);
  return <></>;
};

export default Logout;
