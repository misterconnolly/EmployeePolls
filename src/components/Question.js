import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/answers";
import { createAvatarUrlIfEmpty } from "../util/avatar";
import { Container, Row, Col, Card, ButtonGroup, ToggleButton } from "react-bootstrap";

const Question = (props) => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [author, setAuthor] = useState(null);
    const [answer, setAnswer] = useState("");
    const [stats, setStats] = useState(null);

    useEffect(() => {
      setQuestion(props.questions[id]);
      setStats(optionStats(props.questions[id]));
    }, [props.questions, id]);

    useEffect(() => {
      if (props.questions[id] && props.questions[id].author) {
        setAuthor(props.users[props.questions[id].author]);
      }
    }, [props.users, props.questions, id]);

    useEffect(
      () => {
        if (props.users[props.authedUser.id].answers[id]) {
          setAnswer(props.users[props.authedUser.id].answers[id]);
        }
      },
      [props.users, props.questions, id, props.authedUser.id],
      props.questions[id]
    ); 
    
    const optionStats = (q) => {
      const votesOne = q.optionOne.votes.length;
      const votesTwo = q.optionTwo.votes.length;
      const votes = votesOne + votesTwo;
      return {
        optionOne: `${votesOne}/${votes} votes ${percent(votesOne / votes)}`,
        optionTwo: `${votesTwo}/${votes} votes ${percent(votesTwo / votes)}`
      };
    }

    const percent = (num) => {
      return Number(num/100).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}); 
    }

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
                      <br/>
                      <Card.Text>{stats &&
                        stats.optionOne
                      }</Card.Text>
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
                      <br/>
                      <Card.Text>{stats &&
                        stats.optionTwo
                      }</Card.Text>
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