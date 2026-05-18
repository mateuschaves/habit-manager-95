import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { HabitIconKey } from '@/shared/types/habit';

export interface IconProps {
  size?: number;
  testID?: string;
}

const PX = {
  k: '#000000',
  d: '#404040',
  g: '#808080',
  l: '#c0c0c0',
  w: '#ffffff',
  y: '#fcff00',
  o: '#ff8000',
  r: '#ff0000',
  R: '#800000',
  b: '#0000ff',
  B: '#000080',
  c: '#00ffff',
  G: '#008000',
  gr: '#00ff00',
  s: '#ffcc99',
  br: '#804000',
};

const r = (
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  key?: string | number
) => <Rect key={key} x={x} y={y} width={w} height={h} fill={fill} />;

function Frame({
  size = 16,
  grid = 16,
  children,
  testID,
}: {
  size?: number;
  grid?: number;
  children: React.ReactNode;
  testID?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${grid} ${grid}`} testID={testID}>
      {children}
    </Svg>
  );
}

export const IconExe = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(1, 1, 14, 14, PX.l)}
    {r(1, 1, 14, 3, PX.B)}
    {r(1, 1, 14, 1, PX.k)}
    {r(1, 14, 14, 1, PX.k)}
    {r(1, 1, 1, 14, PX.k)}
    {r(14, 1, 1, 14, PX.k)}
    {r(4, 6, 8, 1, PX.k)}
    {r(4, 9, 8, 1, PX.k)}
    {r(4, 12, 5, 1, PX.k)}
  </Frame>
);

export const IconFolder = ({
  size,
  testID,
  open,
}: IconProps & { open?: boolean }) => (
  <Frame size={size} testID={testID}>
    {r(1, 4, 5, 1, PX.k)}
    {r(1, 3, 4, 1, PX.k)}
    {r(6, 5, 9, 1, PX.k)}
    {r(2, 5, 13, 8, PX.y)}
    {r(1, 13, 14, 1, PX.k)}
    {r(1, 5, 1, 9, PX.k)}
    {r(15, 5, 1, 9, PX.k)}
    {r(2, 5, 13, 1, PX.w)}
    {r(2, 6, 1, 7, PX.w)}
    {open ? r(3, 7, 11, 1, PX.o) : null}
  </Frame>
);

export const IconFile = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(3, 1, 7, 13, PX.w)}
    {r(10, 4, 3, 10, PX.w)}
    {r(3, 1, 7, 1, PX.k)}
    {r(13, 4, 1, 10, PX.k)}
    {r(3, 14, 11, 1, PX.k)}
    {r(3, 1, 1, 13, PX.k)}
    {r(5, 5, 5, 1, PX.k)}
    {r(5, 7, 7, 1, PX.k)}
    {r(5, 9, 7, 1, PX.k)}
    {r(5, 11, 5, 1, PX.k)}
  </Frame>
);

export const IconTrash = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(3, 3, 10, 1, PX.k)}
    {r(6, 2, 4, 1, PX.k)}
    {r(4, 4, 8, 11, PX.l)}
    {r(4, 4, 1, 11, PX.k)}
    {r(11, 4, 1, 11, PX.k)}
    {r(4, 15, 8, 1, PX.k)}
    {r(6, 6, 1, 8, PX.k)}
    {r(9, 6, 1, 8, PX.k)}
  </Frame>
);

export const IconGear = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(7, 1, 2, 2, PX.k)}
    {r(7, 13, 2, 2, PX.k)}
    {r(1, 7, 2, 2, PX.k)}
    {r(13, 7, 2, 2, PX.k)}
    {r(3, 3, 2, 2, PX.k)}
    {r(11, 3, 2, 2, PX.k)}
    {r(3, 11, 2, 2, PX.k)}
    {r(11, 11, 2, 2, PX.k)}
    {r(4, 4, 8, 8, PX.l)}
    {r(6, 6, 4, 4, PX.k)}
    {r(7, 7, 2, 2, PX.w)}
  </Frame>
);

export const IconHelp = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(3, 1, 10, 14, PX.y)}
    {r(3, 1, 10, 1, PX.k)}
    {r(3, 14, 10, 1, PX.k)}
    {r(3, 1, 1, 14, PX.k)}
    {r(12, 1, 1, 14, PX.k)}
    {r(6, 3, 4, 1, PX.k)}
    {r(9, 5, 2, 2, PX.k)}
    {r(7, 7, 2, 2, PX.k)}
    {r(7, 10, 2, 2, PX.k)}
  </Frame>
);

export const IconClose = ({
  size,
  testID,
  color = PX.k,
}: IconProps & { color?: string }) => (
  <Frame size={size} testID={testID}>
    <Path d="M4 4 L12 12 M12 4 L4 12" stroke={color} strokeWidth={2} />
  </Frame>
);

export const IconRun = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(8, 2, 2, 2, PX.s)}
    {r(8, 2, 2, 1, PX.br)}
    {r(6, 5, 3, 3, PX.b)}
    {r(5, 9, 2, 3, PX.B)}
    {r(9, 9, 2, 3, PX.B)}
    {r(3, 12, 3, 1, PX.k)}
    {r(10, 12, 3, 1, PX.k)}
    {r(3, 5, 2, 2, PX.s)}
    {r(10, 6, 3, 1, PX.s)}
  </Frame>
);

export const IconBook = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(2, 2, 6, 12, PX.R)}
    {r(8, 2, 6, 12, PX.B)}
    {r(2, 2, 12, 1, PX.k)}
    {r(2, 13, 12, 1, PX.k)}
    {r(2, 2, 1, 12, PX.k)}
    {r(13, 2, 1, 12, PX.k)}
    {r(7, 2, 1, 12, PX.k)}
    {r(3, 4, 4, 1, PX.w)}
    {r(3, 6, 4, 1, PX.w)}
    {r(9, 4, 4, 1, PX.w)}
    {r(9, 6, 4, 1, PX.w)}
  </Frame>
);

export const IconWater = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(4, 2, 8, 1, PX.k)}
    {r(4, 2, 1, 13, PX.k)}
    {r(11, 2, 1, 13, PX.k)}
    {r(4, 14, 8, 1, PX.k)}
    {r(5, 3, 6, 11, PX.w)}
    {r(5, 8, 6, 6, PX.c)}
    {r(6, 7, 4, 1, PX.c)}
  </Frame>
);

export const IconMeditate = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(7, 2, 3, 3, PX.s)}
    {r(7, 2, 3, 1, PX.br)}
    {r(5, 6, 7, 3, PX.o)}
    {r(3, 9, 11, 3, PX.o)}
    {r(3, 12, 11, 1, PX.k)}
    {r(3, 9, 1, 3, PX.k)}
    {r(13, 9, 1, 3, PX.k)}
    {r(5, 6, 7, 1, PX.k)}
  </Frame>
);

export const IconSleep = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(3, 5, 6, 9, PX.B)}
    {r(2, 6, 1, 7, PX.B)}
    {r(3, 5, 6, 1, PX.k)}
    {r(3, 14, 6, 1, PX.k)}
    {r(2, 6, 1, 8, PX.k)}
    {r(3, 8, 2, 2, PX.w)}
    {r(11, 2, 4, 1, PX.k)}
    {r(11, 5, 4, 1, PX.k)}
    {r(13, 3, 1, 1, PX.k)}
    {r(12, 4, 1, 1, PX.k)}
  </Frame>
);

export const IconExercise = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(1, 5, 2, 6, PX.k)}
    {r(13, 5, 2, 6, PX.k)}
    {r(3, 6, 2, 4, PX.k)}
    {r(11, 6, 2, 4, PX.k)}
    {r(5, 7, 6, 2, PX.k)}
    {r(1, 5, 2, 2, PX.l)}
    {r(13, 5, 2, 2, PX.l)}
    {r(5, 7, 6, 1, PX.l)}
  </Frame>
);

export const IconFood = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(8, 2, 2, 2, PX.G)}
    {r(7, 3, 1, 1, PX.G)}
    {r(4, 5, 8, 1, PX.k)}
    {r(3, 6, 10, 1, PX.k)}
    {r(3, 7, 10, 6, PX.r)}
    {r(3, 13, 10, 1, PX.k)}
    {r(4, 14, 8, 1, PX.k)}
    {r(3, 6, 1, 7, PX.k)}
    {r(12, 6, 1, 7, PX.k)}
    {r(5, 8, 2, 2, PX.w)}
  </Frame>
);

export const IconStudy = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(1, 6, 14, 3, PX.k)}
    {r(2, 7, 12, 1, PX.B)}
    {r(4, 9, 8, 4, PX.k)}
    {r(5, 10, 6, 2, PX.l)}
    {r(13, 9, 1, 3, PX.k)}
    {r(13, 12, 2, 1, PX.r)}
  </Frame>
);

export const IconCheck = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(2, 8, 2, 2, PX.G)}
    {r(3, 9, 2, 2, PX.G)}
    {r(4, 10, 2, 2, PX.G)}
    {r(5, 9, 2, 2, PX.G)}
    {r(6, 8, 2, 2, PX.G)}
    {r(7, 7, 2, 2, PX.G)}
    {r(8, 6, 2, 2, PX.G)}
    {r(9, 5, 2, 2, PX.G)}
    {r(10, 4, 2, 2, PX.G)}
    {r(11, 3, 2, 2, PX.G)}
  </Frame>
);

export const IconX = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    <Path d="M3 3 L13 13 M13 3 L3 13" stroke={PX.r} strokeWidth={2} />
  </Frame>
);

export const IconAlert = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    <Path d="M8 1 L15 14 L1 14 Z" fill={PX.y} stroke={PX.k} strokeWidth={1} />
    {r(7, 6, 2, 4, PX.k)}
    {r(7, 11, 2, 2, PX.k)}
  </Frame>
);

export const IconInfo = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    <Circle cx={8} cy={8} r={7} fill={PX.b} stroke={PX.k} />
    {r(7, 4, 2, 2, PX.w)}
    {r(7, 7, 2, 5, PX.w)}
  </Frame>
);

export const IconMonitor = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(1, 2, 14, 10, PX.l)}
    {r(1, 2, 14, 1, PX.k)}
    {r(1, 11, 14, 1, PX.k)}
    {r(1, 2, 1, 9, PX.k)}
    {r(14, 2, 1, 9, PX.k)}
    {r(2, 3, 12, 8, PX.k)}
    {r(4, 6, 1, 4, PX.gr)}
    {r(6, 5, 1, 5, PX.gr)}
    {r(8, 4, 1, 6, PX.gr)}
    {r(10, 6, 1, 4, PX.gr)}
    {r(12, 7, 1, 3, PX.gr)}
    {r(5, 13, 6, 2, PX.l)}
    {r(3, 14, 10, 1, PX.k)}
  </Frame>
);

export const IconCalendar = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    <Rect x={2} y={3} width={12} height={11} fill={PX.w} stroke={PX.k} />
    {r(2, 3, 12, 3, PX.r)}
    {r(4, 2, 1, 3, PX.k)}
    {r(11, 2, 1, 3, PX.k)}
    {r(4, 7, 2, 1, PX.k)}
    {r(7, 7, 2, 1, PX.k)}
    {r(10, 7, 2, 1, PX.k)}
    {r(4, 9, 2, 1, PX.k)}
    {r(7, 9, 2, 1, PX.k)}
    {r(10, 9, 2, 1, PX.k)}
    {r(4, 11, 2, 1, PX.k)}
    {r(7, 11, 2, 1, PX.k)}
  </Frame>
);

export const IconList = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(2, 2, 2, 2, PX.k)}
    {r(2, 7, 2, 2, PX.k)}
    {r(2, 12, 2, 2, PX.k)}
    {r(5, 3, 9, 1, PX.k)}
    {r(5, 8, 9, 1, PX.k)}
    {r(5, 13, 9, 1, PX.k)}
  </Frame>
);

export const IconProcesses = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    <Rect x={2} y={3} width={12} height={10} fill={PX.w} stroke={PX.k} />
    {r(2, 3, 12, 2, PX.B)}
    {r(3, 6, 10, 1, PX.k)}
    {r(3, 8, 10, 1, PX.k)}
    {r(3, 10, 6, 1, PX.k)}
  </Frame>
);

export const IconComputer = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(1, 2, 14, 9, PX.l)}
    {r(2, 3, 12, 6, PX.B)}
    {r(1, 2, 14, 1, PX.w)}
    {r(1, 2, 1, 9, PX.w)}
    {r(3, 4, 2, 2, PX.c)}
    {r(4, 11, 8, 2, PX.l)}
    {r(3, 13, 10, 2, PX.l)}
  </Frame>
);

export const IconFloppy = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(1, 1, 14, 14, PX.k)}
    {r(2, 2, 12, 12, PX.l)}
    {r(4, 2, 8, 5, PX.k)}
    {r(5, 3, 3, 3, PX.l)}
    {r(9, 3, 1, 3, PX.w)}
    {r(4, 9, 8, 5, PX.w)}
    {r(5, 10, 6, 1, PX.k)}
    {r(5, 12, 6, 1, PX.k)}
  </Frame>
);

export const IconBell = ({ size, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(7, 1, 2, 2, PX.k)}
    {r(4, 3, 8, 1, PX.k)}
    {r(3, 4, 10, 7, PX.y)}
    {r(3, 4, 1, 7, PX.k)}
    {r(12, 4, 1, 7, PX.k)}
    {r(2, 11, 12, 1, PX.k)}
    {r(7, 12, 2, 2, PX.k)}
  </Frame>
);

export const IconRun32 = ({ size = 32, testID }: IconProps) => (
  <Frame size={size} grid={32} testID={testID}>
    <Rect x={2} y={4} width={28} height={24} fill={PX.l} stroke={PX.k} />
    {r(2, 4, 28, 5, PX.B)}
    <Rect x={4} y={12} width={6} height={13} fill={PX.w} stroke={PX.k} />
    <Rect x={12} y={12} width={16} height={13} fill={PX.w} stroke={PX.k} />
    {r(14, 15, 12, 2, PX.k)}
    {r(14, 19, 10, 2, PX.k)}
  </Frame>
);

export const Win95Logo = ({ size = 16, testID }: IconProps) => (
  <Frame size={size} testID={testID}>
    {r(1, 2, 6, 6, PX.r)}
    {r(8, 2, 6, 6, PX.gr)}
    {r(1, 9, 6, 6, '#0080ff')}
    {r(8, 9, 6, 6, PX.y)}
  </Frame>
);

export const HABIT_ICONS: Record<HabitIconKey, React.FC<IconProps>> = {
  run: IconRun,
  book: IconBook,
  water: IconWater,
  meditate: IconMeditate,
  sleep: IconSleep,
  exercise: IconExercise,
  food: IconFood,
  study: IconStudy,
  exe: IconExe,
};

export function HabitIcon({
  iconKey,
  size,
  testID,
}: {
  iconKey: HabitIconKey;
  size?: number;
  testID?: string;
}) {
  const Cmp = HABIT_ICONS[iconKey] ?? IconExe;
  return <Cmp size={size} testID={testID} />;
}
