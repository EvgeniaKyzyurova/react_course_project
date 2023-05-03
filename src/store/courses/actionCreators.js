import { DELETE_COURSE, SET_COURSES, UPDATE_COURSE } from './actionTypes';
export const deleteCourse = (data) => ({
	type: DELETE_COURSE,
	todo: data,
});
export const addCourse = (data) => ({
	type: SET_COURSES,
	todo: data,
});
export const updateCourse = (data) => ({
	type: UPDATE_COURSE,
	todo: data,
});
