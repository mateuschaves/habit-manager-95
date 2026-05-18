import { Palette, PaletteName } from './types';

// CLASSIC — the default Win95 grey. All other palettes are deltas off this.
const classic: Palette = {
  bg: '#c0c0c0',
  surface: '#c0c0c0',
  surfaceRaised: '#c0c0c0',
  surfacePressed: '#b8b8b8',
  surfaceDeep: '#ffffff',
  titleBar: '#000080',
  titleBar2: '#1084d0',
  titleBarInactive: '#808080',
  borderLight: '#ffffff',
  borderLight2: '#dfdfdf',
  borderDark: '#808080',
  borderDarker: '#000000',
  text: '#000000',
  textOnDark: '#ffffff',
  textDisabled: '#808080',
  textDisabledHi: '#ffffff',
  success: '#008000',
  warning: '#c08000',
  danger: '#800000',
  info: '#000080',
  selectionBg: '#000080',
  selectionFg: '#ffffff',
  desktop: '#008080',
  progress: '#000080',
};

const plum: Palette = {
  ...classic,
  bg: '#c2b8b6',
  surface: '#c2b8b6',
  surfaceRaised: '#c2b8b6',
  surfacePressed: '#b8aead',
  titleBar: '#5b4f5e',
  titleBar2: '#9d7f9d',
  titleBarInactive: '#8c8085',
  borderLight: '#efe7e6',
  borderLight2: '#d6cdcb',
  borderDark: '#856e6e',
  borderDarker: '#2b2225',
  desktop: '#5d8585',
};

const hotdog: Palette = {
  ...classic,
  bg: '#f9d000',
  surface: '#f9d000',
  surfaceRaised: '#f9d000',
  surfacePressed: '#e8c000',
  titleBar: '#c70000',
  titleBar2: '#ff4500',
  titleBarInactive: '#804000',
  borderLight: '#ffff80',
  borderLight2: '#ffe040',
  borderDark: '#c08000',
  borderDarker: '#804000',
  desktop: '#c70000',
  selectionBg: '#c70000',
  progress: '#c70000',
  textOnDark: '#ffffff',
};

const hcblack: Palette = {
  ...classic,
  bg: '#000000',
  surface: '#000000',
  surfaceRaised: '#000000',
  surfacePressed: '#202020',
  surfaceDeep: '#000000',
  titleBar: '#000080',
  titleBar2: '#0000ff',
  titleBarInactive: '#303030',
  borderLight: '#ffffff',
  borderLight2: '#c0c0c0',
  borderDark: '#ffffff',
  borderDarker: '#ffffff',
  text: '#ffffff',
  textDisabled: '#808080',
  desktop: '#000000',
  progress: '#00ff00',
};

export const palettes: Record<PaletteName, Palette> = {
  classic,
  plum,
  hotdog,
  hcblack,
};

export const PALETTE_LABELS: Record<PaletteName, string> = {
  classic: 'Classic',
  plum: 'Plum',
  hotdog: 'Hot Dog Stand',
  hcblack: 'Alto Contraste',
};
