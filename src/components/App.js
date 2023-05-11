import { useEffect, Fragment, useState } from 'react';
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { LoadingBar } from 'react-redux-loading-bar';
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import '../assets/App.css';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import Logout from './Logout';
import Register from './Register';

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
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/logout" exact element={<Logout />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );  
}

const mapStateToProps = (state) => (
  {
    loading: state.loading,
    authedUser: state.authedUser
  }
);

export default connect(mapStateToProps)(App);
