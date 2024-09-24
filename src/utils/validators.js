const { LOGIN, SIGNUP } = require("./constants");

class Validator {
    constructor() {}
    static inputValidation(inputs) {
        const arrayOfInputs = Object.keys(inputs);
        for (let i = 0; i < arrayOfInputs.length; i++) {
            const inputKey = arrayOfInputs[i];
            const input = inputs[inputKey];
            if (!input) {
                return {
                    isInputValid: false,
                    msg: `${inputKey} field cannot be empty`,
                };
            }
            if (inputKey === "email") {
                if (
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                        input
                    ) == false
                ) {
                    return {
                        isInputValid: false,
                        msg: "email address entered is not valid",
                    };
                }
            }
        }
        return {
            isInputValid: true,
        };
    }
    static assessAuthAttempt(user, { attempt }) {
        if (user) {
            if (attempt === LOGIN) {
                return {
                    isNewUserEntry: false,
                    msg: "user exists, we are good to login ",
                };
            } else if (attempt === SIGNUP) {
                return {
                    isNewUserEntry: false,
                    msg: "user with this email already exists, try signing in with some other email",
                };
            }
        } else {
            if (attempt === LOGIN) {
                return {
                    isNewUserEntry: true,
                    msg: "email not found, try signing-up first",
                };
            } else if (attempt === SIGNUP) {
                return {
                    isNewUserEntry: true,
                    msg: "email not in the database,we are good to signup",
                };
            }
        }
    }
}

module.exports = Validator;
