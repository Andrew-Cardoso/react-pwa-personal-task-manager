import {Size} from '../types';

export type IconName = 'PuzzlePlus' | 'AlertOutline';

export interface IconProps {
	name: IconName;
	size?: Size;
}
