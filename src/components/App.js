import { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/App.css';

import Navigation from './Navigation';
import AppRouter from './AppRouter';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  const loggedInUser = () => props.authedUser ? props.authedUser : null;

  return (
    <Fragment>
      <div className="container">
        <Navigation loggedInUser={loggedInUser()} />
        <div className="app-container">
          <AppRouter loggedInUser={loggedInUser()} />
        </div>
      </div>
    </Fragment>
  );  
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  authedUser: state.authedUser
});

export default connect(mapStateToProps)(App);
