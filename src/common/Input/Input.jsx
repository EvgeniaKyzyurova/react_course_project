import React from 'react';
import './input.css';

export const Input = ({
	labelText,
	placeholderText,
	onChange,
	value,
	name,
	type,
	style,
}) => (
	<div className='input-box'>
		<label htmlFor={name}>{labelText}</label>
		<input
			placeholder={placeholderText}
			id={name}
			onChange={onChange}
			value={value}
			type={type}
			style={style}
		/>
	</div>
);
