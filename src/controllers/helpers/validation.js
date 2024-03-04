import validator from "validator";
import { badRequest } from "./http.js";

export const checkIfIdIsValid = (id) => validator.isUUID(id);

export const invalidIdResponse = () =>
    badRequest({ message: "Provdided id is not valid." });
