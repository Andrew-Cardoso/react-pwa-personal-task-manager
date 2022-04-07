import { keyframes, styled } from "@stitches/react";

const shake = keyframes({
  '10%, 90%': {
    transform: 'translate3d(-1px, 0, 0)',
  },

  '20%, 80%': {
    transform: 'translate3d(2px, 0, 0)',
  },

  '30%, 50%, 70%': {
    transform: 'translate3d(-4px, 0, 0)',
  },

  '40%, 60%': {
    transform: 'translate3d(4px, 0, 0)',
  },
})

export const Svg = styled('svg', {  
  variants: {
    size: {
      icon: {
        width: '1rem',
        height: '1rem',
      },
      sm: {
        width: '1.225rem',
        height: '1.225rem',
      },
      md: {
        width: '1.5rem',
        height: '1.5rem',
      },
      lg: {
        width: '1.75rem',
        height: '1.75rem',
      },
    },
    animate: {
      true: {
        animation: `${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both infinite`,
        filter: 'drop-shadow(2px 2px 4px black)',
      }
    }
  }
})