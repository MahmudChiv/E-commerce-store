import { Form, Button, Container, Navbar, NavDropdown } from "react-bootstrap";
import { Cart, PersonCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <Navbar expand="lg" className="bg-body-tertiary w-full" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#">SmileShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex mx-auto my-2 my-lg-0 justify-content-center">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 w-100"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div>
            {user ? (
              <NavDropdown
                title={<PersonCircle size={30} className="mx-2 text-success" />}
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item disabled>
                  {user.firstName && user.lastName
                    ? `Welcome, ${user.firstName} ${user.lastName}`
                    : `Signed in as: ${user.email}`}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/cart")}>
                  <Cart size={20} className="me-2" />
                  Cart
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <PersonCircle
                size={30}
                className="mx-2 text-success"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/signIn")}
              />
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
