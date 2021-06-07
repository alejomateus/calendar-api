const { Router } = require('express');
const router = Router();
const { getEvents, deleteEvent, createEvent } = require("../controllers/google-calendar.controller");
// const { validate, userValidationRules } = require("../validations/validate-request");
router.get('', getEvents);
router.delete('', deleteEvent);
router.post('', createEvent)

module.exports = router;
