import { HTMLInputTypeAttribute } from 'react';
import { ReactProps } from '../../types';

export interface SelectOption {
	label: string;
	value: string | number;
}

export interface InputProps extends Omit<ReactProps<'input'>, 'onChange'> {
	label: string;
	type?: HTMLInputTypeAttribute | 'select' | 'textarea';
	onChange?: (value: string | number) => any;
	options?: SelectOption[];
	error?: string;
}
