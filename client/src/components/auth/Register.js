import React, { useContext, useState, useEffect } from "react";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = (props) => {
    // Set up Alert context
    const alertContext = useContext(AlertContext);

    // Set up Auth context
    const authContext = useContext(AuthContext);

    // Deconstruct methods from context
    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error !== null) {
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password1 } = user;

    const onChange = (event) =>
        setUser({ ...user, [event.target.name]: event.target.value });

    const onSubmit = (event) => {
        event.preventDefault();
        if (name === "" || email === "" || password === "") {
            setAlert("Please enter all fields", "danger");
        } else if (password !== password1) {
            setAlert("Passwords do not match", "danger");
        } else {
            register({
                name,
                email,
                password,
            });
        }
    };
    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength={6}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password1">Confirm Password</label>
                    <input
                        type="password"
                        name="password1"
                        value={password1}
                        onChange={onChange}
                        required
                    />
                </div>
                <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary btn-block"
                />
            </form>
        </div>
    );
};

export default Register;
