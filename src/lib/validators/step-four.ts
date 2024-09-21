import { z } from "zod";

export const StepFourSchema = z.object({
    mood: z.enum(["HAPPY", "SAD", "ANGRY", "ANXIOUS", "STRESSED", "NEUTRAL"]),
    sleep: z.enum(["GOOD", "BAD", "AVERAGE"]),
    stress: z.enum(["NOT_STRESSED", "SLIGHTLY", "MODERATELY", "HIGHLY", "EXTREMELY"]),
    happiness: z.number().min(1).max(10),
});

export type StepFourSchemaType = z.infer<typeof StepFourSchema>;


