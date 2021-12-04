import React from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import AddAccount from "./features/AddAccount";
import AddBook from "./features/AddBook";
import AddBorrow from "./features/AddBorrow";
import ListAccount from "./features/ListAccount";
import ListBook from "./features/ListBook";
import ListBorrow from "./features/ListBorrow";
import SearchAccount from "./features/SearchAccount";
import SearchBook from "./features/SearchBook";
import SearchBorrow from "./features/SearchBorrow";
import Login from "./features/Login";
import Register from "./features/Register";
import Logout from "./features/Logout";
import Footer from "./components/Footer";
import Home from "./components/Home";

const App = () => {
  const [username, setUserName] = React.useState("");
  React.useEffect(() => {
    const name = localStorage.getItem("name");
    console.log("run")
    setUserName(name);
  }, [window.location.pathname])
  return (
    <Container>
      <Router>
        <Header username={username} setUserName={setUserName} />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/list-book">
            <ListBook />
          </Route>
          <Route path="/add-book">
            <AddBook />
          </Route>
          <Route path="/search-book">
            <SearchBook />
          </Route>
          <Route path="/list-account">
            <ListAccount />
          </Route>
          <Route path="/add-account">
            <AddAccount />
          </Route>
          <Route path="/search-account">
            <SearchAccount />
          </Route>
          <Route path="/list-borrow">
            <ListBorrow />
          </Route>
          <Route path="/add-borrow">
            <AddBorrow />
          </Route>
          <Route path="/search-borrow">
            <SearchBorrow />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Container >
  );
};

export default App;
