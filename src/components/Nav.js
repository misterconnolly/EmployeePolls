import { Link } from "react-router-dom";

const Nav = ({ loggedIn }) => {
  return (
    <nav className="nav">
      {loggedIn && (
        <ul>
          <li>
            <Link to="/">Employee Polls</Link>
          </li>
          <li>
            <Link to="/question">Question</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link to="/logout">Log Out</Link>
          </li>
        </ul>
      )}
      {!loggedIn && (
        <ul>
          <li>
            <Link to="/">Employee Polls</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Nav;
