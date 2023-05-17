import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { nameAvatarUrl } from "../util/avatar";

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
        avatarURL: (user.avatarURL && user.avatarURL !== "") ? user.avatarURL: nameAvatarUrl(user.name),
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
                <td><img src={user.avatarURL} alt="User avatar" className="avatar-max-width-20p" />{user.name} ({user.id})</td>
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