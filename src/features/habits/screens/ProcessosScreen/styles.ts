import styled from 'styled-components/native';

export const ListWrap = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const StatusLine = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 6px;
`;

export const Sep = styled.View`
  width: 1px;
  height: 10px;
  margin: 0 8px;
  background-color: ${({ theme }) => theme.colors.borderDark};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 8px;
`;

export const Empty = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;
