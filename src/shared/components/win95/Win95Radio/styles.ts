import styled from 'styled-components/native';

export const Row = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding: 2px 0;
`;

export const Outer = styled.View`
  width: 14px;
  height: 14px;
  border-radius: 7px;
  border-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderDark};
  border-left-color: ${({ theme }) => theme.colors.borderDark};
  border-right-color: ${({ theme }) => theme.colors.borderLight};
  border-bottom-color: ${({ theme }) => theme.colors.borderLight};
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
  align-items: center;
  justify-content: center;
`;

export const Dot = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.text};
`;

export const LabelSlot = styled.View`
  margin-left: 6px;
  flex-shrink: 1;
`;
