import {FormTask} from '.';
import {isNullOrEmpty} from '../../utils/is-empty';

type ValidationTask = Partial<
	Record<keyof FormTask, (value: string | number) => string | undefined>
>;

export const ValidateTask: ValidationTask = {
	title: (value) => {
		if (isNullOrEmpty.String(<string>value)) return 'Title can not be empty';
	},
	info: (value) => {
		if (isNullOrEmpty.String(<string>value)) return 'Description can not be empty';
	},
	deadlineValue: (value) => {
		if (isNullOrEmpty.Number(<number>value)) return 'Deadline can not be empty';
	},
};
