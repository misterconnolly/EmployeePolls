import { Routes, Route, Navigate } from "react-router-dom";

import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

const AppRouter = ({ loggedIn }) => {
    return (
        <Routes>
        <Route path='*' element={<Navigate to='/' />} />
        <Route path="/" exact element={ loggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/question" exact element={ loggedIn ? <Home /> : <Navigate to="/" /> } />
        <Route path="/leaderboard" exact element={ loggedIn ? <Home /> : <Navigate to="/" /> } />
        <Route path="/logout" exact element={ loggedIn ? <Logout /> : <Navigate to="/" /> } />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    );
};

export default AppRouter;