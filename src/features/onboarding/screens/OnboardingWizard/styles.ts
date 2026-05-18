import styled from 'styled-components/native';

export const Body = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const SidePanel = styled.View`
  width: 104px;
  padding: 14px 8px;
  background-color: #000060;
  justify-content: space-between;
`;

export const StepItem = styled.View<{ $active?: boolean; $done?: boolean }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
`;

export const StepDot = styled.View<{ $done?: boolean }>`
  width: 6px;
  height: 6px;
  margin-right: 4px;
  background-color: ${({ $done }) => ($done ? '#00ff00' : '#ffffff')};
`;

export const Content = styled.View`
  flex: 1;
  padding: 14px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const WarnBox = styled.View`
  flex-direction: row;
  margin-top: 12px;
  padding: 6px;
  background-color: #ffffd0;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.borderDark};
`;

export const TemplateRow = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 3px 4px;
`;

export const TemplateName = styled.View`
  flex: 1;
  margin-left: 6px;
`;

export const SelectList = styled.View`
  height: 188px;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
  padding: 4px;
`;

export const ToolRow = styled.View`
  flex-direction: row;
  margin-top: 6px;
`;

export const SpaceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

export const CustomizeRow = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const DraftSidebar = styled.View`
  width: 92px;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
  padding: 2px;
`;

export const DraftItem = styled.Pressable<{ $active?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 4px;
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.selectionBg : 'transparent'};
`;

export const DraftRemove = styled.Pressable`
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  margin-left: 3px;
`;

export const NewDraft = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding: 5px 4px;
  margin-top: 4px;
  border-top-width: 1px;
  border-style: dashed;
  border-top-color: ${({ theme }) => theme.colors.borderDark};
`;

export const Form = styled.View`
  flex: 1;
  margin-left: 6px;
`;

export const FormField = styled.View`
  margin-bottom: 6px;
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

export const Progress = styled.View`
  margin-bottom: 8px;
`;

export const LogBox = styled.View`
  height: 110px;
  margin-top: 12px;
  padding: 6px;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderLight};
`;

export const FooterSpacer = styled.View`
  flex: 1;
`;
