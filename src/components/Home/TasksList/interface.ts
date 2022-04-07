import { Task } from "../../../data/models/task";
import { TaskStatus } from "../../../data/models/task-status";

export interface TasksListProps {
    tasks: Task[];
    status: TaskStatus
}