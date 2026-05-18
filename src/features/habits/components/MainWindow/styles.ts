import styled from 'styled-components/native';

export const MenuBar = styled.View`
  flex-direction: row;
  padding: 2px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.borderDark};
`;

export const MenuItem = styled.Pressable`
  padding: 2px 8px;
`;

export const TabsWrap = styled.View`
  padding: 4px 4px 0;
`;

export const PaneInner = styled.View`
  flex: 1;
  padding: 8px;
`;
