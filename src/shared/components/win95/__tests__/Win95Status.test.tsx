import { screen } from '@testing-library/react-native';
import React from 'react';
import { HabitStatus } from '@/shared/types/habit';
import { renderWithProviders } from '@/test/utils';
import { Win95Status } from '../Win95Status';

const CASES: Array<[HabitStatus, string, string]> = [
  ['running', 'Rodando', 'Running'],
  ['pending', 'Pendente', 'Pending'],
  ['crashed', 'Não responde', 'Not responding'],
  ['paused', 'Suspenso', 'Suspended'],
  ['done', 'Concluído', 'Completed'],
];

describe('Win95Status', () => {
  it.each(CASES)('renders %s in pt-BR', (status, pt) => {
    renderWithProviders(<Win95Status status={status} />, {
      language: 'pt-BR',
    });
    expect(screen.getByText(pt)).toBeTruthy();
  });

  it.each(CASES)('renders %s in en-US', (status, _pt, en) => {
    renderWithProviders(<Win95Status status={status} />, {
      language: 'en-US',
    });
    expect(screen.getByText(en)).toBeTruthy();
  });
});
