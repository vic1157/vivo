import { z } from "zod";

export const StepThreeSchema = z.object({
    medicationName: z.string().min(1, "Medication name is required"),
    dosage: z.string().min(1, "Dosage is required"),
    frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "RARELY"]),
    startDate: z.string().optional(),
    adherence: z.enum(["ALWAYS", "OFTEN", "SOMETIMES", "NEVER", "RARELY"]),
});

export type StepThreeSchemaType = z.infer<typeof StepThreeSchema>;
