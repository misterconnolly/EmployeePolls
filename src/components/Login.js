import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { handleLogin } from "../actions/authedUser";

const Login = ({ users, dispatch }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    
    const authenticate = (username, password) => {
      return users[username] && users[username].password === password;
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();

      if (authenticate(username, password)) {
        dispatch(handleLogin(users[username]));

        navigate("/");
      } else {
        setError(true);
        setUsername("");

      }
    };
    
    const [username, setUsername] = useState("");
    const handleChangeUsername = (e) => {
      setUsername(e.target.value);
    };
    const [password, setPassword] = useState("");
    const handleChangePassword = (e) => {
      setPassword(e.target.value);
    };
    
    return (
      <div>
        {error && <h2 data-testid="error-header">Log in failed</h2>}

        <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
              <Form.Group as={Col} md="4">
                  <Form.Label htmlFor="usernameInput">Username</Form.Label>
                  <Form.Control
                      required
                      type="text"
                      id="usernameInput"
                      placeholder="Username"
                      defaultValue=""
                      onChange={handleChangeUsername}
                      data-testid="usernameInput"
                  />
              </Form.Group>
          </Row>
          <Row className="mb-3">
              <Form.Group as={Col} md="4">
                  <Form.Label htmlFor="passwordInput">Password</Form.Label>
                  <Form.Control
                      required
                      type="password"
                      id="passwordInput"
                      placeholder="Password"
                      defaultValue=""
                      onChange={handleChangePassword}
                      data-testid="passwordInput"
                  />
              </Form.Group>
          </Row>
        
          <Button type="submit" data-testid="login-submit">Log in</Button>

        </Form>
      </div>
    );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Login);