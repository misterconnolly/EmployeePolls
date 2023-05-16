import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Logout = ({ dispatch }) => {
  dispatch(handleLogout());

  const navigate = useNavigate();
  navigate("/");
  
  return <div>Logging out</div>;
};

export default connect()(Logout);