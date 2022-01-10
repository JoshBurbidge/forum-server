
class Error {
    // could have different types of errors
    constructor(message) {
        this.message = message;
    }


}

class FieldError extends Error {
    constructor(field, message) {
        super(message);
        this.field = field;
    }
}


module.exports = { FieldError, Error }
