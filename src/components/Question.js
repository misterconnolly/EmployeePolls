import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/answers";

const Question = (props) => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [author, setAuthor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setQuestion(props.questions[id]);
    }, [props.questions, id]);

    useEffect(() => {
        if (props.questions[id] && props.questions[id].author)
            setAuthor(props.users[props.questions[id].author])
    }, [props.users, props.questions, id]);    

    const handleOptionOne = (e) => {
        props.dispatch(handleAnswerQuestion({
            authedUser: props.authedUser.id,
            qid: id, 
            answer: 'optionOne'}));
            navigate("/");
    };

    const handleOptionTwo = (e) => {
        props.dispatch(handleAnswerQuestion({
            authedUser: props.authedUser.id,
            qid: id, 
            answer: 'optionTwo'}));
            navigate("/");
    };

    return (
      <div>
        {question && author && props.authedUser && (
          <div>
            <h1>Poll by ${author.id}</h1>
            <img src={author.avatarURL} alt="User avatar" className="avatar-max-width-20p" />
            <h2>Would you rather?</h2>
            <ul>
                <li>
                    ${question.optionOne.text}
                    <button onClick={handleOptionOne}>Answer</button>
                </li>
                <li>
                    ${question.optionTwo.text}
                    <button onClick={handleOptionTwo}>Answer</button>
                </li>
            </ul>
          </div>
        )}
      </div>
    );
};

const mapStateToProps = (state, ownProps = {}) => {
    return ({
        users: state.users,
        questions: state.questions,
        authedUser: state.authedUser   
    });
};

export default connect(mapStateToProps)(Question);