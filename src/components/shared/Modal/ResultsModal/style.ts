import { styled } from "@stitches/react";

export const DetailsContainer = styled('div', {
    width: '100%',
    height: '6rem',
    transform: 'scaleY(0)',
    transition: 'transform 200ms ease',
    variants: {
        show: {
            true: {
                transform: 'scaleY(1)',
            }
        }
    }
});