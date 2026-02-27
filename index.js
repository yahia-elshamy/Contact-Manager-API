// require the config for the dotenv to secure the data
require("dotenv").config();

// require the express
const express = require("express");
const app = express();

// require mongoose
const mongoose = require("mongoose");

const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;

//create the connection with the database
const dbConnection = async () =>{
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected successfully");
    }
    catch(error) {
        console.log("Failed to connect due to error:", error);
    }
}

//create middleware for POST
app.use(express.json());

// DB connection
dbConnection();

const contactRoute = require("./routes/contactRoute");

app.use("/api", contactRoute);

//listen to the port
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});