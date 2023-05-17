import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/answers";
import { createAvatarUrlIfEmpty } from "../util/avatar";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

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
        <div className="question-card">
        {question && author && props.authedUser && (
            <Card className="text-center">
                <Card.Header>Poll by {author.id}</Card.Header>
                <Card.Body>
                    <img src={createAvatarUrlIfEmpty(author.avatarURL, author.name)} alt="User avatar" className="avatar-max-width-20p" />
                    <Card.Title>Would You Rather?</Card.Title>
                    <Container fluid>
                        <Row>
                            <Col><Button variant="primary" onClick={handleOptionOne}>{question.optionOne.text}</Button></Col>
                            <Col><Button variant="primary" onClick={handleOptionTwo}>{question.optionTwo.text}</Button></Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
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