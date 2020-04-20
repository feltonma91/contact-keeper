const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

// @route 	Get api/auth
// @desc  	gets logged in user
// @access 	Private
router.get("/", auth, async (request, response) => {
    try {
        // get user based on id from request
        const user = await User.findById(request.user.id).select("-password");
        await response.json(user);
    } catch (error) {
        console.error(error.message);
        response.status(500).send("Server error");
    }
});

// @route 	POST api/users
// @desc  	Auth user and get user
// @access 	Public
router.post(
    "/",
    [
        // email must be the right format
        check("email", "Invalid email").isEmail(),
        // password check
        check("password", "Password is required").exists(),
    ],
    async (request, response) => {
        // Handle Request errors
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        // Deconstruct values from request body
        const { email, password } = request.body;

        try {
            // validate user exist
            let user = await User.findOne({ email });
            if (!user) {
                return response
                    .status(400)
                    .json({ error: "Invalid credentials" });
            }
            // validate users password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return response
                    .status(400)
                    .json({ error: "Invalid credentials" });
            }

            // Create JWT payload
            const payload = {
                user: {
                    id: user.id,
                },
            };

            // Sign token and send back
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    expiresIn: 360000,
                },
                (error, token) => {
                    if (error) throw error;
                    response.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            response.status(500).send("Server Error");
        }
    }
);

module.exports = router;
