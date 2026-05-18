import styled from 'styled-components/native';

export const TitleBar = styled.View<{ $inactive?: boolean }>`
  height: 24px;
  flex-direction: row;
  align-items: center;
  padding-left: 4px;
  padding-right: 2px;
  background-color: ${({ theme, $inactive }) =>
    $inactive ? theme.colors.titleBarInactive : theme.colors.titleBar};
`;

export const TitleText = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
`;

export const TitleIconSlot = styled.View`
  margin-right: 4px;
`;

export const Controls = styled.View`
  flex-direction: row;
`;

export const ControlButton = styled.Pressable`
  width: 18px;
  height: 16px;
  margin-left: 2px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Body = styled.View<{ $fullBleed?: boolean }>`
  padding: ${({ theme, $fullBleed }) => ($fullBleed ? 0 : theme.spacing.s3)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;
