import styled from 'styled-components/native';

export const Root = styled.View`
  flex: 1;
  background-color: #000000;
  padding-left: 12px;
  padding-right: 12px;
  padding-bottom: 12px;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const Block = styled.View`
  margin-bottom: 10px;
`;

export const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

export const Indent = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
`;

export const Mono = styled.Text<{ $c?: string; $s?: number; $b?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ $c }) => $c ?? '#c0c0c0'};
  font-size: ${({ $s }) => $s ?? 14}px;
  line-height: ${({ $s }) => Math.round((($s ?? 14) as number) * 1.35)}px;
`;

export const KeyCap = styled.View`
  background-color: #c0c0c0;
  padding-left: 4px;
  padding-right: 4px;
  margin-left: 3px;
  margin-right: 3px;
`;

export const PressBlock = styled.View`
  margin-top: 24px;
`;

export const Cursor = styled.View`
  margin-top: 60px;
  flex-direction: row;
  align-items: center;
`;
