import { createContext, useContext } from 'react';
import type {BreatherState, GroundingTechniqueGroup, Settings} from "@/src/types";

export type BooleanSettingKey = {
  [K in keyof Settings]: Settings[K] extends boolean ? K : never;
}[keyof Settings];

export interface SettingsContextValue {
  settings: Settings;
  updateSettings: (partial: Partial<Settings>) => void;
  toggle: (key: BooleanSettingKey) => void;
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  setStateDuration: (state: BreatherState, durationSeconds: number) => void;
  setTechniqueGroupActive: (group: GroundingTechniqueGroup, active: boolean) => void;
  resetSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context)
    throw new Error(
      'useSettings can only be called when under the scope of SettingsProvider'
    );
  return context;
};