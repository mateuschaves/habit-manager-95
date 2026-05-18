import styled from 'styled-components/native';

export const IntroRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const ListWrap = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const GroupHeader = styled.View`
  padding: 3px 6px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.borderDark};
`;

export const Row = styled.Pressable<{ $selected?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 6px 8px;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.selectionBg : 'transparent'};
`;

export const RowIcon = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const RowInfo = styled.View`
  flex: 1;
  min-width: 0;
`;

export const RowName = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

export const RowMeta = styled.View`
  margin-left: 6px;
`;

export const RowStatus = styled.View`
  width: 24px;
  align-items: center;
  justify-content: center;
`;

export const RunningDot = styled.View`
  width: 10px;
  height: 10px;
  background-color: #00ff00;
  border-width: 1px;
  border-color: #000000;
`;

export const Footer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 8px;
  row-gap: 4px;
`;
