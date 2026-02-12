const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phones: {
        type: [String]
    },
    socialMedia: {
        Facebook: String,
        LinkedIn: String
    }
},{timestamps: true});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;