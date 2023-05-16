import { connect } from "react-redux";
import PollsItem from "./PollsItem";


const filterQuestions = (user, questions) => {
    const questionArray = questions && questions.length === undefined 
        ? Object.keys(questions).map((k) => questions[k]).sort((q) => q.timestamp) 
        : [];
    const answerArray = user && user.answers ? Object.keys(user.answers) : [];

    return [
        questionArray.filter(q => answerArray.includes(q.id)),
        questionArray.filter(q => !answerArray.includes(q.id))
    ]
}


const Polls = (props) => {
    const [haveAnswers, noAnswers] = filterQuestions(props.authedUser, props.questions);
    return (
      <div>
        <span>New Questions</span>
        <ul>
          {haveAnswers && haveAnswers.map((q) => <li key={q.id}><PollsItem question={q} /> </li>)}
        </ul>
        <span>Done</span>
        <ul>
          {noAnswers && noAnswers.map((q) => <li key={q.id}><PollsItem question={q} /> </li>)}
        </ul>
      </div>
    );
};

const mapStateToProps = (state) => ({
    questions: state.questions,
    authedUser: state.authedUser
});

export default connect(mapStateToProps)(Polls);