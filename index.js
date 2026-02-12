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

// importing model
const Contact = require("./models/Contact");

// creating route for POST request
app.post("/api/contacts", async (req, res)=>{
    try {
        // get data
    const {fullName, phones, socialMedia} = req.body;

    //validate data
    if(!fullName || !phones || !socialMedia) {
        return res.status(400).json({msg: "All fields are required"});
    }
    else {
        const newContact = new Contact({fullName, phones, socialMedia});
        await newContact.save();
        res.status(201).json({msg: "Contact created successfully", data: newContact});
    }
    }
    catch(error) {
        res.status(500).json({msg: "Failed to create contact due to error:", error});
    }
});

// create route for GET request
app.get("/api/contacts", async (req, res) =>{
    try {
        const contacts = await Contact.find();
        res.status(200).json({msg: "Contacts fetched successfully", data: contacts});
    }
    catch(error) {
        res.status(500).json({msg: "Failed to fetch contacts due to error:", error});
    }
});

// DB connection
dbConnection();

//listen to the port
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});