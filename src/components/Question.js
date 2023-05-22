import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/answers";
import { createAvatarUrlIfEmpty } from "../util/avatar";
import { Container, Row, Col, Button, Card, ButtonGroup, ToggleButton } from "react-bootstrap";

const Question = (props) => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [author, setAuthor] = useState(null);
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        setQuestion(props.questions[id]);
    }, [props.questions, id]);

    useEffect(() => {
        if (props.questions[id] && props.questions[id].author)
            setAuthor(props.users[props.questions[id].author])
    }, [props.users, props.questions, id]); 
    
    useEffect(() => {
        if (props.users[props.authedUser.id].answers[id])
            setAnswer(props.users[props.authedUser.id].answers[id])
    }, [props.users, props.questions, id, props.authedUser.id]); 
    


    const handleSelect = (e) => {
        props.dispatch(handleAnswerQuestion({
            authedUser: props.authedUser.id,
            qid: id, 
            answer: e.target.value}));
    };


    return (
      <div className="question-card">
        {question && author && props.authedUser && (
          <Card className="text-center">
            <Card.Header>Poll by {author.id}</Card.Header>
            <Card.Body>
              <img
                src={createAvatarUrlIfEmpty(author.avatarURL, author.name)}
                alt="User avatar"
                className="avatar-max-width-20p"
              />
              <Card.Title>Would You Rather?</Card.Title>
              <Container fluid>
                <Row>
                  <ButtonGroup>
                    <Col>
                      <ToggleButton
                        key="optionOne"
                        id={`radio-optionOne`}
                        type="radio"
                        variant={'outline-primary'}
                        name="radio"
                        value="optionOne"
                        checked={answer === "optionOne"}
                        onChange={handleSelect}
                      >
                        {question.optionOne.text}
                      </ToggleButton>
                    </Col>
                    <Col>
                      <ToggleButton
                        key="optionTwo"
                        id={`radio-optionTwo`}
                        type="radio"
                        variant={'outline-primary'}
                        name="radio"
                        value="optionTwo"
                        checked={answer === "optionTwo"}
                        onChange={handleSelect}
                      >
                        {question.optionTwo.text}
                      </ToggleButton>

                    </Col>
                  </ButtonGroup>
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