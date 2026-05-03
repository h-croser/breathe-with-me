import type React from "react";
import {Center, Paper, Text} from "@mantine/core";
import classes from './InstructionCard.module.css';

interface Props {
  instruction: string;
}

export const InstructionCard: React.FC<Props> = ({ instruction }) => {
  return (
    <Paper
      w={100}
      radius="md"
      p="xs"
      shadow="lg"
      className={classes.frostGlass}
    >
      <Center h="100%">
        <Text fw={600} c="black" fz={{ base: 28, sm: 33 }} lh={1}>
          {instruction}
        </Text>
      </Center>
    </Paper>
  );
}
