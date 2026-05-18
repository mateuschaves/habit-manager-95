import styled from 'styled-components/native';

export const Tree = styled.View`
  padding: 2px;
  background-color: #ffffff;
  min-height: 170px;
`;

export const TocRow = styled.Pressable<{ $selected?: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 2px 4px;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.selectionBg : 'transparent'};
`;

export const TocSpacer = styled.View``;

export const Article = styled.View`
  margin-top: 6px;
  padding: 8px;
  background-color: #ffffe0;
  border-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderDark};
  border-left-color: ${({ theme }) => theme.colors.borderDark};
  border-right-color: ${({ theme }) => theme.colors.borderLight};
  border-bottom-color: ${({ theme }) => theme.colors.borderLight};
`;

export const ArticleLink = styled.Text`
  color: #000080;
  text-decoration-line: underline;
`;

export const HelpHint = styled.View`
  flex: 1;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;
