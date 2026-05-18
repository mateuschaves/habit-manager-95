import styled from 'styled-components/native';

export const Bar = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const Tab = styled.Pressable<{ $active: boolean }>`
  flex: 1;
  min-width: 0;
  padding: ${({ $active }) => ($active ? '7px 4px 6px' : '5px 4px 4px')};
  margin-right: -1px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderLight};
  border-left-color: ${({ theme }) => theme.colors.borderLight};
  border-right-color: ${({ theme }) => theme.colors.borderDarker};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

export const Pane = styled.View`
  border-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderLight};
  border-left-color: ${({ theme }) => theme.colors.borderLight};
  border-right-color: ${({ theme }) => theme.colors.borderDark};
  border-bottom-color: ${({ theme }) => theme.colors.borderDark};
  background-color: ${({ theme }) => theme.colors.surface};
`;
