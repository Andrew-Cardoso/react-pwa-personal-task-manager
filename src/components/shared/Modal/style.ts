import {styled} from '@stitches/react';
import {ColorsEnum} from '../styles';

export const ModalContainer = styled('div', {
	position: 'fixed',
	inset: '0 0 0 0',
	background: 'transparent',
	zIndex: 9,
	backdropFilter: 'blur(4px) brightness(.7)',
	display: 'grid',
	placeItems: 'center',
	transform: 'scale(0)',
	transition: 'transform 200ms ease-in',
	variants: {
		show: {
			true: {
				transform: 'scale(1)',
			},
		},
	},
});

export const ModalContent = styled('section', {
	width: 'fit-content',
	height: 'fit-content',
	maxHeight: '96%',
	maxWidth: '96%',
	background: ColorsEnum.ACCENT_COLOR,
	display: 'grid',
	gridTemplateRows: '5rem 1fr 6rem',
});

export const ModalHeader = styled('header', {
	width: '100%',
	height: '100%',
	minWidth: '30rem',
	maxWidth: '40rem',
	padding: '0 2rem',
	display: 'grid',
	placeItems: 'center',
	fontSize: '1.5rem',
	fontWeight: 500,
	borderBottom: 'thin solid white',
});

export const ModalBody = styled('article', {
	width: '100%',
	height: '100%',
	minWidth: '30rem',
	maxWidth: '40rem',
	overflowY: 'auto',
	overflowX: 'hidden',
  padding: '2rem'
});

export const ModalFooter = styled('footer', {
	borderTop: 'thin solid white',
	width: '100%',
	height: '100%',
	padding: '0 2rem',
	display: 'flex',
  gap: '1rem',
  justifyContent: 'flex-end',
  alignItems: 'center',
});
