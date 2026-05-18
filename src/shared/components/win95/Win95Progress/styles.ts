import styled from 'styled-components/native';

export const Track = styled.View`
  height: 18px;
  padding: 2px;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const Segment = styled.View<{ $filled: boolean; $color?: string }>`
  flex: 1;
  margin-right: 2px;
  background-color: ${({ theme, $filled, $color }) =>
    $filled ? $color ?? theme.colors.progress : 'transparent'};
`;
