import React, { useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  let history = useHistory();

  useMemo(() => {
    if (!localStorage.getItem("token")) history.push("/");
  }, []);

  useEffect(() => {
    localStorage.removeItem("token");
    history.push("/");
  }, []);
  return <></>;
};

export default Logout;
