import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import setAuthToken from "../../utils/SetAuthToken";

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const response = await axios.get("/api/auth");
            dispatch({
                type: USER_LOADED,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: AUTH_ERROR,
                payload: e.response.data.error,
            });
        }
    };

    // Register User
    const register = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post("/api/users", formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data,
            });
            loadUser();
        } catch (e) {
            dispatch({
                type: REGISTER_FAIL,
                payload: e.response.data.error,
            });
        }
    };

    // Login User
    const login = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post("/api/auth", formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data,
            });
            loadUser();
        } catch (e) {
            dispatch({
                type: LOGIN_FAIL,
                payload: e.response.data.error,
            });
        }
    };

    // Logout User
    const logout = () => dispatch({ type: LOGOUT });

    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                clearErrors,
                loadUser,
                login,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
