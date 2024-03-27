/* eslint-disable no-undef */
import { CreateUserController } from "./index.js";

describe("Create User Controller", () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user;
        }
    }
    it("should create an user", async () => {
        const createUserUseCase = new CreateUserUseCaseStub();
        const createuserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                first_name: "Victor",
                last_name: "oliveira",
                email: "victor@email.com",
                password: "secret",
            },
        };

        const result = await createuserController.execute(httpRequest);

        expect(result.statusCode).toBe(201);
        expect(result.body).toBe(httpRequest.body);
    });
});
