import styled from 'styled-components/native';

export const MonitorPreview = styled.View`
  align-self: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const Monitor = styled.View`
  width: 140px;
  height: 96px;
  padding: 6px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderLight};
  border-left-color: ${({ theme }) => theme.colors.borderLight};
  border-right-color: ${({ theme }) => theme.colors.borderDarker};
  border-bottom-color: ${({ theme }) => theme.colors.borderDarker};
`;

export const MonitorBase = styled.View`
  width: 70px;
  height: 6px;
  margin-top: -1px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderLight};
  border-left-color: ${({ theme }) => theme.colors.borderLight};
  border-right-color: ${({ theme }) => theme.colors.borderDarker};
  border-bottom-color: ${({ theme }) => theme.colors.borderDarker};
`;

export const MonitorStand = styled.View`
  width: 40px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.borderDark};
`;

export const PreviewBg = styled.View`
  flex: 1;
  position: relative;
`;

export const PreviewBar = styled.View`
  height: 6px;
  width: 100%;
`;

export const PreviewWindow = styled.View`
  position: absolute;
  top: 12px;
  left: 8px;
  right: 8px;
  bottom: 12px;
  border-width: 1px;
  border-color: #000000;
`;

export const PreviewBody = styled.View`
  padding: 2px;
`;

export const PreviewLine = styled.View`
  height: 2px;
  width: 100%;
  background-color: #808080;
  margin-bottom: 1px;
`;

export const PreviewTaskbar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8px;
  border-top-width: 1px;
  border-top-color: #ffffff;
`;

export const ThemeRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const ThemeTile = styled.Pressable<{ $active?: boolean }>`
  width: 25%;
  padding: 4px;
  align-items: center;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.selectionBg : 'transparent'};
`;

export const Swatch = styled.View`
  width: 32px;
  height: 22px;
  border-width: 1px;
  border-color: #000000;
  margin-bottom: 2px;
`;

export const ThemeName = styled.View`
  align-items: center;
`;

export const ItemGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ItemLabel = styled.View`
  width: 60px;
  padding: 4px 0;
`;

export const ItemValue = styled.View`
  flex: 1;
  min-width: 0;
  padding: 4px 0;
`;

export const ItemField = styled.View`
  flex: 1;
  padding: 4px 0;
  padding-left: 4px;
`;

export const Footer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 12px;
  row-gap: 4px;
`;
