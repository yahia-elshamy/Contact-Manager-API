const express = require("express");
const router = express.Router();

const {createContact, getContact} = require("../controllers/contactController");

// creating route for POST request
router.post("/contacts", createContact);

// create route for GET request
router.get("/contacts", getContact);

module.exports = router;