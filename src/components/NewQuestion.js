import React, { useState } from "react";
import { Button, Col, Form, Row, Card, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

const NewQuestion = ({ dispatch, authedUser }) => {
    const navigate = useNavigate();
    const [formSubmitted, setFormSubmitted] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        const form = e.currentTarget;
        if (form.checkValidity() === true) {            
          dispatch(
            handleAddQuestion({
              optionOneText: firstOption,
              optionTwoText: secondOption,
              author: authedUser.id,
            })
          );

          navigate("/");
        }
    };
    

    const [firstOption, setFirstOption] = useState(null);
    const handleChangeFirstOption = (e) => {
        setFirstOption(e.target.value);
    };
    const firstOptionIsValid = () => {
        return firstOption && firstOption.length > 0;
    }
    const firstOptionIsInvalid = () => {
        return formSubmitted && !firstOptionIsValid()
    }

    const [secondOption, setSecondOption] = useState(null);
    const handleChangeSecondOption = (e) => {
        setSecondOption(e.target.value);
    };
    const secondOptionIsValid = () => {
        return secondOption && secondOption.length > 0;
    }
    const secondOptionIsInvalid = () => {
        return formSubmitted && !secondOptionIsValid()
    }

    return (

        <Card className="text-center">
            <Card.Header>Create Your Own Poll</Card.Header>
            <Card.Body>
                <Card.Title>Would You Rather?</Card.Title>
                <Container fluid>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label>First Option</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Option..."
                                    defaultValue=""
                                    isValid={firstOptionIsValid()}
                                    isInvalid={firstOptionIsInvalid()}
                                    onChange={handleChangeFirstOption}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group md="4" controlId="validationCustom01">
                                <Form.Label>Second Option</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Option..."
                                    defaultValue=""
                                    isValid={secondOptionIsValid()}
                                    isInvalid={secondOptionIsInvalid()}
                                    onChange={handleChangeSecondOption}
                                />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit">Submit</Button>
                    </Form>
                </Container>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => ({
    authedUser: state.authedUser 
});

export default connect(mapStateToProps)(NewQuestion);