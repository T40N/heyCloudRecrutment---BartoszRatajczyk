const express = require("express");
const router = express.Router();

const PersonController = require("../controllers/PersonController");
const PersonModel = require("../models/PersonModel");
const personController = new PersonController(PersonModel);

router.get("/", personController.getPersons.bind(personController));
router.post("/", personController.saveNewPerson.bind(personController));

module.exports = router;
