import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Image, Nav, Navbar } from "react-bootstrap";
import { createAvatarUrlIfEmpty } from "../util/avatar";

const Navigation = ({ loggedInUser }) => { 
  return (
    <Navbar bg="light" variant="light">
      {(loggedInUser !== null && loggedInUser !== undefined) && (
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
            {loggedInUser.avatarURL && 
            <Image src={createAvatarUrlIfEmpty(loggedInUser.avatarURL, loggedInUser.name)} width="40" className="img-thumbnail" />
            }
            &nbsp;
            <span>{`${loggedInUser.id}`}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <LinkContainer to="/logout">
              <Nav.Link>Log Out</Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      )}

      {(loggedInUser === null || loggedInUser === undefined) && (
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
