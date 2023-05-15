import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Image } from "react-bootstrap";

const Navigation = ({ user }) => {
  return (
    <Navbar bg="light" variant="light">
      {/* {user !== undefined && user !== null && ( */}
      {user !== null && (
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
            {user.avatarURL && 
            <Image src={user.avatarURL} width="40" className="img-thumbnail" />
            }
            &nbsp;
            <span>{`${user.id}`}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <LinkContainer to="/logout">
              <Nav.Link>Log Out</Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      )}
      {/* {(user === undefined || user === null) && ( */}
      {(user === null) && (
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
