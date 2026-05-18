import { useCallback, useMemo, useState } from 'react';
import { uid } from '@/shared/db';
import { Frequency, HabitIconKey, NewHabitInput } from '@/shared/types/habit';
import { HABIT_TEMPLATES } from '@/features/onboarding/constants';

export interface HabitDraft {
  key: string;
  name: string;
  iconKey: HabitIconKey;
  frequency: Frequency;
  days: number[];
  reminderTime: string | null;
  goalAmount: number | null;
  goalUnit: string | null;
  notifyIfLate: boolean;
}

function fromTemplate(key: string): HabitDraft {
  const tpl = HABIT_TEMPLATES.find((x) => x.key === key)!;
  return {
    key,
    name: tpl.name,
    iconKey: tpl.iconKey,
    frequency: 'daily',
    days: [1, 3, 5],
    reminderTime: null,
    goalAmount: null,
    goalUnit: null,
    notifyIfLate: true,
  };
}

function blankDraft(): HabitDraft {
  return {
    key: uid('draft'),
    name: '',
    iconKey: 'exe',
    frequency: 'daily',
    days: [1, 3, 5],
    reminderTime: null,
    goalAmount: null,
    goalUnit: null,
    notifyIfLate: true,
  };
}

export function useOnboarding() {
  const [step, setStep] = useState(1);
  const [drafts, setDrafts] = useState<HabitDraft[]>(() =>
    HABIT_TEMPLATES.filter((t) => t.defaultChecked).map((t) =>
      fromTemplate(t.key)
    )
  );
  const [activeKey, setActiveKey] = useState<string | null>(
    drafts[0]?.key ?? null
  );

  const isSelected = useCallback(
    (key: string) => drafts.some((d) => d.key === key),
    [drafts]
  );

  const toggleTemplate = useCallback(
    (key: string) => {
      setDrafts((prev) =>
        prev.some((d) => d.key === key)
          ? prev.filter((d) => d.key !== key)
          : [...prev, fromTemplate(key)]
      );
    },
    []
  );

  const addBlank = useCallback(() => {
    const draft = blankDraft();
    setDrafts((prev) => [...prev, draft]);
    setActiveKey(draft.key);
    return draft.key;
  }, []);

  const updateDraft = useCallback(
    (key: string, patch: Partial<HabitDraft>) => {
      setDrafts((prev) =>
        prev.map((d) => (d.key === key ? { ...d, ...patch } : d))
      );
    },
    []
  );

  const removeDraft = useCallback((key: string) => {
    setDrafts((prev) => prev.filter((d) => d.key !== key));
  }, []);

  const activeDraft = useMemo(
    () => drafts.find((d) => d.key === activeKey) ?? drafts[0] ?? null,
    [drafts, activeKey]
  );

  const validDrafts = useMemo(
    () => drafts.filter((d) => d.name.trim().length > 0),
    [drafts]
  );

  const toInputs = useCallback(
    (): NewHabitInput[] =>
      validDrafts.map((d) => ({
        name: d.name.trim(),
        iconKey: d.iconKey,
        frequency: d.frequency,
        weeklyTarget: 3,
        days: d.frequency === 'custom' ? d.days : [],
        reminderTime: d.reminderTime,
        goalAmount: d.goalAmount,
        goalUnit: d.goalUnit,
        notifyIfLate: d.notifyIfLate,
      })),
    [validDrafts]
  );

  return {
    step,
    setStep,
    drafts,
    activeDraft,
    activeKey,
    setActiveKey,
    isSelected,
    toggleTemplate,
    addBlank,
    updateDraft,
    removeDraft,
    validDrafts,
    toInputs,
  };
}
