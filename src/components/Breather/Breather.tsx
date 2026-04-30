'use client';

import React, {useEffect, useState} from "react";
import {Box, Center, Stack} from "@mantine/core";
import { MovingBreather, MovingType } from "@/src/components/Breather/MovingBreather/MovingBreather";
import type { BreatherStateConfig, BreatherStateOrder } from "@/src/components/Breather/BreatherState";
import {InstructionCard} from "@/src/components/Breather/InstructionCard/InstructionCard";

const breatherConfigs: BreatherStateConfig[] = [
  {
    state: 'shrinking',
    instruction: 'out',
  },
  {
    state: 'full',
    instruction: 'hold'
  },
  {
    state: 'growing',
    instruction: 'in',
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
    <Stack align="center" pos="relative" h="100%" w="100%">
      <MovingBreather
        type={currentBreatherConfig.state}
        durationSeconds={currentDurationSeconds}
      />
      <Center pos="absolute" inset={0}>
        <Box>
          <InstructionCard instruction={currentBreatherConfig.instruction} />
        </Box>
      </Center>
    </Stack>
  );
}
