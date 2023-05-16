import { Routes, Route, Navigate } from "react-router-dom";

import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Question from "./Question";

const AppRouter = ({ loggedInUser }) => {
    return (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/question" exact element={<Question />} />
        <Route path="/question/:id" exact element={<Question />} />
        <Route path="/leaderboard" exact element={<Home />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
};

export default AppRouter;