const express = require("express");
const connectDB = require("./src/config/db");

const app = express();

//connect DB
connectDB();

// init middleware
app.use(express.json({ extend: false }));
app.get("/", (request, response) => response.json({ msg: "welcome" }));

// Define routes
app.use("/api/users", require("./src/routes/UserRoutes"));
app.use("/api/auth", require("./src/routes/AuthRoutes"));
app.use("/api/contacts", require("./src/routes/ContactRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
