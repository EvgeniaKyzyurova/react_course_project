import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';

import './registration.css';

function Registration() {
	const navigate = useNavigate();
	const inputStyle = {
		marginBottom: '10px',
	};
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});
	const getUser = (e) => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};
	const createUser = (e) => {
		e.preventDefault();
		const regExp = /[a-zA-Z0-9._%+-]+@[a-z]+.[a-z]{2,}/;
		if (!user.email.match(regExp)) {
			alert('Enter correct email');
		}
		fetch('http://localhost:4000/register', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((data) => {
			if (data.ok === true) {
				navigate('/login');
			}
		});
	};
	return (
		<div className='container-registration'>
			<h1> Registration </h1>
			<form className='register-form' onSubmit={createUser}>
				<Input
					labelText='Name'
					placeholderText='Enter name'
					onChange={getUser}
					value={user.name}
					name='name'
					type='text'
					style={inputStyle}
				/>
				<Input
					labelText='Email'
					placeholderText='Enter email'
					onChange={getUser}
					value={user.email}
					name='email'
					type='text'
					style={inputStyle}
				/>
				<Input
					labelText='Password'
					placeholderText='Enter password'
					onChange={getUser}
					value={user.password}
					name='password'
					type='text'
					style={inputStyle}
				/>
				<Button type='submit' text='Registration' />
			</form>
			<p>
				If you have an account you can <Link to={'/login'}>Login</Link>
			</p>
		</div>
	);
}

export default Registration;
