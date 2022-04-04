import {ElementType} from 'react';

export type Size = 'sm' | 'md' | 'lg';

export type ColorStyle = 'default' | 'primary' | 'secondary' | 'success' | 'danger';

export type ReactProps<T extends ElementType<any>> = React.ComponentPropsWithoutRef<T>;

export type Icon = {src: string; alt: string};
