const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route 	GET api/contacts
// @desc  	gets all users contacts
// @access 	Private
router.get("/", auth, async (request, response) => {
    try {
        // Get all contacts for a given user
        const contacts = await Contact.find({ user: request.user.id }).sort({
            date: -1,
        });
        await response.json(contacts);
    } catch (error) {
        console.error(error.message);
        response.status(500).send("Server Error");
    }
});

// @route 	POST api/contacts
// @desc  	Add new contact
// @access 	private
router.post(
    "/",
    [auth, [check("name", "Name is required")]],
    async (request, response) => {
        // Handle Request errors
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // Deconstruct values from request body
        const { name, email, phone, type } = request.body;

        try {
            // Create new contact
            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: request.user.id,
            });
            // Save new contact
            const contact = await newContact.save();

            // Send response
            await response.json(contact);
        } catch (error) {
            console.error(error.message);
            response.status(500).send("Server Error");
        }
    }
);

// @route 	PUT api/contacts
// @desc  	update contact
// @access 	private
router.put("/:id", auth, async (request, response) => {
    const { name, email, phone, type } = request.body;

    // Build Contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        // Get contact to update
        let contact = await Contact.findById(request.params.id);

        // Check if contact exist
        if (!contact)
            return response.status(404).json({ error: "Contact not found" });

        // Make sure user owns contact
        if (contact.user.toString() !== request.user.id)
            return response.status(401).json({ error: "Not authorized" });

        // Update contact
        contact = await Contact.findByIdAndUpdate(
            request.params.id,
            { $set: contactFields },
            { new: true }
        );

        // Send response
        await response.json(contact);
    } catch (error) {
        console.error(error.message);
        response.status(500).send("Server Error");
    }
});

// @route 	DELETE api/contacts
// @desc  	delete contact
// @access 	private
router.delete("/:id", auth, async (request, response) => {
    try {
        // Get contact to update
        let contact = await Contact.findById(request.params.id);

        // Check if contact exist
        if (!contact)
            return response.status(404).json({ error: "Contact not found" });

        // Make sure user owns contact
        if (contact.user.toString() !== request.user.id)
            return response.status(401).json({ error: "Not authorized" });

        // Remove contact
        await Contact.findByIdAndRemove(request.params.id);

        // Send response
        response.json({ message: "Contact removed" });
    } catch (error) {
        console.error(error.message);
        response.status(500).send("Server Error");
    }
});

module.exports = router;
