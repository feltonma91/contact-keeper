import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
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
} from "../types";

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id: "1",
                type: "personal",
                name: "Ted Talk",
                email: "test@test.com",
                phone: "123-123-1234",
            },
            {
                id: "2",
                type: "personal",
                name: "Cristina Kanu",
                email: "test@test.com",
                phone: "123-123-1234",
            },
            {
                id: "3",
                type: "professional",
                name: "Marcus felton",
                email: "test@test.com",
                phone: "123-123-1234",
            },
        ],
        current: null,
        filtered: null,
        error: null,
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Add Contact
    const addContact = (contact) => {
        contact.id = uuidv4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

    // Update Contact
    const updateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

    // Delete Contact
    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id });
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

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                addContact,
                updateContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                filterContacts,
                clearFilter,
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
