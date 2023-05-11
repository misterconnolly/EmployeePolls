import { Link } from "react-router-dom";

const Nav = () => {
    return (
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Employee Polls</Link>
          </li>
          <li>
            <Link to="/question">Question</Link>
          </li>
          <li>
            <Link to="/board">Leaderboard</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
    );
};

export default Nav;