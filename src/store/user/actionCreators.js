import { LOGIN_USER, LOGOUT_USER } from './actionTypes';
export const loginUser = (data) => ({
	type: LOGIN_USER,
	todo: data,
});
export const logoutUser = (data) => ({
	type: LOGOUT_USER,
	todo: data,
});
