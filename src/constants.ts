import {z} from "zod";

export const STATES = ['growing', 'full', 'shrinking', 'empty'] as const;
export const PRESETS = ['4-7-8', 'box', 'custom'] as const;

export const SettingsSchema = z.object({
  preset: z.enum(PRESETS),
  breatherStateOrder: z.array(z.object({
    state: z.enum(STATES),
    durationSeconds: z.number()
  })),
  grounding: z.boolean()
});