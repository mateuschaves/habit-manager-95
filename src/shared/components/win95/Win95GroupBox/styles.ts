import styled from 'styled-components/native';

export const Fieldset = styled.View`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.borderDark};
  padding: 14px 8px 8px;
  margin-top: 7px;
`;

export const Legend = styled.View`
  position: absolute;
  top: -8px;
  left: 8px;
  padding: 0 4px;
  background-color: ${({ theme }) => theme.colors.surface};
`;
