import styled from 'styled-components/native';

export const ListWrap = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const AppRow = styled.Pressable<{ $selected?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 6px 8px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.selectionBg : 'transparent'};
`;

export const IconSlot = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const Info = styled.View`
  flex: 1;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 8px;
`;
