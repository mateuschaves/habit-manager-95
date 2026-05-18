import styled from 'styled-components/native';

export const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.45);
`;

export const Shadow = styled.View`
  position: absolute;
  left: 12px;
  right: 12px;
  shadow-color: #000000;
  shadow-offset: 4px 4px;
  shadow-opacity: 0.4;
  shadow-radius: 0px;
  elevation: 6;
`;

export const Dialog = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
`;
