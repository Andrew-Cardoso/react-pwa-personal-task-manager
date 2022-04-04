import React, {useRef, useEffect} from 'react';
import {Icon} from '../../Icon';
import {DataList} from './DataList';
import {InputProps} from './interface';
import {
	GroupContainer,
	IconContainer,
	InputContainer,
	StyledError,
	StyledInput,
	StyledLabel,
} from './style';

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
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (error) inputRef.current?.focus();
	}, [error]);

	const title = label.toLowerCase();

	return (
		<GroupContainer>
			<InputContainer>
				{type === 'select' ? (
					<>
						<DataList input={inputRef} options={options ?? []} onChange={onChange} />
						<StyledInput
							placeholder=' '
							id={title}
							name={title}
							type='text'
							ref={inputRef}
							readOnly={true}
							hasError={!!error}
							{...props}
						/>
					</>
				) : (
					<StyledInput
						placeholder=' '
						id={title}
						name={title}
						type={type ?? 'text'}
						hasError={!!error}
						onChange={({target}) => onChange?.(target.value)}
						ref={inputRef}
						{...props}
					/>
				)}
				<StyledLabel htmlFor={title}>{label}</StyledLabel>
				<IconContainer hasError={!!error}>
					<Icon name='AlertOutline' />
				</IconContainer>
			</InputContainer>
			<StyledError hasError={!!error}>{error}</StyledError>
		</GroupContainer>
	);
};

export const Input = React.memo(InputComponent);
