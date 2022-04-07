import { useState } from "react";
import { useDrop } from "react-dnd";
import { db } from "../../../data/db";
import { Task } from "../../../data/models/task";
import { TaskStatus } from "../../../data/models/task-status";
import { ResultsModal } from "../../shared/Modal/ResultsModal";
import { ColorsEnum } from "../../shared/styles";
import { getDateNow } from "../../shared/utils/date-now";
import { TasksListProps } from "./interface";
import { ListContainer, StatusTitle, TasksContainer } from "./style";
import { Task as TaskContainer } from "./Task";

const statusColor: Record<TaskStatus, ColorsEnum> = {
    "to do": ColorsEnum.EYE_CATCHING,
    coding: ColorsEnum.EXTRA_COLOR,
    "ready for tests": ColorsEnum.DANGER,
    tested: ColorsEnum.SUCCESS
}

const validStatus = (task: Task, status: TaskStatus) => {
    if (task.status === TaskStatus.TO_DO && status === TaskStatus.CODING)
        return true;
    if (task.status === TaskStatus.CODING && status === TaskStatus.READY_FOR_TESTS)
        return true;
    if (task.status === TaskStatus.READY_FOR_TESTS && status === TaskStatus.TESTED)
        return true;
    return false;
}

export const TasksList = ({ status, tasks }: TasksListProps) => {
    const [currentTask, toggle] = useState<Task | undefined>();

    const [{ canDrop }, dropRef] = useDrop({
        accept: 'task',
        drop: (task: Task) => {
            console.log('dropewd')
            if (!validStatus(task, status)) return undefined;

            if (status === TaskStatus.CODING)
                return db.tasks.update(task.id!, { status, dateStarted: getDateNow().toString() });
            if (status === TaskStatus.READY_FOR_TESTS)
                return db.tasks.update(task.id!, { status });

            toggle(task);
        },
        collect: (monitor) => ({
            canDrop: monitor.isOver() && validStatus(monitor.getItem(), status),
        })
    })

    const onClose = (task?: Task) => {
        task && db.tasks.update(task.id!, { ...task, status: TaskStatus.TESTED, dateFinished: getDateNow().toString() });
        toggle(undefined);
    }

    return (
        <>
            <ListContainer style={{ color: statusColor[status], filter: canDrop ? 'brightness(2)' : '' }} ref={dropRef}>
                <StatusTitle>{status}</StatusTitle>
                <TasksContainer>
                    {tasks.map(task => <TaskContainer task={task} key={task.title} />)}
                </TasksContainer>
            </ListContainer>
            <ResultsModal onClose={onClose} task={currentTask} />
        </>
    )
}