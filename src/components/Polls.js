import { connect } from "react-redux";
import Poll from "./Poll";
import { CardGroup } from "react-bootstrap";

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Polls = (props) => {
  if (props.users && props.questions && props.authedUser) {
    
    const userWithAnswers = props.users[props.authedUser.id]
    const [haveAnswers, noAnswers] = filterQuestions(userWithAnswers, props.questions);
    

    return (
      <div>
<h2>New</h2>
        <Row xs={1} md={"auto"} className="g-4">
          {noAnswers && noAnswers.map((q) => <Poll question={q} />)}
        </Row>
<h2>Done</h2>
        <Row xs={"auto"} md={"auto"} className="g-4">
          {haveAnswers && haveAnswers.map((q) => <Poll question={q} />)}
        </Row>

      </div>
    );

  } 
  else 
  {
    return <div></div>;
  }
};
  
  const filterQuestions = (user, questions) => {
      const questionArray = questions && questions.length === undefined 
          ? Object.keys(questions).map((k) => questions[k]).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) 
          : [];
      const answerArray = user && user.answers ? Object.keys(user.answers) : [];
  
      return [
          questionArray.filter(q => answerArray.includes(q.id)),
          questionArray.filter(q => !answerArray.includes(q.id))
      ]
  }

  const mapStateToProps = (state) => ({
    users: state.users,
    questions: state.questions,
    authedUser: state.authedUser,
  });
  
  export default connect(mapStateToProps)(Polls);