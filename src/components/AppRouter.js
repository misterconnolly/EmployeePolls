import { Routes, Route, Navigate } from "react-router-dom";

import Polls from './Polls';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Question from "./Question";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import NotFound from "./NotFound";

const AppRouter = ({ loggedInUser }) => {
    return (
      <Routes>
        <Route path="/" exact element={(loggedInUser) ? <Polls /> : <Navigate to="/login" />} />
        <Route path="/add" exact element={(loggedInUser) ? <NewQuestion /> : <Navigate to="/login" />} />
        <Route path="/question/:id" exact element={<Question />} />
        <Route path="/leaderboard" exact element={(loggedInUser) ? <Leaderboard /> : <Navigate to="/login" />} />
        <Route path="/logout" exact element={<Logout />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/notfound" exact element={<NotFound />} />
        <Route path="*" element={<Navigate to="/notfound" />} />
      </Routes>
    );
};

export default AppRouter;