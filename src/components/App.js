import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";

import '../assets/App.css';
import Home from './Home';

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );  
}

const mapStateToProps = (state) => (
  {
    loading: state.loading,
  }
);

export default connect(mapStateToProps)(App);
