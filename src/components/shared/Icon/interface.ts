import { Size } from '../types';

export type IconName = 'PuzzlePlus' | 'AlertOutline' | 'Skull' | 'Danger' | 'Bell' | 'Smile' | 'Trash' | 'Expand' | 'Success' | 'Fail';

export interface IconProps {
	name: IconName;
	size?: Size;
	animate?: boolean;
}
