import React, {useEffect, useRef} from 'react';
import {TreeSVG} from "@/src/components/Breather/TreeSVG/TreeSVG";
import classes from './MovingBreather.module.css';

export type MovingType = 'growing' | 'shrinking' | 'empty' | 'full';

interface Props {
  type: MovingType;
  durationSeconds?: number;
}

export const MovingBreather: React.FC<Props> = ({ type, durationSeconds }) => {
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

  return <TreeSVG size="100%" reference={reference} />;
}