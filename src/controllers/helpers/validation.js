import validator from "validator";
import { badRequest } from "./http.js";

export const checkIfIdIsValid = (id) => validator.isUUID(id);

export const invalidIdResponse = () =>
    badRequest({ message: "Provdided id is not valid." });

const checkIfIsString = (value) => typeof value === "string";

export const validateRequireFields = (params, requeriedFields) => {
    for (const field of requeriedFields) {
        const fieldIsMissing = !params[field];
        const fieldIsEmpty =
            checkIfIsString(params[field]) &&
            validator.isEmpty(params[field], { ignore_whitespace: true });

        if (fieldIsMissing || fieldIsEmpty) {
            return { missingField: field, ok: false };
        }
    }

    return { missingField: undefined, ok: true };
};
