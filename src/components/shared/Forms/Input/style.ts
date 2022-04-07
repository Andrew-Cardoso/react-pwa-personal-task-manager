import { keyframes, styled } from '@stitches/react';
import { ColorsEnum } from '../../styles';

const shrinkBounce = keyframes({
	'0%': {
		transform: 'scale(1)',
	},
	'33%': {
		transform: 'scale(0.85)',
	},
	'100%': {
		transform: 'scale(1)',
	}
})

const checkboxCheck = keyframes({
	'0%': {
		width: '0',
		height: '0',
		transform: 'translate3d(0, 0, 0) rotate(45deg)',
	},
	'33%': {
		width: '0.3rem',
		height: '0',
		transform: 'translate3d(0, 0, 0) rotate(45deg)',
	},
	'100%': {
		width: '0.3rem',
		height: '0.7rem',
		transform: 'translate3d(0, -0.5em, 0) rotate(45deg)',
	}
})

export const GroupContainer = styled('section', {
	width: '100%',
	height: '6rem',
	display: 'grid',
	gridTemplateRows: '1fr 1.5rem',
	variants: {
		forType: {
			textarea: {
				height: '9rem'
			}
		}
	}
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

const inputAndTextareaSharedStyle = {
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
}
export const StyledInput = styled('input', {
	...inputAndTextareaSharedStyle,
	'&:placeholder-shown + label': {
		fontSize: '1.2rem',
		left: '1.25rem',
		top: 'calc(50% - .6rem)',
		fontWeight: 400,
	},
});

export const StyledTextarea = styled('textarea', {
	...inputAndTextareaSharedStyle,
	'&:placeholder-shown + label': {
		fontSize: '1.2rem',
		left: '1.25rem',
		top: '1rem',
		fontWeight: 400,
	},
})

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
		show: {
			true: {
				color: ColorsEnum.MAIN_TEXT,
				transform: 'scale(1) translateX(0)',
			}
		}
	},	
});

export const CheckboxGroupContainer = styled('section', {
	width: '100%',
	height: '3rem',
	display: 'grid',
	alignItems: 'center',
	alignContent: 'center',
	justifyContent: 'flex-start',
	justifyItems: 'flex-start',
})

export const CheckboxContainer = styled('div', {
	width: '100%',
	height: '100%',
	display: 'flex',
	'& p': {
		fontSize: '1.05rem',
	},
	'& p::first-letter': {
		textTransform: 'capitalize',
	},
	'& > input': {
		height: 0,
		width: 0,
	},
	'& > input + label': {
		position: 'relative',
		display: 'flex',
		margin: '0',
		alignItems: 'center',
		transition: 'transform 250ms cubic-bezier(0.4, 0, 0.23, 1)',
	},
	'& > input + label:hover': {
		transform: 'scale(1.1) translateX(5%)',
	},
	'& > input + label > span': {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: '1rem',
		width: '1.5rem',
		height: '1.5rem',
		background: ColorsEnum.EYE_CATCHING,
		borderRadius: '0',
		cursor: 'pointer',
		transition: 'all 250ms cubic-bezier(0.4, 0, 0.23, 1)',
	},
	'& > input:checked + label': {
		transform: 'scale(1.1) translateX(5%)'
	},
	'& > input:checked + label > span': {
		animation: `${shrinkBounce} 200ms cubic-bezier(0.4, 0, 0.23, 1)`,
	},
	'& > input:checked + label > span:before': {
		content: '',
		position: 'absolute',
		top: '0.25rem',
		left: '0.175rem',
		borderRight: `.25rem solid ${ColorsEnum.MAIN_TEXT}`,
		borderBottom: `.25rem solid ${ColorsEnum.MAIN_TEXT}`,
		transform: 'rotate(45deg)',
		transformOrigin: '0% 100%',
		animation: `${checkboxCheck} 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1) forwards`,
	}
})
