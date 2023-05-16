import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
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
        if (form.checkValidity() === true && allInputsValid()) {
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
    
    const allInputsValid = () => {
        return firstOptionIsValid() && secondOptionIsValid();
    }

    const [firstOption, setFirstOption] = useState(null);
    const handleChangeFirstOption = (e) => {
        setFirstOption(e.target.value);
    };
    const firstOptionIsValid = () => {
        return formSubmitted && firstOption && firstOption.length > 0 && !firstOptionIsInvalid();
    }
    const firstOptionIsInvalid = () => {
        return firstOption && firstOption.length < 1
    }

    const [secondOption, setSecondOption] = useState(null);
    const handleChangeSecondOption = (e) => {
        setSecondOption(e.target.value);
    };
    const secondOptionIsValid = () => {
        return formSubmitted && secondOption && secondOption.length > 0 && !secondOptionIsInvalid();
    }
    const secondOptionIsInvalid = () => {
        return secondOption && secondOption.length < 1
    }

    return (
        <div>
            <h1>Would You Rather</h1>
            <h2>Create Your Own Poll</h2>
            <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
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
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
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
                    <Form.Control.Feedback type="invalid">
                        Username exists or is invalid
                    </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">Submit</Button>
            </Form> 
        </div>
    );
};

const mapStateToProps = (state) => ({
    authedUser: state.users[state.authedUser.id] 
});

export default connect(mapStateToProps)(NewQuestion);