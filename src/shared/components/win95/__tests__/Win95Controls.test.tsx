import { fireEvent, screen } from '@testing-library/react-native';
import React from 'react';
import { renderWithProviders } from '@/test/utils';
import { Win95Checkbox } from '../Win95Checkbox';
import { Win95Radio } from '../Win95Radio';
import { Win95Progress } from '../Win95Progress';
import { Win95Tabs } from '../Win95Tabs';
import { Win95Text } from '../Win95Text';

describe('Win95Checkbox', () => {
  it.each([true, false])('renders checked=%s with label', (checked) => {
    renderWithProviders(
      <Win95Checkbox checked={checked} label="Avisar" testID="cb" />
    );
    expect(screen.getByText('Avisar')).toBeTruthy();
    expect(screen.getByTestId('cb').props.accessibilityState.checked).toBe(
      checked
    );
  });

  it('toggles to the opposite value', () => {
    const onToggle = jest.fn();
    renderWithProviders(
      <Win95Checkbox checked={false} onToggle={onToggle} testID="cb" />
    );
    fireEvent.press(screen.getByTestId('cb'));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe('Win95Radio', () => {
  it.each([true, false])('renders selected=%s', (checked) => {
    renderWithProviders(
      <Win95Radio checked={checked} label="Diário" testID="r" />
    );
    expect(screen.getByTestId('r').props.accessibilityState.selected).toBe(
      checked
    );
  });

  it('calls onSelect', () => {
    const onSelect = jest.fn();
    renderWithProviders(
      <Win95Radio checked={false} onSelect={onSelect} testID="r" />
    );
    fireEvent.press(screen.getByTestId('r'));
    expect(onSelect).toHaveBeenCalled();
  });
});

describe('Win95Progress', () => {
  it.each([
    [-20, 0],
    [50, 50],
    [140, 100],
  ])('clamps value %s to %s', (value, expected) => {
    renderWithProviders(<Win95Progress value={value} testID="p" />);
    expect(screen.getByTestId('p').props.accessibilityValue.now).toBe(
      expected
    );
  });
});

describe('Win95Tabs', () => {
  it('marks the active tab and changes on press', () => {
    const onChange = jest.fn();
    renderWithProviders(
      <Win95Tabs
        tabs={['A', 'B', 'C']}
        active={1}
        onChange={onChange}
        testID="tabs"
      />
    );
    expect(
      screen.getByTestId('tabs-tab-1').props.accessibilityState.selected
    ).toBe(true);
    fireEvent.press(screen.getByTestId('tabs-tab-2'));
    expect(onChange).toHaveBeenCalledWith(2);
  });
});

describe('Win95Text', () => {
  it.each(['caption', 'body', 'label', 'title', 'heading'] as const)(
    'renders the %s variant',
    (variant) => {
      renderWithProviders(<Win95Text variant={variant}>Hello</Win95Text>);
      expect(screen.getByText('Hello')).toBeTruthy();
    }
  );
});
