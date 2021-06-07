const { Router } = require('express');
const router = Router();
const { login, signUp } = require("../controllers/auth.controller");
const { validate, userValidationRules } = require("../validations/validate-request");
router.post('/login', userValidationRules('login'), validate, login);
router.post('/sign-up', userValidationRules('sign-up'), validate, signUp);
module.exports = router;
