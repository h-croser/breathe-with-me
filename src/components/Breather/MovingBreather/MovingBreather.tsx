import React, {useEffect, useRef} from 'react';
import { TreeSVG } from "@/src/components/Breather/TreeSVG/TreeSVG";
import {MantineColor} from "@mantine/core";
import type { BreatherState } from "@/src/types";
import classes from './MovingBreather.module.css';


interface Props {
  type: BreatherState;
  durationSeconds?: number;
  colour?: MantineColor;
}

export const MovingBreather: React.FC<Props> = ({ type, durationSeconds, colour }) => {
  const reference = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const element = reference.current;
    if (!element) return;

    element.classList.remove(...element.classList);
    if (durationSeconds) {
      element.style.animationDuration = `${durationSeconds}s`;
    } else {
      element.style.animationDuration = '';
    }
    element.classList.add(classes[type]);
  }, [type, durationSeconds]);

  return <TreeSVG size="min(85vh, 95vw)" reference={reference} baseColour={colour} />;
}