import { HabitIconKey } from '@/shared/types/habit';

export interface HabitTemplate {
  key: string;
  name: string;
  iconKey: HabitIconKey;
  sizeKB: string;
  defaultChecked: boolean;
}

/** The Win95 "components to install" catalog (step 2 of the wizard). */
export const HABIT_TEMPLATES: HabitTemplate[] = [
  { key: 'correr', name: 'correr', iconKey: 'run', sizeKB: '14 KB', defaultChecked: true },
  { key: 'ler', name: 'ler', iconKey: 'book', sizeKB: '32 KB', defaultChecked: true },
  { key: 'hidratar', name: 'hidratar', iconKey: 'water', sizeKB: '8 KB', defaultChecked: true },
  { key: 'meditar', name: 'meditar', iconKey: 'meditate', sizeKB: '16 KB', defaultChecked: false },
  { key: 'dormir', name: 'dormir', iconKey: 'sleep', sizeKB: '64 KB', defaultChecked: true },
  { key: 'malhar', name: 'malhar', iconKey: 'exercise', sizeKB: '128 KB', defaultChecked: false },
  { key: 'estudar', name: 'estudar', iconKey: 'study', sizeKB: '256 KB', defaultChecked: false },
  { key: 'comer', name: 'comer', iconKey: 'food', sizeKB: '32 KB', defaultChecked: true },
];

export const WIZARD_STEPS = 4;
