import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 2px;
`;

export const Screen = styled.View`
  height: 70px;
  flex-direction: row;
  align-items: flex-end;
  background-color: #000000;
  padding: 2px;
`;

export const Bar = styled.View<{ $h: number; $color: string }>`
  flex: 1;
  margin-right: 1px;
  height: ${({ $h }) => Math.max(2, $h)}%;
  background-color: ${({ $color }) => $color};
`;
