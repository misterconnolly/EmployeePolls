import { useState } from "react";

const Login = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPasword] = useState("");
    const [user, setUser] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();


        // authenticate

        // Assign user to current session

        /// OR

        // Wet

    }



    return (
        <div>
            {error && 
                <h1 data-testid="error-header">Error: Login Failed</h1>
            }
            <h3 className="center">Login</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Username: 
                    <input type="text" name="username" placeholder="Username" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                
                <button type="submit" onClick={handleSubmit}>Login</button>

            </form>
        </div>
    );

};

export default Login;