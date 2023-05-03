import React from 'react';

import { Input } from '../../../../common/Input/Input';
import { Button } from '../../../../common/Button/Button';

import './searchBar.css';

function SearchBar({ searchFunc, searchValue, onClick, searchRef }) {
	return (
		<div className='container-searchBar'>
			<Input
				placeholderText='Enter course name'
				onChange={searchFunc}
				value={searchValue}
				forwardRef={searchRef}
			/>
			<Button text='Search' onClick={onClick} />
		</div>
	);
}

export default SearchBar;
