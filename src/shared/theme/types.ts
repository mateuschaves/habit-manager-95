export type PaletteName = 'classic' | 'plum' | 'hotdog' | 'hcblack';

export interface Palette {
  bg: string;
  surface: string;
  surfaceRaised: string;
  surfacePressed: string;
  surfaceDeep: string;
  titleBar: string;
  titleBar2: string;
  titleBarInactive: string;
  borderLight: string;
  borderLight2: string;
  borderDark: string;
  borderDarker: string;
  text: string;
  textOnDark: string;
  textDisabled: string;
  textDisabledHi: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  selectionBg: string;
  selectionFg: string;
  desktop: string;
  progress: string;
}

export interface Spacing {
  s1: number;
  s2: number;
  s3: number;
  s4: number;
  s5: number;
  s6: number;
  s7: number;
  s8: number;
}

export interface FontSizes {
  caption: number;
  body: number;
  label: number;
  title: number;
  heading: number;
}

export interface Fonts {
  ui: string;
  uiBold: string;
  mono: string;
}

export interface Win95Theme {
  name: PaletteName;
  colors: Palette;
  spacing: Spacing;
  fontSize: FontSizes;
  fonts: Fonts;
}
