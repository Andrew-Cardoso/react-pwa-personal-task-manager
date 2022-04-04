import {styled} from '@stitches/react';
import {ColorsEnum, FancyBorderRadius} from '../styles';

export const StyledButton = styled('button', {
	borderRadius: FancyBorderRadius,
	fontWeight: '500',
	backgroundColor: ColorsEnum.ACCENT_COLOR,
	display: 'grid',
	placeItems: 'center',
	cursor: 'pointer',
	variants: {
		size: {
			sm: {
				height: '2rem',
				padding: '0 1rem',
				fontSize: '.85rem',
			},
			md: {
				height: '3rem',
				padding: '0 2rem',
				fontSize: '1rem',
			},
			lg: {
				height: '4rem',
				padding: '0 2.5rem',
				fontSize: '1.3rem',
			},
		},
		colorStyle: {
			default: {
				backgroundColor: ColorsEnum.PRIMARY_LIGHT,
			},
			primary: {
				backgroundColor: ColorsEnum.ACCENT_COLOR,
			},
			secondary: {
				backgroundColor: ColorsEnum.SECONDARY_LIGHT,
			},
			success: {
				backgroundColor: ColorsEnum.SUCCESS,
			},
			danger: {
				backgroundColor: ColorsEnum.DANGER,
			},
		},
		hasIcon: {
			true: {
				padding: '0 .75rem'
			}
		}
	},
});
