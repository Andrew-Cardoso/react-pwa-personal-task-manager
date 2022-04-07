import { styled } from "@stitches/react";

export const StatusTitle = styled('h2', {
    textTransform: 'capitalize',
    placeSelf: 'center',
    fontSize: '1.3rem',
})

export const ListContainer = styled('div', {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateRows: '3rem 1fr',
    border: 'thin solid currentColor',
    // paddingBottom: '1rem'
})

export const TasksContainer = styled('section', {
    display: 'flex',
    flexFlow: 'column',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '1rem',
    gap: '1rem'
})