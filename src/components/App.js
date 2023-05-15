import { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { LoadingBar } from 'react-redux-loading-bar';


import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/App.css';

import Navigation from './Navigation';
import AppRouter from './AppRouter';


const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  const loggedIn = () => {
    return false; // props && props.authedUser !== null;
  }

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Navigation user={props.authedUser} />
        {props.loading === true ? null : (
          <AppRouter loggedIn={loggedIn()} />
        )}
      </div>
    </Fragment>
  );  
}

const mapStateToProps = (state) => ({
  loading: state.loading,
  authedUser: state.authedUser,
});

export default connect(mapStateToProps)(App);
