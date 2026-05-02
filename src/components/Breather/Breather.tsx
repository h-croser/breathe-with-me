'use client';

import React, {useEffect, useState} from "react";
import { Center, Stack } from "@mantine/core";
import { MovingBreather } from "@/src/components/Breather/MovingBreather/MovingBreather";
import { InstructionCard } from "@/src/components/Breather/InstructionCard/InstructionCard";
import { useSettings } from "@/src/components/Settings/SettingsProvider/SettingsContext";
import type { BreatherState } from "@/src/types";

const breatherStateLabels = new Map<BreatherState, string>([
  ['shrinking', 'out'],
  ['growing', 'in'],
  ['empty', 'hold'],
  ['full', 'hold']
]);

export const Breather: React.FC = () => {
  const [breatherStateIndex, setBreatherStateIndex] = useState(0);
  const { settings: { breatherStateOrder } } = useSettings();

  useEffect(() => {
    setBreatherStateIndex(0);
  }, [breatherStateOrder.length]);

  const {
    state: currentBreatherState,
    durationSeconds: currentDurationSeconds
  } = breatherStateOrder[breatherStateIndex];
  const currentBreatherLabel = breatherStateLabels.get(currentBreatherState) ?? '';

  useEffect(() => {
    const interval = setInterval(() => {
      setBreatherStateIndex(previous => (previous + 1) % breatherStateOrder.length);
    }, currentDurationSeconds * 1000);

    return () => clearInterval(interval);
  }, [breatherStateIndex, breatherStateOrder, currentDurationSeconds]);

  return (
    <Stack align="center" pos="relative" h="100%" w="100%">
      <InstructionCard instruction={currentBreatherLabel} />
      <Center h="100%">
        <MovingBreather
          type={currentBreatherState}
          durationSeconds={currentDurationSeconds}
        />
      </Center>
    </Stack>
  );
}
