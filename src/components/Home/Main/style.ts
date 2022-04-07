import {styled} from '@stitches/react';

export const MainContainer = styled('main', {
	width: '100%',
	height: '100%',
	padding: '1rem',
	position: 'relative',
	overflow: 'hidden',
	display: 'flex',
	columnGap: '1rem'
});

export const AddTaskButtonContainer = styled('div', {
	position: 'fixed',
	right: '0',
	top: '10%',
	transition: 'transform 200ms ease-out',
	transform: 'scale(0.7) skewX(10deg) scaleX(1.5) translateX(1.5rem)',

	'&:hover': {
		transform: 'scale(1.1) skewX(0) scaleX(1.1) translateX(-.5rem)'
	}
});
