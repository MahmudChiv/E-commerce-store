import { Form, Button, Container, Navbar } from "react-bootstrap";
import { Cart, PersonCircle } from "react-bootstrap-icons";


const NavBar = () => {
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
            <Cart size={30} className="mx-2 text-success" href="#" />
            <PersonCircle size={30} className="mx-2 text-success" href="#" />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
