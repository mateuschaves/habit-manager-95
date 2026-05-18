import { palettes } from './palettes';
import { Fonts, FontSizes, PaletteName, Spacing, Win95Theme } from './types';

export const spacing: Spacing = {
  s1: 2,
  s2: 4,
  s3: 6,
  s4: 8,
  s5: 12,
  s6: 16,
  s7: 24,
  s8: 32,
};

export const fontSize: FontSizes = {
  caption: 11,
  body: 14,
  label: 15,
  title: 16,
  heading: 20,
};

// Loaded by expo-font in App bootstrap. Falls back to the platform font
// until (or if) the bitmap faces are available.
export const fonts: Fonts = {
  ui: 'PixelifySans_400Regular',
  uiBold: 'PixelifySans_700Bold',
  mono: 'VT323_400Regular',
};

export function buildTheme(name: PaletteName): Win95Theme {
  return {
    name,
    colors: palettes[name],
    spacing,
    fontSize,
    fonts,
  };
}

export const defaultTheme = buildTheme('classic');

export * from './types';
export { palettes, PALETTE_LABELS } from './palettes';
