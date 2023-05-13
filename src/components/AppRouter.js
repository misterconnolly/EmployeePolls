import { Routes, Route, Navigate } from "react-router-dom";

import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

const AppRouter = ({ loggedIn }) => {
    return (
        <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/question" exact element={<Home />} />
        <Route path="/leaderboard" exact element={<Home /> } />
        <Route path="/logout" exact element={<Logout /> } />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    );
};

export default AppRouter;