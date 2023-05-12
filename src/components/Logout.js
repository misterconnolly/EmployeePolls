import { useEffect } from "react";
import { connect } from "react-redux";
import { REMOVE_AUTHED_USER } from "../actions/authedUser";

const Logout = ({ dispatch }) => {
  useEffect(() => {
    dispatch({
      type: REMOVE_AUTHED_USER,
      user: null,
    });
  }, []);

  return <div>Logging out</div>;
};

export default connect()(Logout);