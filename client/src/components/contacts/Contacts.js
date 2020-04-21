import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contacts/ContactContext";
import ContactItem from "./ContactItem";

const Contacts = () => {
    // Set up Contact context
    const contactContext = useContext(ContactContext);

    // Deconstruct methods from context
    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-lin
    }, []);

    if (contacts.length === 0) {
        return <h4>Please add a contact</h4>;
    }
    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null
                    ? filtered.map((contact) => (
                          <CSSTransition
                              key={contact._id}
                              timeout={1000}
                              classNames="item"
                          >
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))
                    : contacts.map((contact) => (
                          <CSSTransition
                              key={contact._id}
                              timeout={1000}
                              classNames="item"
                          >
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))}
            </TransitionGroup>
        </Fragment>
    );
};

export default Contacts;
