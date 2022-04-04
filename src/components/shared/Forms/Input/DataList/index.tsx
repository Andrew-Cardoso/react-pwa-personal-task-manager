import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {DataListProps} from './interface';
import {ListContainer, ListItem} from './style';

const buildStyles = (rect: DOMRect): CSSProperties => {
	const {innerHeight} = window;
	const topDistance = rect.top;
	const bottomDistance = innerHeight - rect.bottom;
	const left = rect.left + 'px';
	const width = rect.width + 'px';

	const [verticalPosition, transformOrigin] =
		topDistance > bottomDistance
			? [{bottom: innerHeight - topDistance + 'px'}, 'bottom']
			: [{top: rect.bottom}, 'top'];

	const maxHeight = `calc(${Math.max(topDistance, bottomDistance)}px - 1rem)`;

	return {maxHeight, left, width, ...verticalPosition, transformOrigin};
};

const bluredElement = ({clientX, clientY}: MouseEvent, el: HTMLElement) => {
	const {top, height, width, left} = el.getBoundingClientRect();
	if (clientX < left || clientX > left + width) return true;
	if (clientY < top || clientY > top + height) return true;
	return false;
};

const DataListComponent = ({input, options, onChange}: DataListProps) => {
	const [show, toggle] = useState<boolean>(false);
	const [listStyles, setListStyles] = useState<CSSProperties>({});
	const dataListContainerRef = useRef<HTMLDivElement>(null);

	const updatePosition = () => {
		const clientRect = input.current!.getBoundingClientRect();
		const styles = buildStyles(clientRect);
		setListStyles(styles);
	};

	const openList = (e: Event) => {
		e.preventDefault();
		updatePosition();
		toggle(true);
	};

	const handleBlur = (e: MouseEvent) => {
		if (!dataListContainerRef.current || !input.current) return;
		if (bluredElement(e, dataListContainerRef.current) && bluredElement(e, input.current))
			toggle(false);
	};

	const handleChange = (value: string | number) => {
		onChange?.(value);
		toggle(false);
	};

	useEffect(() => {
		input.current?.addEventListener('focus', openList);
		return () => {
			input.current?.removeEventListener('focus', openList);
		};
	}, [input]);

	useEffect(() => {
		show && window.addEventListener('resize', updatePosition);
		return () => {
			show && window.addEventListener('resize', updatePosition);
		};
	}, [show]);

	useEffect(() => {
		window.addEventListener('click', handleBlur);
		return () => {
			window.removeEventListener('click', handleBlur);
		};
	}, []);

	return (
		input.current &&
		createPortal(
			<ListContainer ref={dataListContainerRef} style={listStyles} show={show}>
				{options.map(({value, label}) => (
					<ListItem key={value} onClick={() => handleChange(value)}>
						{label}
					</ListItem>
				))}
			</ListContainer>,
			document.getElementById('root')!,
		)
	);
};

export const DataList = React.memo(DataListComponent);
