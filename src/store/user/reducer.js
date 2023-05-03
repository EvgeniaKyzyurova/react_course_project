import { LOGIN_USER, LOGOUT_USER } from './actionTypes';

const storeInitial = {
	user: {
		isAuth: false, // default value - false. After success login -true
		name: '', // default value - empty string. After success login - name of user
		email: '', // default value - empty string. After success login - email of user
		token: '',
		role: '',
	},
};

const userReducer = (state = storeInitial, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
				user: action.todo,
			};
		case LOGOUT_USER:
			return {
				...state,
				user: action.todo,
			};
		default:
			return state;
	}
};

export default userReducer;
