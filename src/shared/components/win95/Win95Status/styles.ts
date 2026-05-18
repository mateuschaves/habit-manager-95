import styled from 'styled-components/native';

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Dot = styled.View<{ $color: string }>`
  width: 9px;
  height: 9px;
  margin-right: 4px;
  border-width: 1px;
  border-color: #000000;
  background-color: ${({ $color }) => $color};
`;
