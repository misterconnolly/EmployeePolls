import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_AUTHED_USER } from "../actions/authedUser";

const Login = ({ users, dispatch }) => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");

    const authenticate = (username, password) => {
      return users[username] && users[username].password === password;
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      if (authenticate(username, e.target.password.value)) {
        console.log("LOGIN SUCCEEDED");
        dispatch({ type: SET_AUTHED_USER, user: users[username] });
        navigate("/");
      } else {
        console.log("LOGIN FAILED");
        setError(true);
        setUsername("");
      }
    };

    const handleChangeUsername = (e) => {
      setUsername(e.target.value);
    };

    return (
      <div>
        {error && <h1 data-testid="error-header">Error: Login Failed</h1>}
        <h3 className="center">Login</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={handleChangeUsername}
            />
          </label>
          <label>
            Password:
            <input type="password" name="password" />
          </label>

          <button type="submit">Log in</button>
        </form>
      </div>
    );

};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Login);