import { connect } from "react-redux";
import Poll from "./Poll";

const filterQuestions = (user, questions) => {
    const questionArray = questions && questions.length === undefined 
        ? Object.keys(questions).map((k) => questions[k]).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) 
        : [];
    const answerArray = user && user.answers ? Object.keys(user.answers) : [];

    return [
        questionArray.filter(q => !answerArray.includes(q.id)),
        questionArray.filter(q => answerArray.includes(q.id))
    ]
}

const Polls = (props) => {
    const [haveAnswers, noAnswers] = filterQuestions(props.authedUser, props.questions);
    return (
      <div>
        <span>New Questions</span>
        <ul>
          {haveAnswers && haveAnswers.map((q) => <li key={q.id}><Poll question={q} /> </li>)}
        </ul>
        <span>Done</span>
        <ul>
          {noAnswers && noAnswers.map((q) => <li key={q.id}><Poll question={q} /> </li>)}
        </ul>
      </div>
    );
};

const mapStateToProps = (state) => ({
    questions: state.questions,
    authedUser: state.users[state.authedUser.id]
});

export default connect(mapStateToProps)(Polls);