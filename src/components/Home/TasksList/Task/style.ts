import { styled } from "@stitches/react";
import { TaskStatus } from "../../../../data/models/task-status";
import { ColorsEnum } from "../../../shared/styles";

export const TaskContainer = styled('article', {
    width: '100%',
    height: '18rem',
    display: 'grid',
    gridTemplateAreas: `
        "title action"
        "info info"
        "priority priority"
        "deadline deadline"
    `,
    gridTemplateColumns: '1fr 3rem',
    backgroundColor: 'CurrentColor',
    padding: '.5rem 1rem',
    '& > *': {
        color: ColorsEnum.MAIN_TEXT
    },
    variants: {
        status: {
            [TaskStatus.TO_DO.split(' ').join('-')]: {
                gridTemplateRows: '3rem 1fr 2rem 2rem'
            },
            [TaskStatus.CODING.split(' ').join('-')]: {
                gridTemplateRows: '3rem 1fr 2rem 4rem'
            },
            [TaskStatus.READY_FOR_TESTS.split(' ').join('-')]: {
                gridTemplateRows: '3rem 1fr 2rem 4rem'
            },
            [TaskStatus.TESTED.split(' ').join('-')]: {
                gridTemplateRows: '3rem 1fr 2rem 4rem'
            },
        },
        isDragging: {
            true: {
                transform: 'scaleY(0)',
            }
        }
    }
})

export const TaskTitle = styled('div', {
    gridArea: 'title',
    width: '100%',
    height: '100%',
    borderBottom: `thin solid currentColor`,
    display: 'grid',
    alignItems: 'center'
})

export const Title = styled('h3', {
    fontSize: '1rem',
    fontWeight: 600
})

export const Action = styled('div', {
    gridArea: 'action',
    display: 'grid',
    placeItems: 'center',
    width: '100%',
    height: '100%',
    borderBottom: `thin solid currentColor`,
})

export const Info = styled('div', {
    gridArea: 'info',
    width: '100%',
    height: '100%',
    color: ColorsEnum.MAIN_TEXT,
    fontSize: '.9rem',
    overflowX: 'hidden',
    overflowY: 'auto',

    '& > p': {
        lineHeight: '140%',
        paddingTop: '.5rem',
        textAlign: 'justify',
        paddingRight: '.4rem'
    }
})

export const Priority = styled('div', {
    gridArea: 'priority',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
    '& > p': {
        color: ColorsEnum.MAIN_TEXT,
        textTransform: 'capitalize'
    }
})

export const DeadlineContainer = styled('div', {
    gridArea: 'deadline',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexFlow: 'column',
    gap: '.3rem',
})

export const ResultsContainer = styled('div', {
    width: '100%',
    height: '100%',
    display: 'grid',
    alignItems: 'center',
    alignContent: 'center',    
    '& h4': {
        display: 'flex',
        alignItems: 'center',
        gap: '.3rem'
    },
    '& h5': {
        display: 'flex',
        alignItems: 'center'
    },
    variants: {
        success: {
            true: {
                gridTemplateRows: '1fr',
                height: '3rem',
            },
            false: {
                gridTemplateRows: '1.5rem 1.3rem 1fr 1.1rem',
            }
        }
    }
})