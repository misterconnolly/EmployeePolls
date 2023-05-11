import { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { LoadingBar } from 'react-redux-loading-bar';
import { Routes, Route } from "react-router-dom";

import '../assets/App.css';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav />
        {props.loading === true ? null : (
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/question" exact element={<Home />} />
            <Route path="/leaderboard" exact element={<Home />} />
            <Route path="/logout" exact element={<Login />} />
            <Route path="/login" exact element={<Login />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );  
}

const mapStateToProps = (state) => (
  {
    loading: state.loading,
  }
);

export default connect(mapStateToProps)(App);
