import styled from 'styled-components/native';

export type TextVariant = 'caption' | 'body' | 'label' | 'title' | 'heading';

export const StyledText = styled.Text<{
  $variant: TextVariant;
  $bold?: boolean;
  $mono?: boolean;
  $onDark?: boolean;
  $color?: string;
}>`
  font-family: ${({ theme, $mono, $bold }) =>
    $mono ? theme.fonts.mono : $bold ? theme.fonts.uiBold : theme.fonts.ui};
  font-size: ${({ theme, $variant }) => theme.fontSize[$variant]}px;
  color: ${({ theme, $onDark, $color }) =>
    $color ?? ($onDark ? theme.colors.textOnDark : theme.colors.text)};
`;
