import validator from "validator";
import { CreateUserUseCase } from "../use-cases/create-users.js";

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            // validar a requisição (campos obrigatórios e tamanho de senha e email)
            const requiredFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return {
                        statusCode: 400,
                        body: {
                            errorMessage: `Missing param ${field}`,
                        },
                    };
                }
            }

            if (params.password.length < 6) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage: "Password must be least 6 chacteres",
                    },
                };
            }

            const emailIsValid = validator.isEmail(params.email);

            if (!emailIsValid) {
                return {
                    statusCode: 400,
                    body: {
                        errorMessage: "The email is invalid",
                    },
                };
            }

            // chamar use case
            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);

            return {
                statusCode: 201,
                body: createdUser,
            };
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                body: {
                    errorMessage: "Internal server error",
                },
            };
        }
        // retornar a resposta para o usuário(status code)
    }
}
