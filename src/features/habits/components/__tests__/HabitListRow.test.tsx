import { fireEvent, screen } from '@testing-library/react-native';
import React from 'react';
import { HabitStatus, HabitWithStats } from '@/shared/types/habit';
import { renderWithProviders, sampleHabit } from '@/test/utils';
import { HabitListRow } from '../HabitListRow';

function withStats(status: HabitStatus): HabitWithStats {
  return {
    ...sampleHabit({ name: 'meditar' }),
    stats: {
      currentStreak: 12,
      bestStreak: 30,
      totalCompletions: 40,
      completionRate: 80,
      energy: status === 'crashed' ? 0 : 64,
      status,
      completedToday: status === 'done',
    },
  };
}

describe('HabitListRow', () => {
  it.each<HabitStatus>([
    'running',
    'pending',
    'crashed',
    'paused',
    'done',
  ])('renders the %s status row', (status) => {
    renderWithProviders(<HabitListRow habit={withStats(status)} />);
    expect(screen.getByText('meditar.exe')).toBeTruthy();
    expect(screen.getByText('12d')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    renderWithProviders(
      <HabitListRow
        habit={withStats('pending')}
        onPress={onPress}
        testID="row"
      />
    );
    fireEvent.press(screen.getByTestId('row'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders a selected row', () => {
    renderWithProviders(
      <HabitListRow habit={withStats('done')} selected testID="row" />
    );
    expect(screen.getByText('meditar.exe')).toBeTruthy();
  });
});
