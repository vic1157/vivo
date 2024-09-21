import { z } from "zod";

export const StepSixSchema = z.object({
  lastPhysicalExam: z.string().optional(),  // We'll store this as a date
  labWorkFrequency: z.enum(["Monthly", "Quarterly", "Yearly", "Never"]),
  primaryCarePhysician: z.boolean(),
  comfortLevelWithProviders: z.coerce.number().min(1).max(10),
});

export type StepSixSchemaType = z.infer<typeof StepSixSchema>;
