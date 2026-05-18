import styled from 'styled-components/native';

export const Box = styled.View`
  padding: 6px 8px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ValueRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
