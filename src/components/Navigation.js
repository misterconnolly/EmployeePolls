import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = ({ loggedIn }) => {
  return (
    <Navbar bg="light" variant="light">
      {loggedIn && (
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Employee Polls</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/question">
              <Nav.Link>New</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/leaderboard">
              <Nav.Link>Leaderboard</Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            <LinkContainer to="/logout">
              <Nav.Link>Log Out</Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      )}
      {!loggedIn && (
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Employee Polls</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      )}
    </Navbar>
  );
};

export default Navigation;
