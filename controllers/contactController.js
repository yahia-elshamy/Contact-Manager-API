const Contact = require("../models/Contact");

const createContact = async (req, res)=>{
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
};

const getContact = async (req, res) =>{
    try {
        const contacts = await Contact.find();
        res.status(200).json({msg: "Contacts fetched successfully", data: contacts});
    }
    catch(error) {
        res.status(500).json({msg: "Failed to fetch contacts due to error:", error});
    }
};

module.exports = {createContact, getContact};