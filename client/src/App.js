import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import ContactState from "./context/contacts/ContactState";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/SetAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    return (
        <AuthState>
            <ContactState>
                <AlertState>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <div className="container">
                                <Alerts />
                                <Switch>
                                    <PrivateRoute
                                        exact
                                        path="/"
                                        component={Home}
                                    />
                                    <Route
                                        exact
                                        path="/about"
                                        component={About}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        component={Register}
                                    />
                                    <Route
                                        exact
                                        path="/login"
                                        component={Login}
                                    />
                                    <Route component={NotFound} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertState>
            </ContactState>
        </AuthState>
    );
}

export default App;
