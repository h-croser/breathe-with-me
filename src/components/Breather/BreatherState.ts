import type { MovingType } from "@/src/components/Breather/MovingBreather/MovingBreather";

export type BreatherStateConfig = {
  state: MovingType;
  instruction: string;
};

export type BreatherStateOrder = {
  state: MovingType;
  duration: number;
}[];