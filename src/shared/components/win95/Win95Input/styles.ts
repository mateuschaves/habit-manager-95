import styled from 'styled-components/native';

export const Field = styled.TextInput`
  height: 30px;
  padding: 0 4px;
  font-family: ${({ theme }) => theme.fonts.ui};
  font-size: ${({ theme }) => theme.fontSize.body}px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const LabelWrap = styled.View`
  margin-bottom: 2px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
`;

export const Suffix = styled.View`
  padding: 0 4px;
`;
