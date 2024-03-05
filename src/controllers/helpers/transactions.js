import validator from "validator";
import { badRequest } from "./http.js";

export const checkIfAmountIsValid = (amount) => {
    if (typeof amount === "string") {
        return false;
    }
    return validator.isCurrency(amount.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: ".",
    });
};

export const checkIfTypeIsValid = (type) =>
    ["EARNING", "EXPENSE", "INVESTIMENT"].includes(type);

export const invalidAmountResponse = () =>
    badRequest({
        message: "amount must to be a valid currency",
    });

export const invalidTypeResponse = () =>
    badRequest({
        message: "The type must be EARNING, EXPENSE or INVESTIMENT",
    });
