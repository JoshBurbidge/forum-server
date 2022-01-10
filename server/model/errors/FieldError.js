const { Error } = require('./Error');

class FieldError extends Error {
    constructor(field, message) {
        super(message);
        this.field = field;
    }
}

module.exports = { FieldError };
