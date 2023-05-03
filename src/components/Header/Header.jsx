import { Logo } from './components/Logo/Logo';
import { Button } from '../../common/Button/Button';

import './header.css';
import { getUser } from '../../store/selectors';
import { useGetUserFromApi } from '../../store/user/thunk';

import { useSelector, useDispatch } from 'react-redux';

function Header() {
	const { deleteUser } = useGetUserFromApi();
	const dispatch = useDispatch();
	const user = useSelector(getUser);
	const logout = (e) => {
		e.preventDefault();
		const userToStore = {
			isAuth: false,
			name: '',
			email: '',
			token: '',
			role: '',
		};
		dispatch(deleteUser(user.token, userToStore));
	};
	if (user.isAuth) {
		return (
			<div className='container'>
				<Logo />
				<div className='right-box' data-testid='user-name'>
					{user.name}
					<Button text='Logout' onClick={logout} />
				</div>
			</div>
		);
	} else {
		return (
			<div className='container'>
				<Logo />
			</div>
		);
	}
}

export default Header;
