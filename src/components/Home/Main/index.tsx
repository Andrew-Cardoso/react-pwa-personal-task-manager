import { useState } from "react";
import ReactTooltip from "react-tooltip";
import { Task } from "../../../data/models/task";
import { TaskStatus } from "../../../data/models/task-status";
import { Button } from "../../shared/Button";
import { Icon } from "../../shared/Icon";
import { TaskModal } from "../../shared/Modal/TaskModal";
import { TasksList } from "../TasksList";
import { MainContainer, AddTaskButtonContainer } from "./style";
import { db } from '../../../data/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { TaskPriority } from "../../../data/models/task-priority";
import { Temporal } from "@js-temporal/polyfill";
import { getDeadlineDate } from "../../shared/utils/deadline-date";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";



const dealEquals = (a: Task, b: Task): number => {
	const aEndDate = getDeadlineDate(a.dateCreated, a.deadline);
	const bEndDate = getDeadlineDate(b.dateCreated, b.deadline);

	return Temporal.PlainDateTime.compare(aEndDate, bEndDate);
}

const prioritySort = (a: Task, b: Task): number => {
	if (a.priority === b.priority) return dealEquals(a, b);
	if (a.priority === TaskPriority.LIFE_OR_DEATH) return -1;
	if (b.priority === TaskPriority.LIFE_OR_DEATH) return 1;
	if (a.priority === b.priority) return dealEquals(a, b);
	if (a.priority === TaskPriority.HIGH) return -1;
	if (b.priority === TaskPriority.HIGH) return 1;
	if (a.priority === b.priority) return dealEquals(a, b);
	if (a.priority === TaskPriority.MEDIUM) return -1;
	if (b.priority === TaskPriority.MEDIUM) return 1;
	if (a.priority === b.priority) return dealEquals(a, b);
	return 1;
}

const invertOrder: Record<number, number> = {
	'-1': 1,
	0: 0,
	1: -1
}

const dateSort = (a: Task, b: Task): number => {
	const aDateFinished = Temporal.PlainDateTime.from(a.dateFinished!);
	const bDateFinished = Temporal.PlainDateTime.from(b.dateFinished!);
	const compareResult = Temporal.PlainDateTime.compare(aDateFinished, bDateFinished);
	return invertOrder[compareResult];
}

const sortFunction = (status: TaskStatus) => status === TaskStatus.TESTED ? dateSort : prioritySort;

export const Main = () => {
	const [showModal, toggle] = useState<boolean>(false);
	const tasks = useLiveQuery(() => db.tasks.toArray());

	const taskStatus = Object.values(TaskStatus);

	const modalClosed = (task?: Task) => {
		task && db.tasks.add(task);
		toggle(false);
	};

	return (
		<MainContainer>
			<DndProvider backend={HTML5Backend}>
				{taskStatus.map(status => <TasksList status={status} tasks={(tasks ?? []).filter(task => task.status === status).sort(sortFunction(status))} key={status} />)}
			</DndProvider>
			<AddTaskButtonContainer data-tip='Add Task'>
				<Button colorStyle='primary' size='md' hasIcon={true} onClick={() => toggle(true)}>
					<Icon name='PuzzlePlus' size='md' />
				</Button>
			</AddTaskButtonContainer>
			<ReactTooltip />
			<TaskModal title='Add Task' show={showModal} onClose={modalClosed} />
		</MainContainer>
	);
};
