import styled from 'styled-components/native';

export const NavRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const Grid = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
  padding: 4px;
`;

export const DowRow = styled.View`
  flex-direction: row;
`;

export const DowCell = styled.View`
  flex: 1;
  align-items: center;
  padding-bottom: 2px;
`;

export const Week = styled.View`
  flex-direction: row;
`;

export const Day = styled.View<{ $today?: boolean; $dim?: boolean }>`
  flex: 1;
  aspect-ratio: 1;
  margin: 1px;
  padding: 2px;
  border-width: ${({ $today }) => ($today ? 2 : 1)}px;
  border-color: ${({ theme, $today }) =>
    $today ? theme.colors.info : '#e0e0e0'};
  background-color: ${({ $today }) => ($today ? '#ffffe0' : '#ffffff')};
  opacity: ${({ $dim }) => ($dim ? 0.35 : 1)};
  align-items: center;
  justify-content: space-between;
`;

export const Marker = styled.View<{ $color: string }>`
  width: 7px;
  height: 7px;
  border-width: 1px;
  border-color: #000000;
  background-color: ${({ $color }) => $color};
`;

export const Legend = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;
