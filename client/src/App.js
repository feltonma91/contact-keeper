import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import ContactState from "./components/context/contacts/ContactState";

function App() {
    return (
        <ContactState>
            <Router>
                <Fragment>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={About} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        </ContactState>
    );
}

export default App;
