import styled from 'styled-components/native';

export const HeaderBar = styled.View`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.borderDarker};
`;

export const HeaderCell = styled.View<{ $align?: 'left' | 'right' }>`
  padding: 4px 6px;
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderLight};
  border-left-color: ${({ theme }) => theme.colors.borderLight};
  border-right-color: ${({ theme }) => theme.colors.borderDark};
  align-items: ${({ $align }) =>
    $align === 'right' ? 'flex-end' : 'flex-start'};
`;
