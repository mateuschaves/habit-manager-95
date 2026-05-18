import 'styled-components/native';
import { Win95Theme } from './types';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Win95Theme {}
}
