import { SET_COURSES, DELETE_COURSE, UPDATE_COURSE } from './actionTypes';

const storeInitial = {
	courses: [],
};

const coursesReducer = (state = storeInitial, action) => {
	switch (action.type) {
		case SET_COURSES:
			return {
				...state,
				courses: state.courses.concat(action.todo),
			};
		case DELETE_COURSE:
			return {
				...state,
				courses: action.todo,
			};
		case UPDATE_COURSE:
			return {
				...state,
				courses: action.todo,
			};
		default:
			return state;
	}
};

export default coursesReducer;
