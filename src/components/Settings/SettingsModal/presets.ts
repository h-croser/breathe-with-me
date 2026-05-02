import type {BreatherPreset, Settings} from "@/src/types";

const fourSevenEightOrder: Settings['breatherStateOrder'] = [
  {
    state: 'growing',
    durationSeconds: 4
  },
  {
    state: 'full',
    durationSeconds: 7
  },
  {
    state: 'shrinking',
    durationSeconds: 8
  }
];

const BoxOrder: Settings['breatherStateOrder'] = [
  {
    state: 'growing',
    durationSeconds: 4
  },
  {
    state: 'full',
    durationSeconds: 4
  },
  {
    state: 'shrinking',
    durationSeconds: 4
  },
  {
    state: 'empty',
    durationSeconds: 4
  }
];

export const presetStateOrders = new Map<BreatherPreset, Settings['breatherStateOrder']>([
  ['4-7-8', fourSevenEightOrder],
  ['box', BoxOrder]
]);

export const presetLabels = new Map<BreatherPreset, string>([
  ['4-7-8', '4-7-8 technique'],
  ['box', 'Box breathing'],
  ['custom', 'Custom']
]);