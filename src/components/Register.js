import { useState } from "react";

const Register = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleAvatarUrlChange = (e) => {
        setAvatarUrl(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        /// TODO: Validate form
        /// TODO: Validate Username is unique
        /// TODO: Add user to store
        /// TODO: Redirect to home page
    }
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:
                    <input type="text" name="username" value={username} placeholder="Username" onChange={handleUsernameChange} />
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name="password1" />
                </label>
                <br/>
                <label>
                    Confirm:
                    <input type="password" name="password2" />
                </label>
                <br/>
                <label>
                    Full Name:
                    <input type="text" name="name" value={name} placeholder="First and last name" onChange={handleNameChange} />
                </label>
                <br/>
                <label>
                    Avatar URL:
                    <input type="text" name="avatarUrl" value={avatarUrl} placeholder="Avatar URL" onChange={handleAvatarUrlChange} />
                </label>
                <br/>
                <button type="submit">Create Login</button>
            </form>
        </div>
    )
};

export default Register;