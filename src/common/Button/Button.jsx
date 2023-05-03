import React from 'react';
import './button.css';

export const Button = ({ text, onClick, type, style, dataTestid }) => (
	<button type={type} onClick={onClick} style={style} data-testid={dataTestid}>
		{text}
	</button>
);
