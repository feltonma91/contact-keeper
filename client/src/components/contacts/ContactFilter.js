import React, { useContext, useEffect, useRef } from "react";
import ContactContext from "../context/contacts/ContactContext";

const ContactFilter = () => {
    // Set up Contact context
    const contactContext = useContext(ContactContext);

    // Deconstruct methods from context
    const { clearFilter, filterContacts, filtered } = contactContext;

    // init ref object
    const text = useRef("");

    // Set ref value when filtered updates
    useEffect(() => {
        if (filtered === null) {
            text.current.value = "";
        }
    });

    const onChange = (event) => {
        if (text.current.value !== "") {
            filterContacts(event.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <form>
            <input
                ref={text}
                type="text"
                placeholder={"Filter Contacts..."}
                onChange={onChange}
            />
        </form>
    );
};

export default ContactFilter;
