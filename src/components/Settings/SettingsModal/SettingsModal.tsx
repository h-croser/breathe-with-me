import type React from "react";
import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, Modal, NumberInput, SegmentedControl, Stack, Switch, Text} from "@mantine/core";
import {IconSettings} from "@tabler/icons-react";
import {useSettings} from "@/src/components/Settings/SettingsProvider/SettingsContext";
import {presetLabels, presetStateOrders} from "@/src/components/Settings/SettingsModal/presets";
import {PRESETS, STATES, TECHNIQUE_GROUP} from "@/src/constants";
import type {BreatherPreset, BreatherState} from "@/src/types";

const breatherStateLabels = new Map<BreatherState, string>([
  ['shrinking', 'Breathe out'],
  ['empty', 'Hold out'],
  ['growing', 'Breathe in'],
  ['full', 'Hold in']
]);

export const SettingsModal: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { settings, set, setStateDuration, setTechniqueGroupActive } = useSettings();

  const updatePreset = (newPreset: BreatherPreset) => {
    const newBreatherStateOrder = presetStateOrders.get(newPreset);
    if (newBreatherStateOrder) {
      set('breatherStateOrder', newBreatherStateOrder);
    }
    set('preset', newPreset);
  };

  const updateStateDuration = (state: BreatherState, durationSeconds: number | string) => {
    if (typeof durationSeconds === 'string' || durationSeconds < 0) durationSeconds = 0;
    setStateDuration(state, durationSeconds);
    set('preset', 'custom');
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Settings">
        <Stack gap="lg">
          <Stack gap="xs">
            <Text fw={600}>Preset</Text>
            <SegmentedControl
              ml="sm"
              value={settings.preset}
              onChange={updatePreset}
              data={PRESETS.map(preset => ({
                label: presetLabels.get(preset) ?? '',
                value: preset
              }))}
            />
          </Stack>
          <Stack gap="xs">
            <Text fw={600}>Phase durations</Text>
            {STATES.map((state, index) => {
              const stateLabel = breatherStateLabels.get(state) ?? 'Unknown';
              const currentStateDuration = settings.breatherStateOrder.find(stateOrder => stateOrder.state === state)?.durationSeconds ?? 0;
              return (
                <NumberInput
                  key={index}
                  ml="sm"
                  variant="filled"
                  label={`${stateLabel} duration`}
                  description="How long in seconds the phase will last"
                  min={0}
                  value={currentStateDuration}
                  onChange={(value) => updateStateDuration(state, value.valueOf())}
                />
              );
            })}
          </Stack>
          <Stack gap="xs">
            <Text fw={600}>Grounding techniques</Text>
            {TECHNIQUE_GROUP.map((group, index) => {
              const currentGroupActive = settings.grounding.find(grounding => grounding.group === group)?.active ?? false;
              return (
                <Switch
                  key={index}
                  ml="sm"
                  label={group}
                  checked={currentGroupActive}
                  onChange={(event) => setTechniqueGroupActive(group, event.currentTarget.checked)}
                />
              )
            })}
          </Stack>
        </Stack>
      </Modal>

      <ActionIcon variant="light" size="lg" color="ocean" aria-label="Settings" onClick={open}>
        <IconSettings style={{ width: '70%', height: '70%' }} />
      </ActionIcon>
    </>
  );
}
