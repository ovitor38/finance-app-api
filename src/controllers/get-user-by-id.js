import validator from "validator";
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { badRequest, notFound, ok, serverError } from "./helpers.js";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            if (!validator.isUUID(httpRequest.params.userId)) {
                return badRequest({ message: "Provdided id is not valid." });
            }
            const getUserByIdUseCase = new GetUserByIdUseCase();

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            if (!user) {
                return notFound({ message: "User not found" });
            }

            return ok(user);
        } catch (error) {
            console.log(error);
            serverError;
        }
    }
}
