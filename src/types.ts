import {PRESETS, STATES} from "@/src/constants";

export type BreatherState = typeof STATES[number];
export type BreatherPreset = typeof PRESETS[number];

export type BreatherStatePosition = {
  state: BreatherState;
  durationSeconds: number;
};

export type Settings = {
  preset: BreatherPreset;
  breatherStateOrder: BreatherStatePosition[];
  grounding: boolean;
};