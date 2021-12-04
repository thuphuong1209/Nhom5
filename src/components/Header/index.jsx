import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const Header = ({ username, setUserName }) => {
  return (
    <React.Fragment>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold">
            HỆ THỐNG QUẢN LÍ THƯ VIỆN
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link eventKey={1}>
                <NavDropdown title={username} id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/logout" className="text-decoration-none" onClick={() => {
                      setUserName("");
                    }}>
                      Đăng xuất
                    </Link>
                  </NavDropdown.Item>
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

        <Nav.Link eventKey={1}>
          <NavDropdown title="Quản lí tài khoản" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/list-account" className="text-decoration-none">
                Danh sách tài khoản
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />

            <NavDropdown.Item>
              <Link to="/search-account" className="text-decoration-none">
                Tìm kiếm tài khoản
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav.Link>
        <Nav.Link eventKey={1}>
          <NavDropdown title="Quản lí sách" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/list-book" className="text-decoration-none">
                Danh sách sách
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to="/add-book" className="text-decoration-none">
                Thêm sách
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to="/search-book" className="text-decoration-none">
                Tìm kiếm sách
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav.Link>
        <Nav.Link eventKey={1}>
          <NavDropdown title="Quản lí người mượn" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/list-borrow" className="text-decoration-none">
                Danh sách người mượn
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>
              <Link to="/search-borrow" className="text-decoration-none">
                Tìm kiếm mượn sách
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav.Link>
        <Nav.Link eventKey={1}>
          <NavDropdown title="More..." id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/logout" className="text-decoration-none">
                Đăng xuất
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav.Link>
      </Nav>
    </React.Fragment>
  );
};

export default Header;
