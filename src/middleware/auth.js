const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (request, response, next) {
    //Get token from header
    const token = request.header("x-auth-token");

    // Check if token is missing
    if (!token) {
        return response
            .status(401)
            .json({ error: "No token, authorization denied" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, config.get("jwtSecret"));

        // set user for the request
        request.user = decoded.user;
        next();
    } catch (error) {
        response.status(401).json({ error: "Token is not valid" });
    }
};
