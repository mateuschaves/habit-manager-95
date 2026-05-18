import styled from 'styled-components/native';

export const Toolbar = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 4px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.borderDark};
`;

export const GridWrap = styled.View`
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
  padding: 8px;
`;

export const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Item = styled.Pressable`
  width: 33.3%;
  align-items: center;
  padding: 8px 4px;
`;

export const ItemLabel = styled.View`
  margin-top: 4px;
`;

export const Panel = styled.View`
  margin-top: 8px;
`;

export const PanelRow = styled.View`
  margin-bottom: 8px;
`;
