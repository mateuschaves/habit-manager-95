import { fireEvent, screen } from '@testing-library/react-native';
import React from 'react';
import { renderWithProviders } from '@/test/utils';
import { Win95Button } from '../Win95Button';

describe('Win95Button', () => {
  it('renders the label', () => {
    renderWithProviders(<Win95Button label="Concluir" />);
    expect(screen.getByText('Concluir')).toBeTruthy();
  });

  it('fires onPress when enabled', () => {
    const onPress = jest.fn();
    renderWithProviders(
      <Win95Button label="OK" onPress={onPress} testID="btn" />
    );
    fireEvent.press(screen.getByTestId('btn'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    renderWithProviders(
      <Win95Button label="OK" onPress={onPress} disabled testID="btn" />
    );
    fireEvent.press(screen.getByTestId('btn'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it.each([
    ['primary', { primary: true }],
    ['danger', { danger: true }],
    ['active', { active: true }],
  ])('renders the %s variant', (_name, props) => {
    renderWithProviders(<Win95Button label="V" {...props} />);
    expect(screen.getByText('V')).toBeTruthy();
  });
});
