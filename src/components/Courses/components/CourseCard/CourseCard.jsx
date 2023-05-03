import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../common/Button/Button';
import { DateGenerator } from '../../../../helpers/dateGenerator';
import { PipeDuration } from '../../../../helpers/pipeDuration';

import './courseCard.css';
import imageEdit from '../../../../assets/edit-icon.png';
import imageDelete from '../../../../assets/delete-icon.png';

import { useCourseApi } from '../../../../store/courses/thunk';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, getUser } from '../../../../store/selectors';

function CourseCard(props) {
	const { deleteCourseApi } = useCourseApi();
	const dispatch = useDispatch();
	const courses = useSelector(getCourses);
	const user = useSelector(getUser);
	const styleEdit = {
		backgroundImage: `url(${imageEdit})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		width: '30px',
		height: '30px',
	};
	const styleDelete = {
		backgroundImage: `url(${imageDelete})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		width: '30px',
		height: '30px',
	};
	const navigate = useNavigate();
	const cardList = props.cardList;
	const authorList = props.authorList;

	const showCourseInfo = (e, id) => {
		e.preventDefault();
		navigate(`${id}`);
	};
	const deleteCourseFunc = (e, course) => {
		e.preventDefault();
		const newList = courses.filter((el) => el.id !== course.id);
		dispatch(deleteCourseApi(course.id, newList, user.token));
	};
	const updateCourseFunc = (e, course) => {
		e.preventDefault();
		navigate(`update/${course.id}`);
	};

	const adminFunc = (course) => {
		if (user.role === 'admin') {
			return (
				<>
					<Button
						style={styleEdit}
						onClick={(e) => {
							updateCourseFunc(e, course);
						}}
					/>
					<Button
						style={styleDelete}
						onClick={(e) => {
							deleteCourseFunc(e, course);
						}}
					/>
				</>
			);
		}
	};
	return (
		<>
			{cardList.map((course) => {
				let courseAuthors = [];
				authorList.forEach((author) => {
					if (course.authors.includes(author.id)) {
						courseAuthors.push(author.name);
					}
				});
				let result = courseAuthors.reduce((prev, curr) => prev + ', ' + curr);
				courseAuthors = [];
				return (
					<div
						className='container-card'
						data-testid='container-card'
						key={course.id}
					>
						<div className='content'>
							<h2 className='title'> {course.title} </h2>
							<p className='description'>{course.description}</p>
						</div>
						<div className='info'>
							<p className='authors' data-testid='authors'>
								<strong>Authors: </strong>
								{result}
							</p>
							<p>
								<strong>Duration: </strong>
								<PipeDuration time={course.duration} />
							</p>
							<p>
								<strong>Created: </strong>
								<DateGenerator date={course.creationDate} />
							</p>
							<div className='btn-container'>
								<Button
									text='Show course'
									onClick={(e) => {
										showCourseInfo(e, course.id);
									}}
								/>
								{adminFunc(course)}
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default CourseCard;
