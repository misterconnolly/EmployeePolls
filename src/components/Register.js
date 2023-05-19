import React, { useState } from "react";
import { Button, Col, Form, Row, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddUser } from "../actions/users";
import { handleLogin } from "../actions/authedUser";

const Register = ({ users, dispatch }) => {
    const navigate = useNavigate();
    const [formValidated, setFormValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormValidated(true);

        const form = e.currentTarget;
        if (form.checkValidity() === true && allInputsValid()) {
          dispatch(handleAddUser({
              id: username,
              password: password,
              name: fullName,
              avatarURL: avatarUrl
          }));

          dispatch(handleLogin({
            id: username,
            name: fullName,
            avatarURL: avatarUrl
          }));

          navigate("/");              
        }
    }

    const allInputsValid = () => {
        return usernameIsValid()
            && passwordIsValid()
            && confirmIsValid()
            && fullNameIsValid()
            && avatarIsValid;
    }

    const [username, setUsername] = useState("");
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const usernameIsValid = () => {
      return username.length > 1 && !usernameIsInvalid();
    };
    const usernameIsInvalid = () => {
      return (
        (formValidated && username === "") ||
        users[username] !== undefined ||
        /[^A-Za-z0-9]/.test(username)
      );
    };

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
        return (
          (
            (formValidated && confirm.length > 1) ||
            (passwordIsValid() && password === confirm)
            ) &&
          confirm.length >= password.length &&
          !confirmIsInvalid() 
        );
    }
    const confirmIsInvalid = () => {
        return (
            (!formValidated && passwordIsValid() && confirm.length >= password.length && confirm !== password)
            || 
            (formValidated && passwordIsValid() && confirm !== password)
        );
    }

    const [fullName, setFullName] = useState("");
    const handleChangeFullName = (e) => {
        setFullName(e.target.value);
    }
    const fullNameIsValid = () => {
        return fullName.length > 1 && !fullNameIsInvalid();
    }
    const fullNameIsInvalid = () => {
        return formValidated && fullName === "";
    }

    const [avatarUrl, setAvatarUrl] = useState("");
    const [avatarIsValid, setAvatarIsValid] = useState(false);
    const handleChangeAvatarUrl = (e) => {
        setAvatarIsValid(true);
        setAvatarUrl(e.target.value);
    }
    const avatarUrlIsValid = () => {
        return formValidated && avatarUrl.length > 1 && !avatarUrlIsInvalid() && avatarIsValid;
    }
    const avatarUrlIsInvalid = () => {
      return (
        formValidated && (avatarUrl === "" || (avatarUrl !== "" && !avatarIsValid))
      );
    };
    const handleGenerateAvatarClick = (e) => {
        e.preventDefault();
        setAvatarIsValid(true);
        const url = `https://avatars.dicebear.com/v2/gridy/${generateUID()}.svg`;
        setAvatarUrl(url);
    }
    function generateUID () {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      }

    return (
      <div>
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
              <Form.Control.Feedback type="invalid">
                Username exists or is invalid
              </Form.Control.Feedback>
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
              <Form.Control.Feedback type="invalid">
                Does not match
              </Form.Control.Feedback>
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
                value={avatarUrl}
                isValid={avatarUrlIsValid()}
                isInvalid={avatarUrlIsInvalid()}
                onChange={handleChangeAvatarUrl}
              />
              <Form.Text muted>
                <Button className="linkButton" onClick={handleGenerateAvatarClick}>Click here for a random avatar</Button>
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom06">
              {avatarIsValid && (
                <Image
                  src={avatarUrl}
                  alt="User avatar"
                  className="avatar-max-width-40p"
                  onError={() => setAvatarIsValid(false)}
                />
              )}
            </Form.Group>
          </Row>

          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Register);