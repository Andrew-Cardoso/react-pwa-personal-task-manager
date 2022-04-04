import { styled } from "@stitches/react";

export const Svg = styled('svg', {
  variants: {
    size: {
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
    }
  }
})