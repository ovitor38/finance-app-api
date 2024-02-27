import validator from "validator";
import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { notFound, ok, serverError } from "./helpers/http.js";
import { invalidIdResponse } from "./helpers/users.js";

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            if (!validator.isUUID(httpRequest.params.userId)) {
                return invalidIdResponse;
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
