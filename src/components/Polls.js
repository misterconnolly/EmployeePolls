import { connect } from "react-redux";
import Poll from "./Poll";

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

const Polls = (props) => {
    if (props.users && props.questions && props.authedUser) {
      
      const userWithAnswers = props.users[props.authedUser.id]
      const [haveAnswers, noAnswers] = filterQuestions(userWithAnswers, props.questions);

      return (
        <div>
          <span>New Questions</span>
          <ul>
            {noAnswers && noAnswers.map((q) => <li key={q.id}><Poll question={q} /> </li>)}
          </ul>
          <span>Done</span>
          <ul>
            {haveAnswers && haveAnswers.map((q) => <li key={q.id}><Poll question={q} /> </li>)}
          </ul>
        </div>
      );
    } 
    else 
    {
      return <div></div>;
    }
};

const mapStateToProps = (state) => ({
  users: state.users,
  questions: state.questions,
  authedUser: state.authedUser,
});

export default connect(mapStateToProps)(Polls);