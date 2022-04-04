import {ButtonProps} from './interface';
import {StyledButton} from './style';

export const Button = ({size, colorStyle, hasIcon, ...props}: ButtonProps) => (
	<StyledButton
		size={size ?? 'md'}
		colorStyle={colorStyle ?? 'default'}
		hasIcon={hasIcon}
		{...props}
	/>
);
