import { Link, useParams } from 'react-router-dom';

import { PipeDuration } from '../../../helpers/pipeDuration';
import { DateGenerator } from '../../../helpers/dateGenerator';

import { getCourses, getAuthors } from '../../../store/selectors';
import { useSelector } from 'react-redux';

import './courseInfo.css';

function CourseInfo() {
	const coursesStore = useSelector(getCourses);
	const authorsStore = useSelector(getAuthors);
	const mockedCoursesList = coursesStore;
	const mockedAuthorsList = authorsStore;

	const params = useParams();
	const courseId = params['*'];
	const course = mockedCoursesList.filter((course) => course.id === courseId);
	const authors = course[0].authors.map((item) => {
		return mockedAuthorsList.filter((author) => author.id === item);
	});
	return (
		<div className='course-box'>
			<p>
				<Link to={'/courses'}> &lt; Back to courses </Link>
			</p>
			<h1 className='course-title'>{course[0].title} </h1>
			<div className='info-box'>
				<div className='course-description'>{course[0].description}</div>
				<div className='course-info'>
					<p>
						<strong> ID: </strong>
						{courseId}
					</p>
					<p>
						<strong>Duration: </strong>
						<PipeDuration time={course[0].duration} />
					</p>
					<p>
						<strong>Created: </strong>
						<DateGenerator date={course[0].creationDate} />
					</p>
					<div>
						<strong>Authors: </strong>
						{authors.map((author) => {
							return author.map((item) => {
								return (
									<p className='course-author' key={item.id}>
										{item.name}
									</p>
								);
							});
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CourseInfo;
