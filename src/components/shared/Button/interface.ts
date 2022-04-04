import {ColorStyle, ReactProps, Size} from '../types';

export interface ButtonProps extends ReactProps<'button'> {
	size?: Size;
	colorStyle?: ColorStyle;
	hasIcon?: boolean;
}
