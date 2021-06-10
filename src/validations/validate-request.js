const { check, validationResult } = require('express-validator');
const Response = require('../utils/response');
const utils = require('../utils/utils');

const userValidationRules = (method) => {
  switch (method) {
    case 'login': {
      return [
        check('email', 'Email is required ').not().isEmpty(),
        check('email', 'Invalid email, this isn´t good format ').isEmail(),
        check('password', 'The password isn´t good format ').not().isEmpty()
      ]
    }
    case 'sign-up': {
      return [
        check('email', 'Email is required ').not().isEmpty(),
        check('email', 'Invalid email, this isn´t good format ').isEmail(),
        check('names', 'first Name is required ').not().isEmpty(),
        check('last_names', 'Lastname is required ').not().isEmpty(),
        check('password', 'The password isn´t good format ').not().isEmpty(),
      ]
    }
  }
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return Response.bad_request(res, 'You have some errors in request data, please verify',
      { errors: utils.removeDuplicates(errors.array(), 'param') });
  return next();
}

module.exports = {
  userValidationRules,
  validate,
}