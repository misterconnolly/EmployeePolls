import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = ({ dispatch }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(handleLogout());
    navigate("/");
  }, []);

  return <div>Logging out</div>;
};

export default connect()(Logout);