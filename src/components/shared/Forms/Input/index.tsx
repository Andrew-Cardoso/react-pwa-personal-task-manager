import React, { useRef, useEffect, useMemo, RefObject } from 'react';
import { Icon } from '../../Icon';
import { DataList } from './DataList';
import { InputProps } from './interface';
import {

	CheckboxContainer,
	CheckboxGroupContainer,
	GroupContainer,
	IconContainer,
	InputContainer,
	StyledError,
	StyledInput,
	StyledLabel,
	StyledTextarea,
} from './style';

type InputRef = RefObject<HTMLInputElement>;
type TextareaRef = RefObject<HTMLTextAreaElement>;

const InputComponent = ({
	id,
	name,
	label,
	error,
	type,
	onChange,
	options,
	...props
}: InputProps) => {
	const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

	useEffect(() => {
		if (error) inputRef.current?.focus();
	}, [error]);

	const inputId = useMemo(() => label.toLowerCase().split(' ').join('-'), [label]);

	if (type === 'checkbox') return (
		<CheckboxGroupContainer>
			<CheckboxContainer>
				<input
					type='checkbox'
					name={inputId}
					id={inputId}
					ref={inputRef as InputRef}
					onChange={() => { }}
					{...props}
				/>
				<label onClick={() => onChange?.((inputRef as InputRef)?.current?.checked ? 0 : 1)}>
					<span></span>
					<p>
						{label}
					</p>
				</label>
			</CheckboxContainer>
		</CheckboxGroupContainer>
	);

	if (type === 'select') return (
		<GroupContainer>
			<InputContainer>
				<DataList input={inputRef as InputRef} options={options ?? []} onChange={onChange} />
				<StyledInput
					placeholder=' '
					id={inputId}
					name={inputId}
					type='text'
					ref={inputRef as InputRef}
					readOnly={true}
					hasError={!!error}
					{...props}
				/>
				<StyledLabel htmlFor={inputId}>{label}</StyledLabel>
				<IconContainer show='true'>
					<Icon name='Expand' />
				</IconContainer>
			</InputContainer>
			<StyledError hasError={!!error}>{error}</StyledError>
		</GroupContainer>
	)

	if (type === 'textarea') return (
		<GroupContainer forType='textarea'>
			<InputContainer>
				<StyledTextarea
					placeholder=' '
					id={inputId}
					name={inputId}
					hasError={!!error}
					onChange={({ target }) => onChange?.(target.value)}
					ref={inputRef as TextareaRef}
					{...props as any}
				/>
				<StyledLabel htmlFor={inputId}>{label}</StyledLabel>
				<IconContainer hasError={!!error}>
					<Icon name='AlertOutline' />
				</IconContainer>
			</InputContainer>
			<StyledError hasError={!!error}>{error}</StyledError>
		</GroupContainer>
	)

	return (
		<GroupContainer>
			<InputContainer>
				<StyledInput
					placeholder=' '
					id={inputId}
					name={inputId}
					type={type ?? 'text'}
					hasError={!!error}
					onChange={({ target }) => onChange?.(target.value)}
					ref={inputRef as InputRef}
					{...props}
				/>
				<StyledLabel htmlFor={inputId}>{label}</StyledLabel>
				<IconContainer hasError={!!error}>
					<Icon name='AlertOutline' />
				</IconContainer>
			</InputContainer>
			<StyledError hasError={!!error}>{error}</StyledError>
		</GroupContainer>
	);
};

export const Input = React.memo(InputComponent);
