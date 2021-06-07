const jwt = require('jsonwebtoken');
const Response = require('../utils/response');
let tokenVerification = (req, res, next) => {
    if (!req.headers.authorization) {
        return Response.unauthorized(res, 'Token no provider ');
    }
    try {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return Response.unauthorized(res, 'Token error ', err);
            }
            req.user = decoded.user;
            next();
        })
    } catch (error) {
        return Response.unauthorized(res, 'Token no provider ');
    }
};

let helloBuildKeyValidation = (req, res, next) => {
    let helloBuildkey = req.headers.hellobuildkey;
    if (!helloBuildkey) {
        return Response.unauthorized(res, 'helloBuild Key no provider');
    } else if (helloBuildkey !== process.env.HELLOBUILDMSKEY) {
        return Response.unauthorized(res, 'Invalid helloBuildKey');
    }
    return next();
};
module.exports = {
    tokenVerification,
    helloBuildKeyValidation
}