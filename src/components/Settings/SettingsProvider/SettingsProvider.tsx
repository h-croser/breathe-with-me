'use client';

import React, { PropsWithChildren, useCallback } from "react";
import { useLocalStorage } from "@mantine/hooks";
import type {BreatherState, Settings} from "@/src/types";
import {
  BooleanSettingKey,
  SettingsContext,
  SettingsContextValue
} from "@/src/components/Settings/SettingsProvider/SettingsContext";
import { SettingsSchema } from "@/src/constants";

const DEFAULT_SETTINGS: Settings = {
  preset: '4-7-8',
  breatherStateOrder: [
    { state: 'growing', durationSeconds: 4 },
    { state: 'full', durationSeconds: 7 },
    { state: 'shrinking', durationSeconds: 8 }
  ],
  grounding: true
};

const deserialize = (value: string | undefined): Settings => {
  if (!value) return DEFAULT_SETTINGS;
  try {
    const parsed = JSON.parse(value);
    const result = SettingsSchema.safeParse(parsed);
    if (result.success) {
      return { ...DEFAULT_SETTINGS, ...result.data };
    }
    return DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const SettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [settings, setStoredSettings, removeValue] = useLocalStorage<Settings>({
    key: 'settings',
    defaultValue: DEFAULT_SETTINGS,
    getInitialValueInEffect: false,
    deserialize
  });

  const updateSettings = useCallback(
    (partial: Partial<Settings>) =>
      setStoredSettings((prev) => ({ ...prev, ...partial })),
    [setStoredSettings]
  );

  const set = useCallback(
    <K extends keyof Settings>(key: K, value: Settings[K]) =>
      setStoredSettings((prev) => ({ ...prev, [key]: value })),
    [setStoredSettings]
  );

  const setStateDuration = useCallback(
    (state: BreatherState, durationSeconds: number) => {
      const currentStateOrder = [...settings.breatherStateOrder];
      currentStateOrder.forEach((statePosition, index) => {
        if (statePosition.state === state) {
          currentStateOrder[index].durationSeconds = durationSeconds;
        }
      });
      updateSettings({ breatherStateOrder: currentStateOrder });
    }, [settings.breatherStateOrder, updateSettings]
  );

  const toggle = useCallback(
    (key: BooleanSettingKey) =>
      setStoredSettings((prev) => ({ ...prev, [key]: !prev[key] })),
    [setStoredSettings]
  );

  const settingsContextValue = {
    settings,
    updateSettings,
    toggle,
    set,
    setStateDuration,
    resetSettings: removeValue
  } satisfies SettingsContextValue;

  return <SettingsContext.Provider value={settingsContextValue}>{children}</SettingsContext.Provider>;
}
