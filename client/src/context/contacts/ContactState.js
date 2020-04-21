import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
} from "../types";

const ContactState = (props) => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null,
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        try {
            const response = await axios.get("/api/contacts");
            dispatch({
                type: GET_CONTACTS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.data.error,
            });
        }
    };

    // Add Contact
    const addContact = async (contact) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.post("/api/contacts", contact, config);
            dispatch({
                type: ADD_CONTACT,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.data.error,
            });
        }
    };

    // Update Contact
    const updateContact = async (contact) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await axios.put(
                `/api/contacts/${contact._id}`,
                contact,
                config
            );
            dispatch({
                type: UPDATE_CONTACT,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.data.error,
            });
        }
    };

    // Delete Contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            dispatch({
                type: DELETE_CONTACT,
                payload: id,
            });
        } catch (e) {
            dispatch({
                type: CONTACT_ERROR,
                payload: e.response.data.error,
            });
        }
    };

    // Set Current
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // Clear Current
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter Contacts
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // Clear Current
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter,
                clearContacts,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
