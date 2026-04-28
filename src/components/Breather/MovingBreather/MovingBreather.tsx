import React, {useEffect, useRef} from 'react';
import { TreeSVG } from "@/src/components/Breather/TreeSVG/TreeSVG";
import {MantineColor} from "@mantine/core";
import classes from './MovingBreather.module.css';

export type MovingType = 'growing' | 'shrinking' | 'empty' | 'full';

interface Props {
  type: MovingType;
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

  return <TreeSVG size="100%" reference={reference} baseColour={colour} />;
}