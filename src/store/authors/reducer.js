import { SET_AUTHORS } from './actionTypes';

const storeInitial = {
	authors: [{ name: 'newAuthor', id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d37' }], // list of authors. Default value - empty array. After success getting authors - value from API /authors/all response. See Swagger.
};

const authorsReducer = (state = storeInitial, action) => {
	switch (action.type) {
		case SET_AUTHORS:
			return {
				...state,
				authors: state.authors.concat(action.todo),
			};
		default:
			return state;
	}
};

export default authorsReducer;
