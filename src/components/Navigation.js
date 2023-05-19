import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar } from "react-bootstrap";
import { createAvatarUrlIfEmpty } from "../util/avatar";

const Navigation = ({ loggedInUser }) => { 
  return (
    <Navbar bg="light" variant="light">
      {loggedInUser !== null && loggedInUser !== undefined && (
        <Container>
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Employee Polls</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link>New</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/leaderboard">
              <Nav.Link>Leaderboard</Nav.Link>
            </LinkContainer>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {loggedInUser.avatarURL && (
              <img
                alt="Avatar for logged in user"
                src={createAvatarUrlIfEmpty(
                  loggedInUser.avatarURL,
                  loggedInUser.name
                )}
                width="40"
                className="img-thumbnail"
                data-testid="avatar-image"
              />
            )}
            &nbsp;
            <span data-testid="logged-in-username">{`${loggedInUser.id}`}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <LinkContainer to="/logout">
              <Nav.Link>Log Out</Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      )}

      {(loggedInUser === null || loggedInUser === undefined) && (
        <Container>
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
