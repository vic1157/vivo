import { z } from "zod";

export const StepSevenSchema = z.object({
  usesFitnessTrackingTech: z.boolean(), // For the question about using fitness tracking apps or devices
  willingToConnectHealthData: z.enum(["yes", "no"]), // For the question about connecting fitness data (Apple Health, etc.)
  comfortWithHealthTech: z.coerce.number().min(1, { message: "Minimum value is 1" }).max(10, { message: "Maximum value is 10" }), // For comfort level with health tech
});

export type StepSevenSchemaType = z.infer<typeof StepSevenSchema>;

