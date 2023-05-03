import coursesReducer from '../reducer';
import { SET_COURSES, UPDATE_COURSE } from '../actionTypes';

test('reducer should return the initial state', () => {
	expect(coursesReducer({ courses: [] }, {})).toEqual({ courses: [] });
});

it('should handle GET_COURSES', () => {
	const initialState = {
		courses: [
			{
				authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d35'],
				creationDate: '2/2/2023',
				description: 'description1',
				duration: 305,
				id: '66cc289e-6de9-49b2-9ca7-8b4f409d6468',
				title: 'title1',
			},
			{
				authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
				creationDate: '2/4/2023',
				description: 'description2',
				duration: 305,
				id: '66cc289e-6de9-49b2-9ca7-8b4f409d6468',
				title: 'new title',
			},
		],
	};
	const testData = {
		authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d37'],
		creationDate: '2/2/2023',
		description: 'description3',
		duration: 305,
		id: '66cc289e-6de9-49b2-9ca7-8b4f409d6468',
		title: 'title3',
	};
	const successAction = {
		type: SET_COURSES,
		todo: testData,
	};
	expect(coursesReducer(initialState, successAction)).toEqual({
		courses: initialState.courses.concat(testData),
	});
});

it('should handle UPDATE_COURSE', () => {
	const testData = {
		authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d37'],
		creationDate: '2/2/2023',
		description: 'description2',
		duration: 305,
		id: '66cc289e-6de9-49b2-9ca7-8b4f409d6468',
		title: 'new title',
	};
	const successAction = {
		type: UPDATE_COURSE,
		todo: testData,
	};
	expect(
		coursesReducer(
			{
				courses: [
					{
						authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d37'],
						creationDate: '2/2/2023',
						description: 'description2',
						duration: 305,
						id: '66cc289e-6de9-49b2-9ca7-8b4f409d6468',
						title: 'title2',
					},
				],
			},

			successAction
		)
	).toEqual({
		courses: testData,
	});
});
