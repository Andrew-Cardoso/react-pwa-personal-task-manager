import { Temporal } from "@js-temporal/polyfill";
import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { db } from "../../../../data/db";
import { Deadline } from "../../../../data/models/deadline";
import { Task as TaskModel } from "../../../../data/models/task";
import { TaskPriority } from "../../../../data/models/task-priority";
import { TaskStatus } from "../../../../data/models/task-status";
import { TestResult } from "../../../../data/models/test-result";
import { Button } from "../../../shared/Button";
import { Icon } from "../../../shared/Icon";
import { IconName } from "../../../shared/Icon/interface";
import { Modal } from "../../../shared/Modal";
import { ColorsEnum } from "../../../shared/styles";
import { getDateNow } from "../../../shared/utils/date-now";
import { getDeadlineDate } from "../../../shared/utils/deadline-date";
import { TaskProps } from "./interface";
import { Action, DeadlineContainer, Info, Priority, ResultsContainer, TaskContainer, TaskTitle, Title } from "./style";

const buildTestResults = (result: TestResult) => {
    if (result.passed)
        return (
            <ResultsContainer success='true'>
                <h4><Icon name="Success" /> All tests passed successfully!</h4>
            </ResultsContainer>
        )

    return (
        <ResultsContainer success='false'>
            <h4><Icon name="Fail" /> Tests failed</h4>
            <h5>Feedback</h5>
            <p>{result.message}<br /><br />
                <strong>Tip:</strong> Create a new Task with the feedback of tests and try again.
            </p>
            {/* <p></p> */}
        </ResultsContainer>
    )




}

const deadlineStyle = (deadlineMet: boolean) =>
    deadlineMet
        ? { color: ColorsEnum.ACCENT_COLOR, filter: 'brightness(2)' }
        : { color: ColorsEnum.EXTRA_COLOR, filter: 'brightness(.75)' };

const isDeadlineFinished = ({ dateCreated, deadline }: TaskModel) => {
    const deadlineDate = getDeadlineDate(dateCreated, deadline);
    return Temporal.PlainDateTime.compare(getDateNow(), deadlineDate) === 1;
}

const deadlineEndDate = (date: string, deadline: Deadline) => {
    const endDate = getDeadlineDate(date, deadline);
    const localeDate = endDate.toLocaleString();
    return localeDate;
}

const getPlural = (n: number) => n === 1 ? '' : 's';
const format = (value: number, title: string, deadlineMet: boolean) => {
    const toPositive = Math.abs(value);
    return `${toPositive} ${title}${getPlural(toPositive)}${deadlineMet ? ' in advance' : ''}`;
}

const getDiffToString = ({ years, months, days, hours }: Temporal.Duration, deadlineMet: boolean) => {
    if (years)
        return format(years, 'year', deadlineMet);

    if (months)
        return format(months, 'month', deadlineMet);

    if (days)
        return format(days, 'day', deadlineMet);

    if (hours)
        return format(hours, 'hour', deadlineMet);

    return deadlineMet ? 'just in time' : 'a few minutes';
}

const getDeadlineState = (task: TaskModel): JSX.Element => {
    const deadlineDate = getDeadlineDate(task.dateCreated, task.deadline);
    const dateNow = getDateNow();

    const diff = deadlineDate.since(dateNow);

    const buildMessage = (deadlineMet: boolean) => {
        const stringDiff = getDiffToString(diff, deadlineMet)
        return deadlineMet
            ? `Deadline met ${stringDiff}`
            : `Deadline not met by ${stringDiff}`;
    }

    const deadlineMet = !diff.toString().startsWith('-');
    const message = buildMessage(deadlineMet);


    return (
        <strong style={deadlineStyle(deadlineMet)}>
            {message}
        </strong>
    )
}

const priorityIcon: Record<TaskPriority, IconName> = {
    low: 'Smile',
    medium: 'Bell',
    high: 'Danger',
    "life or death": "Skull"
}

const getDeadlineInfos = (task: TaskModel): JSX.Element => {
    if (task.status === TaskStatus.TESTED)
        return (
            <>
                <p>
                    <strong>Finished on: </strong>
                    {Temporal.PlainDateTime.from(task.dateFinished!).toLocaleString()}
                </p>
                <p>
                    {getDeadlineState(task)}
                </p>
            </>
        );

    const deadlineEnded = isDeadlineFinished(task);

    if (task.status === TaskStatus.TO_DO)
        return (
            <p style={deadlineEnded ? deadlineStyle(!deadlineEnded) : {}}>
                <strong>Deadline {deadlineEnded ? 'ended' : 'ends'}: </strong>
                {deadlineEndDate(task.dateCreated, task.deadline)}
            </p>
        )

    return (
        <>
            <p>
                <strong>Started on: </strong>
                {Temporal.PlainDateTime.from(task.dateStarted!).toLocaleString()}
            </p>
            <p style={deadlineEnded ? { color: ColorsEnum.DANGER } : {}}>
                <strong>Deadline {deadlineEnded ? 'ended' : 'ends'}: </strong>
                {deadlineEndDate(task.dateCreated, task.deadline)}
            </p>
        </>
    )
}

const TaskComponent = ({ task }: TaskProps) => {
    const [show, toggle] = useState<boolean>(false);

    const [{ isDragging }, dragRef] = useDrag({
        type: 'task',
        item: task,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const onClose = (saved: boolean) => {
        saved && db.tasks.delete(task.id!);
        toggle(false);
    }

    return (
        <TaskContainer ref={dragRef} isDragging={isDragging} status={task.status.split(' ').join('-')}>
            <TaskTitle>
                <Title>{task.title}</Title>
            </TaskTitle>
            <Action>
                <Button
                    size="icon"
                    colorStyle="transparent"
                    style={{ color: ColorsEnum.SECONDARY_LIGHT }}
                    onClick={() => toggle(true)}
                >
                    <Icon name='Trash'></Icon>
                </Button>
            </Action>
            <Info>

                <p>
                    {task.status === TaskStatus.TESTED ? buildTestResults(task.result) : task.info}
                </p>
            </Info>
            <Priority style={{ color: task.priority === TaskPriority.LIFE_OR_DEATH && task.status !== TaskStatus.TESTED ? 'red' : ColorsEnum.MAIN_TEXT }}>
                <Icon name={priorityIcon[task.priority]} animate={task.priority === TaskPriority.LIFE_OR_DEATH && task.status !== TaskStatus.TESTED} />
                <p>{task.priority} priority</p>
            </Priority>
            <DeadlineContainer>
                {getDeadlineInfos(task)}
            </DeadlineContainer>
            <Modal title="Delete Task" onClose={onClose} show={show} saveButtonText='Delete Task'>
                <p style={{ lineHeight: '150%' }}>
                    Are you sure you want to delete task <strong>{task.title} </strong>?<br />
                    This action can not be undone.
                </p>
            </Modal>
        </TaskContainer>

    )
}

export const Task = React.memo(TaskComponent);