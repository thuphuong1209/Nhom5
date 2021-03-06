import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { GlobalContext } from "../../useContext";
import "./Header.css";

const Header = () => {
  const { isLoggedIn, isAdmin, name, handleLogout } =
    React.useContext(GlobalContext);
  console.log({ isLoggedIn, name });
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/25/Logo_Kinh_t%E1%BA%BF_%C4%90%C3%A0_N%E1%BA%B5ng.jpg"
              width="50"
              height="50"
            />
            HỆ THỐNG QUẢN LÍ THƯ VIỆN
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav bg="dark">
              <Nav.Link eventKey={1}>
                <NavDropdown title={name} id="collasible-nav-dropdown">
                  {isLoggedIn ? (
                    <NavDropdown.Item onClick={handleLogout}>
                      <Link to="/" className="text-decoration-none">
                        Đăng xuất
                      </Link>
                    </NavDropdown.Item>
                  ) : null}
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/" className="text-decoration-none">
                      Đăng nhập
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/register" className="text-decoration-none">
                      Đăng kí
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.2">
                    More...
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isLoggedIn ? (
        <Nav className="justify-content-center">
          <Nav.Link eventKey={1}>
            <NavDropdown title="Trang chủ" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/home" className="text-decoration-none">
                  Trang chủ
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Link>

          {isLoggedIn && isAdmin ? (
            <Nav.Link eventKey={1}>
              <NavDropdown
                title="Quản lí tài khoản"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link to="/list-account" className="text-decoration-none">
                    Danh sách tài khoản
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Link>
          ) : null}
          <Nav.Link eventKey={1}>
            <NavDropdown title="Quản lí sách" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/list-book" className="text-decoration-none">
                  Danh sách sách
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {isLoggedIn && isAdmin ? (
                <NavDropdown.Item>
                  <Link to="/add-book" className="text-decoration-none">
                    Thêm sách
                  </Link>
                </NavDropdown.Item>
              ) : null}
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <Link to="/search-book" className="text-decoration-none">
                  Tìm kiếm sách
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Link>
          <Nav.Link eventKey={1}>
            <NavDropdown title="More..." id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={handleLogout}>
                <Link to="/" className="text-decoration-none">
                  Đăng xuất
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Link>
        </Nav>
      ) : null}
    </React.Fragment>
  );
};

export default Header;
