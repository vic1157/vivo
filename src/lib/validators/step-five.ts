import { z } from "zod";

export const StepFiveSchema = z.object({
    healthGoals: z.array(z.string()).min(1, "Please select at least one goal").max(3, "You can select up to 3 goals"),
});

export type StepFiveSchemaType = z.infer<typeof StepFiveSchema>;
