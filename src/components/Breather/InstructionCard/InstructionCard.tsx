import type React from "react";
import { Center, Paper, Text } from "@mantine/core";
import classes from './InstructionCard.module.css';

interface Props {
  instruction: string;
}

export const InstructionCard: React.FC<Props> = ({ instruction }) => {
  return (
    <Paper
      miw={120}
      radius="md"
      p="md"
      className={classes.frostGlass}
    >
      <Center>
        <Text fw={900} c="black" fz={{ base: 28, sm: 33, md: 40 }} lh={1}>
          {instruction}
        </Text>
      </Center>
    </Paper>
  );
}
