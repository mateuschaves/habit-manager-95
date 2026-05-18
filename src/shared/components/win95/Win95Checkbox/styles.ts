import styled from 'styled-components/native';

export const Row = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

export const Box = styled.View`
  width: 15px;
  height: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const LabelSlot = styled.View`
  margin-left: 6px;
  flex-shrink: 1;
`;
