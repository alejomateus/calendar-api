const { Router } = require('express');
const { getRepositories } = require('../controllers/github.controller');
const router = Router();
// const { validate, userValidationRules } = require("../validations/validate-request");
router.get('', getRepositories);

module.exports = router;
