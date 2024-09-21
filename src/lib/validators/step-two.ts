import { z } from "zod";

export const StepTwoSchema = z.object({
    diet: z.enum(["Omnivore", "Vegetarian", "Vegan", "Other"]),
    fruitsAndVegetables: z.coerce.number().min(0).max(10),
    physicalActivityDays: z.coerce.number().min(0).max(7),
    sleepHours: z.coerce.number().min(0).max(24),
    smokingStatus: z.enum(["Never", "Former smoker", "Current smoker"]),
    smokingFrequency: z.string().optional(), // Optional if user chooses "Never"
    alcoholFrequency: z.enum(["Never", "Occasionally", "Weekly", "Daily"]),
    stressLevel: z.coerce.number().min(1).max(10),
});

export type StepTwoSchemaType = z.infer<typeof StepTwoSchema>;

