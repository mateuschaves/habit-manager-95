import React from 'react';
import { HabitStatus } from '@/shared/types/habit';
import { useTranslation } from '@/shared/hooks/useTranslation';
import { TranslationKey } from '@/shared/i18n';
import { Win95Text } from '../Win95Text';
import { Dot, Row } from './styles';

const CONFIG: Record<
  HabitStatus,
  { dot: string; color: string; key: TranslationKey }
> = {
  running: { dot: '#00ff00', color: '#008000', key: 'status.running' },
  pending: { dot: '#ffc000', color: '#a07000', key: 'status.pending' },
  crashed: { dot: '#ff0000', color: '#800000', key: 'status.crashed' },
  paused: { dot: '#a0a0a0', color: '#404040', key: 'status.paused' },
  done: { dot: '#0080ff', color: '#000080', key: 'status.done' },
};

export function Win95Status({
  status,
  testID,
}: {
  status: HabitStatus;
  testID?: string;
}) {
  const { t } = useTranslation();
  const cfg = CONFIG[status];
  return (
    <Row testID={testID}>
      <Dot $color={cfg.dot} />
      <Win95Text variant="caption" color={cfg.color}>
        {t(cfg.key)}
      </Win95Text>
    </Row>
  );
}
