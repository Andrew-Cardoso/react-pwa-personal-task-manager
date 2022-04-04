import { Task } from "../../task.interface";


export interface TaskModalProps {
  title: string;
	onClose: (task?: Task) => any;
	task?: Partial<Task>;
	show?: boolean;
}
