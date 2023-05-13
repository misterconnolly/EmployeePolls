import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../data/api";
import { SET_AUTHED_USER } from "../actions/authedUser";

const Register = ({ users, dispatch }) => {
    const navigate = useNavigate();
    const [formValidated, setFormValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            saveUser({
                username: username,
                password: password,
                name: fullName,
                avatarURL: avatarUrl
            }).then((result) => {
                dispatch({ type: SET_AUTHED_USER, user: result.id });
                navigate("/");
            });
        }

        setFormValidated(true);
    }

    const [username, setUsername] = useState("");
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const usernameIsValid = () => {
        return username.length > 1 && !usernameIsInvalid();
    }
    const usernameIsInvalid = () => {
        return users[username] !== undefined || /[^A-Za-z0-9]/.test(username);
    }

    const [password, setPassword] = useState("");
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        setConfirm("");
    }
    const passwordIsValid = () => {
        return password.length > 1 && !passwordIsInvalid();
    }
    const passwordIsInvalid = () => {
        return (formValidated || password.length !== 0) && password.length < 1;
    }

    const [confirm, setConfirm] = useState("");
    const handleChangeConfirm = (e) => {
        setConfirm(e.target.value);
    }
    const confirmIsValid = () => {
        return (formValidated || confirm.length > 1) && confirm.length >= password.length && !confirmIsInvalid();
    }
    const confirmIsInvalid = () => {
        return (formValidated || confirm.length !== 0) && confirm.length >= password.length && confirm !== password;
    }

    const [fullName, setFullName] = useState("");
    const handleChangeFullName = (e) => {
        setFullName(e.target.value);
    }
    const fullNameIsValid = () => {
        return formValidated && fullName.length > 1 && !fullNameIsInvalid();
    }
    const fullNameIsInvalid = () => {
        return formValidated && fullName === "";
    }

    const [avatarUrl, setAvatarUrl] = useState("");
    const handleChangeAvatarUrl = (e) => {
        setAvatarUrl(e.target.value);
    }
    const avatarUrlIsValid = () => {
        return formValidated && avatarUrl.length > 1 && !avatarUrlIsInvalid();
    }
    const avatarUrlIsInvalid = () => {
        return formValidated && avatarUrl === "";
    }

    return (
        <div>
            <h2>Register</h2>

            <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Username"
                            defaultValue=""
                            isValid={usernameIsValid()}
                            isInvalid={usernameIsInvalid()}
                            onChange={handleChangeUsername}
                        />
                        <Form.Control.Feedback type="invalid">Username exists or is invalid</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                            defaultValue=""
                            isValid={passwordIsValid()}
                            isInvalid={passwordIsInvalid()}
                            onChange={handleChangePassword}                            
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>Confirm</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm"
                            defaultValue=""
                            isValid={confirmIsValid()}
                            isInvalid={confirmIsInvalid()}
                            onChange={handleChangeConfirm}                            
                        />
                        <Form.Control.Feedback type="invalid">Does not match</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First and last"
                            defaultValue=""
                            isValid={fullNameIsValid()}
                            isInvalid={fullNameIsInvalid()}
                            onChange={handleChangeFullName}                             
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-5">
                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                        <Form.Label>Avatar URL</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="http://..."
                            defaultValue=""
                            isValid={avatarUrlIsValid()}
                            isInvalid={avatarUrlIsInvalid()}
                            onChange={handleChangeAvatarUrl}                             
                        />
                    </Form.Group>
                </Row>

                <Button type="submit">Submit</Button>

            </Form>

        </div>
    )
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Register);