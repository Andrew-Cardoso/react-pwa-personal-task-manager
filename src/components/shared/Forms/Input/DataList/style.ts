import {styled} from '@stitches/react';
import { ColorsEnum } from '../../../styles';

export const ListContainer = styled('div', {
	zIndex: '10',
	height: 'auto',
	position: 'fixed',
	overflowX: 'hidden',
	overflowY: 'auto',
	display: 'flex',
	flexDirection: 'column',
	transition: 'transform 100ms ease-in-out',
	boxShadow: '1px 1px 10px 5px #0007',
	transform: 'scaleY(0)',
	variants: {
		show: {
			true: {
				transform: 'scaleY(1)',
			},
		},
	},
});


export const ListItem = styled('div', {
	width: '100%',
	height: '2.75rem',
	display: 'grid',
	padding: '0 1.2rem',
	alignContent: 'center',
	justifyContent: 'flex-start',
	backgroundColor: ColorsEnum.ACCENT_COLOR,
	textTransform: 'capitalize',
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: ColorsEnum.EXTRA_COLOR
	}
})