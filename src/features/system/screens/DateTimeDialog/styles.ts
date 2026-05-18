import styled from 'styled-components/native';

export const DateRow = styled.View`
  flex-direction: row;
`;

export const CalCol = styled.View`
  flex: 1;
`;

export const MonthRow = styled.View`
  flex-direction: row;
  margin-bottom: 4px;
`;

export const CalDows = styled.View`
  flex-direction: row;
  padding-bottom: 2px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.surface};
`;

export const CalDow = styled.View`
  flex: 1;
  align-items: center;
`;

export const CalGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CalDay = styled.Pressable<{ $today?: boolean; $dim?: boolean }>`
  width: 14.28%;
  align-items: center;
  padding: 3px 0;
  background-color: ${({ $today, theme }) =>
    $today ? theme.colors.selectionBg : 'transparent'};
  opacity: ${({ $dim }) => ($dim ? 0.4 : 1)};
`;

export const ClockCol = styled.View`
  width: 130px;
  align-items: center;
  margin-left: 8px;
`;

export const ClockReadout = styled.View`
  margin-top: 4px;
`;

export const Warning = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  padding: 6px;
  background-color: #ffffd0;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.borderDark};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 12px;
`;
