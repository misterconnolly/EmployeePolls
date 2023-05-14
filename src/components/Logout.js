import { connect } from "react-redux";
import { REMOVE_AUTHED_USER } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const Logout = ({ dispatch }) => {
  dispatch({
    type: REMOVE_AUTHED_USER,
    user: null,
  });

  const navigate = useNavigate();
  navigate("/");
  
  return <div>Logging out</div>;
};

export default connect()(Logout);