import styled from 'styled-components/native';

export const MonitorWrap = styled.View`
  align-self: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const MonitorBezel = styled.View`
  width: 168px;
  padding: 8px 12px 24px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderLight};
  border-left-color: ${({ theme }) => theme.colors.borderLight};
  border-right-color: ${({ theme }) => theme.colors.borderDarker};
  border-bottom-color: ${({ theme }) => theme.colors.borderDarker};
  position: relative;
`;

export const BsodPreview = styled.View`
  background-color: #0000aa;
  padding: 6px;
  min-height: 90px;
`;

export const BsodTag = styled.View`
  align-self: flex-start;
  background-color: #c0c0c0;
  padding: 0 3px;
  margin-bottom: 4px;
`;

export const Led = styled.View`
  position: absolute;
  bottom: 8px;
  right: 14px;
  width: 5px;
  height: 5px;
  background-color: #00ff00;
  border-width: 1px;
  border-color: #000000;
`;

export const Stand = styled.View`
  width: 60px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.borderDark};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Spinner = styled.View`
  margin-left: 2px;
`;

export const SpinnerLine = styled.View`
  width: 16px;
  height: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Slider = styled.View`
  flex: 1;
  height: 22px;
  position: relative;
  justify-content: center;
`;

export const SliderHit = styled.View`
  flex: 1;
  height: 22px;
  justify-content: center;
  position: relative;
`;

export const SliderTrack = styled.View`
  height: 4px;
  background-color: ${({ theme }) => theme.colors.surfaceDeep};
  border-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderDark};
  border-left-color: ${({ theme }) => theme.colors.borderDark};
  border-right-color: ${({ theme }) => theme.colors.borderLight};
  border-bottom-color: ${({ theme }) => theme.colors.borderLight};
`;

export const SliderThumb = styled.View`
  position: absolute;
  top: 2px;
  width: 10px;
  height: 18px;
  margin-left: -5px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.borderLight};
  border-left-color: ${({ theme }) => theme.colors.borderLight};
  border-right-color: ${({ theme }) => theme.colors.borderDarker};
  border-bottom-color: ${({ theme }) => theme.colors.borderDarker};
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 12px;
`;
