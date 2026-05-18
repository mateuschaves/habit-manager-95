import styled from 'styled-components/native';
import { Win95Theme } from '@/shared/theme';

export type BezelVariant =
  | 'raised'
  | 'pressed'
  | 'inset'
  | 'thinRaised'
  | 'thinInset';

interface SideColors {
  topLeft: string;
  bottomRight: string;
}

export function outerColors(
  theme: Win95Theme,
  variant: BezelVariant
): SideColors {
  const c = theme.colors;
  switch (variant) {
    case 'raised':
    case 'thinRaised':
      return { topLeft: c.borderLight, bottomRight: c.borderDarker };
    case 'pressed':
      return { topLeft: c.borderDarker, bottomRight: c.borderLight };
    case 'inset':
      return { topLeft: c.borderDark, bottomRight: c.borderLight };
    case 'thinInset':
      return { topLeft: c.borderDark, bottomRight: c.borderLight };
    default:
      return { topLeft: c.borderLight, bottomRight: c.borderDarker };
  }
}

export function innerColors(
  theme: Win95Theme,
  variant: BezelVariant
): SideColors {
  const c = theme.colors;
  switch (variant) {
    case 'raised':
      return { topLeft: c.borderLight2, bottomRight: c.borderDark };
    case 'pressed':
      return { topLeft: c.borderDark, bottomRight: c.borderLight2 };
    case 'inset':
      return { topLeft: c.borderDarker, bottomRight: c.borderLight2 };
    default:
      return { topLeft: c.borderLight2, bottomRight: c.borderDark };
  }
}

export const Outer = styled.View<{ $variant: BezelVariant }>`
  border-width: 1px;
  border-top-color: ${({ theme, $variant }) => outerColors(theme, $variant).topLeft};
  border-left-color: ${({ theme, $variant }) =>
    outerColors(theme, $variant).topLeft};
  border-right-color: ${({ theme, $variant }) =>
    outerColors(theme, $variant).bottomRight};
  border-bottom-color: ${({ theme, $variant }) =>
    outerColors(theme, $variant).bottomRight};
`;

export const Inner = styled.View<{ $variant: BezelVariant }>`
  border-width: 1px;
  border-top-color: ${({ theme, $variant }) => innerColors(theme, $variant).topLeft};
  border-left-color: ${({ theme, $variant }) =>
    innerColors(theme, $variant).topLeft};
  border-right-color: ${({ theme, $variant }) =>
    innerColors(theme, $variant).bottomRight};
  border-bottom-color: ${({ theme, $variant }) =>
    innerColors(theme, $variant).bottomRight};
`;
