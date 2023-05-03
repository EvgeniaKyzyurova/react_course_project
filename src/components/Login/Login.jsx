import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './login.css';
import { useGetUserFromApi } from '../../store/user/thunk';

import { useDispatch } from 'react-redux';

function Login() {
	const dispatch = useDispatch();
	const { userFunc } = useGetUserFromApi();
	const inputStyle = {
		marginBottom: '10px',
	};
	const [user, setUser] = useState({
		email: '',
		password: '',
	});
	const getUser = (e) => {
		setUser({ ...user, [e.target.id]: e.target.value });
	};
	const login = (e) => {
		e.preventDefault();
		dispatch(userFunc(user));
	};
	return (
		<div className='container-login'>
			<h1> Login </h1>
			<form className='login-form' onSubmit={login}>
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
				<Button type='submit' text='Login' />
			</form>
			<p>
				If you not have an account you can{' '}
				<Link to={'/registration'}>Registration</Link>
			</p>
		</div>
	);
}

export default Login;
