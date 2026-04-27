import type { ReactNode } from "react";
import type { MantineColor } from "@mantine/core";
import type { MovingType } from "@/src/components/Breather/MovingBreather/MovingBreather";

export type BreatherStateConfig = {
  state: MovingType;
  icon: ReactNode;
  colour: MantineColor;
  instruction: string;
};

export type BreatherStateOrder = {
  state: MovingType;
  duration: number;
}[];