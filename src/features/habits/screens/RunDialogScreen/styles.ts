import styled from 'styled-components/native';

export const Center = styled.View`
  flex: 1;
  justify-content: center;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const HeaderIcon = styled.View`
  width: 42px;
  margin-right: 10px;
`;

export const Field = styled.View`
  margin-bottom: 8px;
`;

export const IconGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
  padding: 2px;
`;

export const IconCell = styled.Pressable<{ $selected?: boolean }>`
  width: 12.5%;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.selectionBg : 'transparent'};
`;

export const DaysRow = styled.View`
  flex-direction: row;
  margin-top: 4px;
`;

export const DayToggle = styled.Pressable`
  width: 22px;
  height: 22px;
  margin-right: 2px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TwoCol = styled.View`
  flex-direction: row;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
`;
