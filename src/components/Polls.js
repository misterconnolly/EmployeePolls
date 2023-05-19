import { connect } from "react-redux";
import Poll from "./Poll";
import { Tabs, Tab, Row } from "react-bootstrap";

const Polls = (props) => {
  if (props.users && props.questions && props.authedUser) {
    
    const userWithAnswers = props.users[props.authedUser.id]
    const [haveAnswers, noAnswers] = filterQuestions(userWithAnswers, props.questions);
    
    return (
      <Tabs defaultActiveKey="new" className="mb-3">
        <Tab eventKey="new" title="New">
          <Row xs={"auto"} md={"auto"} className="g-4">
            {noAnswers && noAnswers.map((q) => <Poll question={q} key={q.id} />)}
          </Row>
        </Tab>
        <Tab eventKey="done" title="Done">
          <Row xs={"auto"} md={"auto"} className="g-4">
            {haveAnswers && haveAnswers.map((q) => <Poll question={q} key={q.id} />)}
          </Row>
        </Tab>
      </Tabs>
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