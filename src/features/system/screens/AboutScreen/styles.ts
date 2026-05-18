import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  margin-bottom: 12px;
`;

export const Logo = styled.View`
  width: 64px;
  height: 64px;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #000000;
  background-color: #008080;
`;

export const Info = styled.View`
  flex: 1;
`;

export const Divider = styled.View`
  height: 2px;
  margin: 8px 0;
  background-color: ${({ theme }) => theme.colors.borderDark};
`;

export const ResRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 2px 0;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 12px;
`;
