import styled from 'styled-components/native';

export const List = styled.View`
  padding: 2px;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const HabitRow = styled.Pressable<{ $selected?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 3px 4px;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.selectionBg : 'transparent'};
`;

export const HabitName = styled.View`
  flex: 1;
  margin-left: 6px;
`;

export const ScheduleGrid = styled.View`
  flex-direction: column;
`;

export const SchedulePill = styled.View`
  width: 32px;
  height: 22px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
  border-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderDark};
  border-left-color: ${({ theme }) => theme.colors.borderDark};
  border-right-color: ${({ theme }) => theme.colors.borderLight};
  border-bottom-color: ${({ theme }) => theme.colors.borderLight};
`;

export const DndRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 12px;
`;
