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
  const [index, setIndex] = useState(0);
  const { settings: { breatherStateOrder } } = useSettings();

  const breatherStateOrderFiltered = breatherStateOrder.filter(
    statePosition => statePosition.durationSeconds > 0
  );

  useEffect(() => {
    if (index >= breatherStateOrderFiltered.length) setIndex(0);
  }, [breatherStateOrderFiltered.length]);

  const currentBreatherStatePosition = breatherStateOrderFiltered.at(index);
  const currentState = currentBreatherStatePosition?.state;
  const currentDurationSeconds = currentBreatherStatePosition?.durationSeconds;
  const currentBreatherLabel = currentState
    ? breatherStateLabels.get(currentState) ?? ''
    : '';

  useEffect(() => {
    if (breatherStateOrderFiltered.length === 0) return;

    const interval = setInterval(() => {
      setIndex(previous => (previous + 1) % breatherStateOrderFiltered.length);
    }, (currentDurationSeconds ?? 1) * 1000);

    return () => clearInterval(interval);
  }, [index, breatherStateOrderFiltered, currentDurationSeconds]);

  if (!currentState) return null;

  return (
    <Stack align="center" pos="relative" h="100%" w="100%">
      <InstructionCard instruction={currentBreatherLabel} />
      <Center h="100%">
        <MovingBreather
          type={currentState}
          durationSeconds={currentDurationSeconds}
        />
      </Center>
    </Stack>
  );
}
