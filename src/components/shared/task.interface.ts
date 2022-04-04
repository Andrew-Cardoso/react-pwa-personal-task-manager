import {Temporal} from '@js-temporal/polyfill';

export enum TaskStatus {
	TO_DO = 'to do',
	CODING = 'coding',
	READY_FOR_TESTS = 'ready for tests',
	TESTED = 'tested',
}

export enum TaskPriority {
	LIFE_OR_DEATH = 'life or death',
	HIGH = 'high',
	MEDIUM = 'medium',
	LOW = 'low',
}

interface TestResultPassed {
	passed: true;
}

interface TestResultFailed {
	passed: false;
	message: string;
}

export type TestResult = TestResultPassed | TestResultFailed;

export type TimeMeasure = 'days' | 'weeks' | 'hours';
export type Deadline = `${number} ${TimeMeasure}`;

export interface Task {
	title: string;
	info: string;
	status: TaskStatus;
	deadline: Deadline;
	priority: TaskPriority;
	dateCreated: Temporal.Instant;
	dateStarted?: Temporal.Instant;
	dateFinished?: Temporal.Instant;
	result?: TestResult;
}
