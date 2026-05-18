import styled from 'styled-components/native';

export const RowWrap = styled.Pressable<{ $selected?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 4px 4px;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.selectionBg : 'transparent'};
`;

export const Cell = styled.View<{ $align?: 'left' | 'right' }>`
  flex-direction: row;
  align-items: center;
  padding: 0 4px;
  overflow: hidden;
  justify-content: ${({ $align }) =>
    $align === 'right' ? 'flex-end' : 'flex-start'};
`;
