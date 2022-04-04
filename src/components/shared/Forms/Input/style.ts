import {styled} from '@stitches/react';
import {ColorsEnum} from '../../styles';

export const GroupContainer = styled('section', {
	width: '100%',
	height: '6rem',
	display: 'grid',
	gridTemplateRows: '1fr 1.5rem',
});

export const InputContainer = styled('div', {
	backgroundColor: ColorsEnum.EYE_CATCHING,
	position: 'relative',
	width: '100%',
	height: '100%',
});

export const StyledLabel = styled('label', {
	position: 'absolute',
	transition: 'all 200ms ease-out',
	fontSize: '.95rem',
	left: '1rem',
	top: 'calc(50% - 50% - .5rem)',
	fontWeight: 600,
	'&::first-letter': {
		textTransform: 'capitalize',
	},
});

export const StyledError = styled('div', {
	paddingLeft: '1rem',
	fontSize: '.85rem',
	color: ColorsEnum.BG_COLOR,
	alignSelf: 'center',
	justifySelf: 'flex-start',
	transform: 'scaleY(0) translateY(-1rem)',
	transformOrigin: 'top',
	transition: 'transform 150ms ease-out',
	variants: {
		hasError: {
			true: {
				transform: 'scaleY(1) translateY(0)',
			},
		},
	},
});

export const StyledInput = styled('input', {
	width: '100%',
	height: '100%',
	background: 'transparent',
	fontSize: '1.2rem',
	padding: '1rem 2.5rem 1rem 1.4rem',
	resize: 'none',
	borderStyle: 'solid',
	borderColor: ColorsEnum.BG_COLOR,
	borderWidth: '0',
	transition: 'border-width 250ms ease-out',
	textTransform: 'capitalize',
	'&:placeholder-shown + label': {
		fontSize: '1.2rem',
		left: '1.25rem',
		top: 'calc(50% - .6rem)',
		fontWeight: 400,
	},
	'&:disabled': {
		cursor: 'not-allowed',
	},
	variants: {
		hasError: {
			true: {
				borderWidth: '2px',
			},
		},
	},
});

export const IconContainer = styled('div', {
	position: 'absolute',
	top: 0,
	right: '1rem',
	height: '100%',
	display: 'grid',
	placeItems: 'center',
	color: ColorsEnum.BG_COLOR,
	transform: 'scale(0) translateX(1rem)',
	transformOrigin: 'right',
	transition: 'transform 250ms ease-out',
	variants: {
		hasError: {
			true: {
				transform: 'scale(1) translateX(0)',
			},
		},
	},
});
