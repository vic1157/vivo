import { z } from "zod";

export const StepOneSchema = z.object({
    dateOfBirth: z.string().refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());  // Validates if it's a valid date
    }, {
        message: "Date of birth must be a valid date",
    }),
    weight: z.coerce.number().min(1, {
        message: "Weight must be greater than 0",
    }).max(300, {
        message: "Weight must be less than or equal to 300 kg",
    }).nonnegative(),
    height: z.coerce.number().min(1, {
        message: "Height must be greater than 0",
    }).max(300, {
        message: "Height must be less than or equal to 300 cm",
    }).nonnegative(),
    gender: z.enum(["Male", "Female", "Non-binary", "Prefer not to say"]),
});

export type StepOneSchemaType = z.infer<typeof StepOneSchema>;

