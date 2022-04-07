import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useMemo, useState } from "react";
import { Modal } from "..";
import { Deadline } from "../../../../data/models/deadline";
import { Task } from "../../../../data/models/task";
import { TaskPriority } from "../../../../data/models/task-priority";
import { TaskStatus } from "../../../../data/models/task-status";
import { Input } from "../../Forms/Input";
import { TIME_ZONE } from "../../utils/time-zone.const";
import { TaskModalProps } from "./interface";
import { Form, GroupInputs } from "./style";
import { ValidateTask } from "./task.validation";
import { v4 as uuid } from 'uuid';
import { getDateNow } from "../../utils/date-now";

const setDates = (task: Partial<Task>) => {
	const now = getDateNow().toString();
	if (!task.dateCreated) return (task.dateCreated = now);
	if (!task.dateStarted) return (task.dateCreated = now);
	if (!task.dateFinished) return (task.dateCreated = now);
};

interface FormGroup<T> {
	value: T;
	touched?: boolean;
	error?: string;
}

export interface FormTask {
	title: FormGroup<string>;
	info: FormGroup<string>;
	deadlineValue: FormGroup<number>;
	deadlineTimeMeasure: FormGroup<string>;
	priority: FormGroup<TaskPriority>;
	// result: FormGroup<TestResult | null>;
}

const getDefaultValues = (task?: Task) => ({
	title: { value: task?.title ?? '' },
	info: { value: task?.info ?? '' },
	deadlineValue: { value: task?.deadline ? +task.deadline.split(' ')[0] : 1 },
	deadlineTimeMeasure: { value: task?.deadline ? task.deadline.split(' ')[1] : 'hours' },
	priority: { value: task?.priority ?? TaskPriority.MEDIUM },
	// result: {value: task?.result ?? null},
});

export const TaskModal = ({ task, title, show, onClose }: TaskModalProps) => {
	const [formState, setFormState] = useState<FormTask>(getDefaultValues(task));

	useEffect(() => {
		setFormState(getDefaultValues());
	}, [show]);

	const priorityOptions = Object.values(TaskPriority).map((value) => ({ label: value, value }));
	const timeMeasures = ['days', 'hours', 'weeks'].map((value) => ({ label: value, value }));

	const handleChange = (key: keyof FormTask, value: string | number) => {
		const form = { ...formState };
		form[key].value = value as any;
		form[key].touched = true;
		if (key in ValidateTask) form[key].error = ValidateTask[key]!(value);
		setFormState(form);
	};

	const onModalClose = (saved: boolean) => {
		if (!saved) return onClose();

		const errorsToUpdate: Partial<Record<keyof FormTask, string>> = {};

		for (const prop in formState) {
			const key = prop as keyof FormTask;
			if (Object.prototype.hasOwnProperty.call(formState, key)) {
				const property = formState[key];
				if (property.error) return;
				if (key in ValidateTask) {
					const error = ValidateTask[key]!(property.value);
					if (error) errorsToUpdate[key] = error;
				}
			}
		}

		if (Object.values(errorsToUpdate).length) {
			const form = {...formState};
			for (const prop in errorsToUpdate) {
				const key = prop as keyof FormTask;
				if (Object.prototype.hasOwnProperty.call(errorsToUpdate, key)) {
					const error = errorsToUpdate[key];
					form[key].touched = true;
					form[key].error = error;
				}
			}	
			return setFormState(form);
		}

		const newTask: Partial<Task> = task ? { ...task } : {};
		setDates(newTask);
		newTask.deadline =
			`${formState.deadlineValue.value} ${formState.deadlineTimeMeasure.value}` as Deadline;
		newTask.info = formState.info.value;
		newTask.title = formState.title.value;
		newTask.priority = formState.priority.value;
		newTask.status ??= TaskStatus.TO_DO;
		newTask.id ??= uuid();

		onClose(newTask as Task);
	};

	return (
		<Modal title={title} show={show} onClose={onModalClose}>
			<Form>
				<Input
					label='Title'
					error={formState.title.error}
					value={formState.title.value}
					onChange={(value) => handleChange('title', value)}
				/>
				<Input
					label='Description'
					error={formState.info.error}
					value={formState.info.value}
					onChange={(value) => handleChange('info', value)}
				/>
				<Input
					label='Priority'
					value={formState.priority.value}
					type='select'
					onChange={(value) => handleChange('priority', value)}
					options={priorityOptions}
				/>
				<GroupInputs>
					<Input
						label='Deadline'
						error={formState.deadlineValue.error}
						value={formState.deadlineValue.value}
						type='number'
						onChange={(value) => handleChange('deadlineValue', +value)}
						min={0}
					/>
					<Input
						label='Measure'
						value={formState.deadlineTimeMeasure.value}
						type='select'
						onChange={(value) => handleChange('deadlineTimeMeasure', value)}
						options={timeMeasures}
					/>
				</GroupInputs>
				<Input
					label='Status'
					value={TaskStatus.TO_DO}
					type='text'
					disabled={true}
					readOnly={true}
				/>
			</Form>
		</Modal>
	);
};
