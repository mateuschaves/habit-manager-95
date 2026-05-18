import { screen } from '@testing-library/react-native';
import React from 'react';
import { renderWithProviders } from '@/test/utils';
import { StatBox } from '../StatBox';
import { PerfGraph } from '../PerfGraph';

describe('StatBox', () => {
  it('renders label, value and unit', () => {
    renderWithProviders(
      <StatBox label="Streak atual" value={47} unit="dias" />
    );
    expect(screen.getByText('Streak atual')).toBeTruthy();
    expect(screen.getByText('47')).toBeTruthy();
    expect(screen.getByText('dias')).toBeTruthy();
  });

  it('renders the hot variant without a unit', () => {
    renderWithProviders(<StatBox label="Taxa" value="94" hot />);
    expect(screen.getByText('94')).toBeTruthy();
  });
});

describe('PerfGraph', () => {
  it('renders label and value with bars', () => {
    renderWithProviders(
      <PerfGraph
        label="Consistência"
        value="83%"
        data={[10, 50, 90]}
        testID="g"
      />
    );
    expect(screen.getByText('Consistência')).toBeTruthy();
    expect(screen.getByText('83%')).toBeTruthy();
    expect(screen.getByTestId('g')).toBeTruthy();
  });

  it('handles an all-zero dataset without dividing by zero', () => {
    renderWithProviders(
      <PerfGraph label="Foco" value="0%" data={[0, 0, 0]} testID="g" />
    );
    expect(screen.getByTestId('g')).toBeTruthy();
  });
});
