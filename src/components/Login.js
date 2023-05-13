import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SET_AUTHED_USER } from "../actions/authedUser";

const Login = ({ users, dispatch }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    
    const authenticate = (username, password) => {
      return users[username] && users[username].password === password;
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();

      if (authenticate(username, password)) {
        dispatch({ type: SET_AUTHED_USER, user: users[username] && users[username].id });
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
        <h3 className="center">Login</h3>

        <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                      required
                      type="text"
                      placeholder="Username"
                      defaultValue=""
                      onChange={handleChangeUsername}
                  />
              </Form.Group>
          </Row>
          <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      defaultValue=""
                      onChange={handleChangePassword}
                  />
              </Form.Group>
          </Row>
        
          <Button type="submit">Log in</Button>

        </Form>
      </div>
    );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Login);