import { loginUser, logoutUser } from './actionCreators';
import { useNavigate } from 'react-router-dom';

export const useGetUserFromApi = () => {
	const navigate = useNavigate();
	const userFunc = (user) => (dispatch) => {
		fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((data) => {
				const token = data['result'];
				fetch('http://localhost:4000/users/me', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
				})
					.then((response) => response.json())
					.then((data) => {
						const userToStore = {
							isAuth: true,
							name: data.result.name,
							email: data.result.email,
							token: token,
							role: data.result.role,
						};
						dispatch(loginUser(userToStore));
						navigate('/courses');
					});
			});
	};
	const deleteUser = (token, userToStore) => (dispatch) => {
		fetch('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		}).then((respond) => {
			if (respond.ok === true) {
				dispatch(logoutUser(userToStore));
				navigate('/login');
			}
		});
	};
	return { userFunc, deleteUser };
};
