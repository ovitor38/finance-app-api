import validator from "validator";
import { badRequest } from "./http.js";

export const invalidPasswordResponse = () =>
    badRequest({
        message: "Password must be least 6 chacteres",
    });

export const emailIsAlreadyInUseResponse = () =>
    badRequest({ message: "The email is invalid" });

export const invalidIdResponse = () =>
    badRequest({ message: "Provdided id is not valid." });

export const ifPasswordIsValid = (password) => password.length < 6;

export const checkIfEmailIsValid = (email) => validator.isEmail(email);
