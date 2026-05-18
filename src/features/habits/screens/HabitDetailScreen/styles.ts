import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;

export const Avatar = styled.View`
  width: 56px;
  height: 56px;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const HeaderInfo = styled.View`
  flex: 1;
`;

export const StatGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

export const StatCell = styled.View`
  width: 50%;
  padding: 3px;
`;

export const HeatGrid = styled.View`
  flex-direction: row;
`;

export const HeatCol = styled.View`
  flex: 1;
`;

export const HeatDot = styled.View<{ $on: boolean }>`
  aspect-ratio: 1;
  margin: 1px;
  border-width: 1px;
  border-color: #000000;
  background-color: ${({ $on }) => ($on ? '#00a000' : '#e0e0e0')};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
`;
