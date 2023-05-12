import { useEffect, Fragment } from 'react';
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { LoadingBar } from 'react-redux-loading-bar';
import { Routes, Route, Navigate } from "react-router-dom";

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

  const loggedIn = () => {
    return props.authedUser !== null;
  }

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav loggedIn={ props.authedUser !== null } />
        {props.loading === true ? null : (
          <Routes>
            <Route path='*' element={<Navigate to='/' />} />
            <Route path="/" exact element={ loggedIn() ? <Home /> : <Navigate to="/login" />} />
            <Route path="/question" exact element={ loggedIn() ? <Home /> : <Navigate to="/" /> } />
            <Route path="/leaderboard" exact element={ loggedIn() ? <Home /> : <Navigate to="/" /> } />
            <Route path="/logout" exact element={ loggedIn() ? <Logout /> : <Navigate to="/" /> } />
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
          </Routes>
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
