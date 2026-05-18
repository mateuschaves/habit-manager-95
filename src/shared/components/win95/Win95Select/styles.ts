import styled from 'styled-components/native';

export const SelectRow = styled.View`
  flex-direction: row;
  align-items: center;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const ValueSlot = styled.View`
  flex: 1;
  padding: 0 4px;
`;

export const Arrow = styled.View`
  width: 22px;
  height: 26px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Backdrop = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.35);
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const Menu = styled.View`
  width: 100%;
  max-width: 320px;
  max-height: 360px;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const Option = styled.Pressable<{ $selected?: boolean }>`
  padding: 8px 10px;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.selectionBg : 'transparent'};
`;
