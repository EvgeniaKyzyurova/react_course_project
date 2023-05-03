import { SET_COURSES } from './courses/actionTypes';
import { SET_AUTHORS } from './authors/actionTypes';

export const GetCourses = (indicator) => (dispatch) => {
	if (indicator) {
		let authorsArr = [];
		fetch('http://localhost:4000/authors/all', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((authors) => {
				authorsArr = authors.result;
				console.log(authors.result);
			})
			.then(() => {
				fetch('http://localhost:4000/courses/all', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then((response) => response.json())
					.then((courses) => {
						console.log(courses.result);
						dispatch({ type: SET_COURSES, todo: courses.result });
						dispatch({ type: SET_AUTHORS, todo: authorsArr });
					});
			});
	}
};
