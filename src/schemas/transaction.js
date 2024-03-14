import validator from "validator";
import { z } from "zod";

export const createTransactionSchema = z.object({
    user_id: z.string({ required_error: "User ID is requiered" }).uuid(),
    name: z
        .string({ required_error: "Name is requiered" })
        .trim()
        .min(1, { message: "name is required" }),
    date: z
        .string({ required_error: "Date is requiered" })
        .datetime({ message: "Date must be a valid date" }),
    type: z.enum(["EARNING", "EXPENSE", "INVESTIMENT"], {
        errorMap: () => ({
            message: "Type must be EARNING, EXPENSE or INVESTIMENT",
        }),
    }),
    amount: z
        .number({
            required_error: "amount is requiered",
            invalid_type_error: "Amount must to be a number",
        })
        .min(1, {
            message: "Amount must be greater than 0",
        })
        .refine((value) =>
            validator.isCurrency(value.toFixed(2), {
                digits_after_decimal: [2],
                allow_negatives: false,
                decimal_separator: ".",
            }),
        ),
});
