import { Table, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

const Leaderboard = ({users}) => {    
    const [sortedUsers, setSortedUsers] = useState([]);
    
    useEffect(() => {
      setSortedUsers(transformAndSortUsers(users, formatUser));
    }, [users]);
    
    const transformAndSortUsers = (users, transform) => {
      const result = Object.keys(users).map((k) => {
        return transform(users[k]);
      });
      return sortByTotalCount(result);
    };

    const formatUser = (user) => {
      const answersCount = Object.keys(user.answers).length;
      const questionsCount = user.questions.length;
      return {
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        answersCount: answersCount,
        questionsCount: questionsCount,
        totalCount: answersCount + questionsCount,
      };
    };

    const sortByTotalCount = (users) => {
        return users.sort((a, b) => (a.totalCount < b.totalCount ? 1 : -1))
    }

    return (
      <div>
        <h1>Leaderboard</h1>
        <Table striped bordered>
          <thead>
            <tr>
              <th>User</th>
              <th>Answered</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td><img src={user.avatarURL} alt="User avatar" className="avatar-max-width-20p" />{user.name} <br/> {user.id}</td>
                <td>{user.answersCount}</td>
                <td>{user.questionsCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps)(Leaderboard);