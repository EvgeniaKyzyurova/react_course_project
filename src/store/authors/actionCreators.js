import { SET_AUTHORS } from './actionTypes';
export const addAuthor = (data) => ({
	type: SET_AUTHORS,
	todo: data,
});
