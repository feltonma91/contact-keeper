import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../context/contacts/ContactContext";

const ContactForm = () => {
    // Set up Contact context
    const contactContext = useContext(ContactContext);

    // Deconstruct methods from context
    const { addContact, updateContact, current, clearCurrent } = contactContext;

    // Component level state
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        type: "personal",
    });

    // Mimic ComponentDidMount lifecycle method
    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: "",
                email: "",
                phone: "",
                type: "personal",
            });
        }
    }, [contactContext, current]);

    // Deconstruct contact
    const { name, email, phone, type } = contact;

    // Update component level state
    const onChange = (event) =>
        setContact({ ...contact, [event.target.name]: event.target.value });

    // Clear
    const clearAll = () => {
        clearCurrent();
    };

    // Submit the form clear the object
    const onSubmit = (event) => {
        event.preventDefault();
        if (current) {
            updateContact(contact);
        } else {
            addContact(contact);
        }
        clearAll();
    };

    // Form
    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">
                {current ? "Edit contact" : "Add Contact"}
            </h2>
            <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={onChange}
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input
                id="radio1"
                type="radio"
                name="type"
                value="personal"
                checked={type === "personal"}
                onChange={onChange}
            />
            <label htmlFor="radio1"> Personal </label>
            <input
                id="radio2"
                type="radio"
                name="type"
                value="professional"
                checked={type === "professional"}
                onChange={onChange}
            />
            <label htmlFor="radio2"> Professional </label>
            <div>
                <input
                    type="submit"
                    value={current ? "Update contact" : "Add Contact"}
                    className="btn btn-primary btn-block"
                />
            </div>
            {current && (
                <div>
                    <button
                        className="btn btn-light btn-block"
                        onClick={clearAll}
                    >
                        Clear
                    </button>
                </div>
            )}
        </form>
    );
};

export default ContactForm;
