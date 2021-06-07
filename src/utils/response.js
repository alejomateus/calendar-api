const HTTP_CODES = require('../constants/http-codes');

const base = (response, message, data, status) => {
    if (response) {
        if (!message) message = (status === HTTP_CODES.BAD_REQUEST) ? 'Error' : 'Done';
        const responseData = {
            statusCode: status,
            message: message,
            data: (data || null)
        };
        return response.status(status || HTTP_CODES.OK).send(responseData);
    } else
        throw new Error('Response is undefined');
}

const res = {
    success: (response, message, data, status) => base(response, message, data, status || HTTP_CODES.OK),
    error: (response, message, data, status) => base(response, message, data, status || HTTP_CODES.INTERNAL_SERVER_ERROR),
    bad_request: (response, message, data, status) => base(response, message, data, status || HTTP_CODES.BAD_REQUEST),
    unauthorized: (response, message, data, status) => base(response, message, data, status || HTTP_CODES.UNAUTHORIZED),
    forbidden: (response, message, data, status) => base(response, message, data, status || HTTP_CODES.FORBIDDEN),
    not_found: (response, message, data, status) => base(response, message, data, status || HTTP_CODES.NOT_FOUND)
};

module.exports = res;