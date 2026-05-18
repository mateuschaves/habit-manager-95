import styled from 'styled-components/native';

export const Surface = styled.View<{ $disabled?: boolean }>`
  min-height: 34px;
  padding: 6px 14px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.surface : theme.colors.surface};
`;

export const IconSlot = styled.View`
  margin-right: 6px;
`;
