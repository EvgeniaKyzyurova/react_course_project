import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import CourseForm from '../CourseForm/CourseForm';
import CourseInfo from '../Courses/CourseInfo/CourseInfo';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser, getCourses } from '../../store/selectors';
import { useParams } from 'react-router-dom';

function PrivateRouter() {
	const urlParams = useParams();
	const navigate = useNavigate();
	const user = useSelector(getUser);
	const courses = useSelector(getCourses);

	let addPath = '';
	let updatePath = '';
	let idPath = '';
	let courseUpdate = {};

	useEffect(() => {
		if (user.role !== 'admin' && urlParams['*'] === 'add') {
			navigate('/courses');
		}
	}, [navigate, urlParams, user.role]);

	if (user.role === 'admin') {
		if (urlParams['*'] === 'add') {
			addPath = `/${urlParams['*']}`;
		} else if (
			urlParams['*'].includes('/') &&
			urlParams['*'].split('/')[0] === 'update'
		) {
			idPath = urlParams['*'].split('/')[1];
			updatePath = `/${urlParams['*'].split('/')[0]}/${idPath}`;
			courseUpdate = courses.filter((course) => course.id === idPath)[0];
		} else {
			idPath = `/${urlParams['*']}`;
		}
	} else if (user.role !== 'admin' && urlParams['*'] !== 'add') {
		idPath = `/${urlParams['*']}`;
	}

	return (
		<Routes>
			<Route
				path={addPath}
				element={
					<>
						<CourseForm type='create' />
					</>
				}
			/>
			<Route
				path={idPath}
				element={
					<>
						<CourseInfo />
					</>
				}
			/>
			<Route
				path={updatePath}
				element={
					<>
						<CourseForm type='update' courseUpdate={courseUpdate} />
					</>
				}
			/>
		</Routes>
	);
}

export default PrivateRouter;
