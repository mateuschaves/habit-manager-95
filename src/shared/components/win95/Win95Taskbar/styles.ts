import styled from 'styled-components/native';

export const Bar = styled.View`
  height: 36px;
  flex-direction: row;
  align-items: center;
  padding: 3px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const StartButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding: 3px 8px 3px 5px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const StartLabel = styled.View`
  margin-left: 4px;
`;

export const Divider = styled.View`
  width: 2px;
  height: 24px;
  margin: 0 4px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-left-color: ${({ theme }) => theme.colors.borderDark};
  border-right-color: ${({ theme }) => theme.colors.borderLight};
`;

export const ActiveTask = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 3px 8px;
  background-color: ${({ theme }) => theme.colors.surfacePressed};
`;

export const Tray = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  margin-left: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderDark};
  border-left-color: ${({ theme }) => theme.colors.borderDark};
  border-right-color: ${({ theme }) => theme.colors.borderLight};
  border-bottom-color: ${({ theme }) => theme.colors.borderLight};
`;

export const ActiveLabel = styled.View`
  margin-left: 4px;
  flex: 1;
`;

export const Clock = styled.View`
  margin-left: 6px;
`;
