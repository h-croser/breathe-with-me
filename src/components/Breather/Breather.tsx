'use client';

import React, {useEffect, useState} from "react";
import { Group, Stack, Text } from "@mantine/core";
import { MovingBreather, MovingType } from "@/src/components/Breather/MovingBreather/MovingBreather";
import type { BreatherStateConfig, BreatherStateOrder } from "@/src/components/Breather/BreatherState";

const breatherConfigs: BreatherStateConfig[] = [
  {
    state: 'shrinking',
    instruction: 'In',
  },
  {
    state: 'full',
    instruction: 'Hold'
  },
  {
    state: 'growing',
    instruction: 'Out',
  }
];
const configMap = new Map<MovingType, BreatherStateConfig>(
  breatherConfigs.map(config => [config.state, config])
);

const breatherStateOrder: BreatherStateOrder = [
  { state: 'growing', duration: 4 },
  { state: 'full', duration: 7 },
  { state: 'shrinking', duration: 8 }
];

export const Breather: React.FC = () => {
  const [breatherStateIndex, setBreatherStateIndex] = useState(0);
  const currentDurationSeconds = breatherStateOrder[breatherStateIndex].duration;
  const currentBreatherConfig = configMap.get(breatherStateOrder[breatherStateIndex].state);

  useEffect(() => {
    const interval = setInterval(() => {
      setBreatherStateIndex(previous => (previous + 1) % breatherStateOrder.length);
    }, currentDurationSeconds * 1000);

    return () => clearInterval(interval);
  }, [breatherStateIndex, breatherStateOrder, currentDurationSeconds]);

  if (!currentBreatherConfig) throw new Error('Missing configuration');

  return (
    <Stack align="center" m="lg">
      <MovingBreather
        type={currentBreatherConfig.state}
        durationSeconds={currentDurationSeconds}
      />
      <Group justify="center">
        <Text>{currentBreatherConfig.instruction}</Text>
      </Group>
    </Stack>
  );
}
