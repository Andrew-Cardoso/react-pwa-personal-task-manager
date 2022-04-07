import { Deadline } from "./deadline";
import { TaskPriority } from "./task-priority";
import { TaskStatus } from "./task-status";
import { TestResult } from "./test-result";

export interface Task {
    id?: string;
    title: string;
    info: string;
    status: TaskStatus;
    deadline: Deadline;
    priority: TaskPriority;
    dateCreated: string;
    dateStarted?: string;
    dateFinished?: string;
    result?: TestResult;
}
