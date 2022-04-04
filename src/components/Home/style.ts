import {styled} from '@stitches/react';
import { ColorsEnum } from '../shared/styles';

export const Container = styled('div', {
	width: '100%',
	height: '100%',
	display: 'grid',
	gridTemplateRows: '3rem 1fr',
});

export const Title = styled('h1', {
	color: ColorsEnum.MAIN_TEXT,
  textAlign: 'center',
  fontSize: '1.5rem',
  alignSelf: 'center'
});
