import { PRESETS, STATES, TECHNIQUE_GROUP } from "@/src/constants";
import type { MantineColor } from "@mantine/core";

export type BreatherState = typeof STATES[number];
export type BreatherPreset = typeof PRESETS[number];

export type BreatherStatePosition = {
  state: BreatherState;
  durationSeconds: number;
};

export type GroundingTechniqueGroup = typeof TECHNIQUE_GROUP[number];
export type GroundingTechnique = {
  group: GroundingTechniqueGroup;
  label: string;
  durationSeconds: number;
  colour: MantineColor;
};

export type GroundingTechniqueActive = {
  group: GroundingTechniqueGroup;
  active: boolean;
}

export type Settings = {
  preset: BreatherPreset;
  breatherStateOrder: BreatherStatePosition[];
  grounding: GroundingTechniqueActive[];
};