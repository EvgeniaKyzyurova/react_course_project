import { deleteCourse, addCourse, updateCourse } from './actionCreators';
import { useNavigate } from 'react-router-dom';

export const useCourseApi = () => {
	const navigate = useNavigate();

	const deleteCourseApi = (id, newCoursesList, token) => (dispatch) => {
		fetch(`http://localhost:4000/courses/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		}).then((response) => {
			if (response.ok) dispatch(deleteCourse(newCoursesList));
		});
	};

	const createCourseApi = (course, token) => (dispatch) => {
		fetch('http://localhost:4000/courses/add', {
			method: 'POST',
			body: JSON.stringify(course),
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.successful) {
					dispatch(addCourse(data.result));
					navigate('/courses');
				}
			});
	};

	const updateCourseApi = (course, token, newList) => (dispatch) => {
		fetch(`http://localhost:4000/courses/${course.id}`, {
			method: 'PUT',
			body: JSON.stringify(course),
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.successful) {
					console.log(data);
					newList.push(data.result);
					console.log(newList);
					dispatch(updateCourse(newList));
					navigate('/courses');
				}
			});
	};
	return { deleteCourseApi, createCourseApi, updateCourseApi };
};
