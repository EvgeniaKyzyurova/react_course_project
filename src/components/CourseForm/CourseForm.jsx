import React from 'react';
import { useState, useEffect } from 'react';

import { Button } from '../../common/Button/Button';
import { Input } from '../../common/Input/Input';
import { PipeDuration } from '../../helpers/pipeDuration';

import './courseForm.css';

import { useSelector, useDispatch } from 'react-redux';
import { useCourseApi } from '../../store/courses/thunk';
import { useAuthorApi } from '../../store/authors/thunk';
import { getAuthors, getUser, getCourses } from '../../store/selectors';

function CourseForm({ type, courseUpdate }) {
	const { createCourseApi, updateCourseApi } = useCourseApi();
	const { createAuthorApi } = useAuthorApi();

	const dispatch = useDispatch();

	const authors = useSelector(getAuthors);
	const user = useSelector(getUser);
	const courses = useSelector(getCourses);

	const mockedAuthorsList = authors;

	const [author, setAuthor] = useState({
		name: '',
	});

	const [authorName, setAuthorName] = useState('');
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [authorBtn, setAuthorBtn] = useState('');
	const [endedCourse, setEndedCourse] = useState('');

	const [course, setCourse] = useState({
		title: '',
		description: '',
		creationDate: new Date().toLocaleDateString('en-GB'),
		duration: '',
		authors: [],
	});
	useEffect(() => {
		if (type === 'update') {
			setCourse({
				id: courseUpdate.id,
				title: courseUpdate.title,
				description: courseUpdate.description,
				creationDate: courseUpdate.creationDate,
				duration: courseUpdate.duration,
				authors: courseUpdate.authors,
			});
			let authors = mockedAuthorsList.filter((author) =>
				courseUpdate.authors.includes(author.id)
			);
			setCourseAuthors([authors]);
		}
	}, [courseUpdate, mockedAuthorsList, type]);

	const setValue = (e) => {
		setCourse({ ...course, [e.target.id]: e.target.value });
	};
	const getAuthor = (e) => {
		setAuthorName(e.target.value);
	};
	useEffect(() => {
		if (endedCourse) {
			if (!course.title || !course.description || !course.authors) {
				alert('Please fill all fields');
			} else if (
				!String(course.duration).match(/^[0-9]+$/) ||
				String(course.duration) === '0' ||
				!course.duration
			) {
				alert('Enter number in duration field (more than 0)');
			} else {
				course.duration = Number(course.duration);
				if (type === 'create') {
					dispatch(createCourseApi(course, user.token));
				} else if (type === 'update') {
					const newList = courses.filter((el) => el.id !== course.id);
					dispatch(updateCourseApi(course, user.token, newList));
				}
			}
			setEndedCourse(false);
		}
	}, [
		endedCourse,
		course,
		dispatch,
		createCourseApi,
		user.token,
		type,
		courses,
		updateCourseApi,
	]);
	const createCourse = (e) => {
		e.preventDefault();
		let idList = [];
		courseAuthors
			.filter((author) => author.length !== 0)
			.forEach((author) => {
				let ids = author.map((item) => {
					return item.id;
				});
				idList.push(ids.toString());
				setCourse({ ...course, authors: idList });
			});
		setEndedCourse(true);
	};
	useEffect(() => {
		if (authorBtn) {
			dispatch(createAuthorApi(author, user.token));
			setAuthorBtn(false);
		}
	}, [authorBtn, author, dispatch, createAuthorApi, user.token]);
	const createAuthor = (e) => {
		e.preventDefault();
		setAuthor({ ...author, name: authorName });
		setAuthorBtn(true);
	};
	const addAuthorFunc = (e, id) => {
		e.preventDefault();
		let counter = 0;
		let courseAuthor = mockedAuthorsList.filter((author) => author.id === id);

		courseAuthors.forEach((author) => {
			author.forEach((item) => {
				if (item.id === id) {
					counter++;
				}
			});
		});
		if (counter === 0) {
			setCourseAuthors([...courseAuthors, courseAuthor]);
		}
	};
	const deleteAuthor = (e, id) => {
		e.preventDefault();
		let newArr = courseAuthors.map((author) => {
			return author.filter((item) => item.id !== id);
		});
		setCourseAuthors(newArr);
	};
	return (
		<form className='container-create-course' data-testid='course-form'>
			<div className='first-block'>
				<Input
					name='title'
					labelText='Title'
					placeholderText='Enter title'
					onChange={setValue}
					value={course.title}
				/>
				<Button type='submit' text='Create course' onClick={createCourse} />
			</div>
			<label htmlFor='description'>Description</label>
			<textarea
				id='description'
				placeholder='Enter description'
				onChange={setValue}
				value={course.description}
			></textarea>
			<div className='form'>
				<div className='add-author-block'>
					<h2>Add author</h2>
					<Input
						name='name'
						labelText='Author name'
						placeholderText='Enter author name'
						onChange={getAuthor}
						value={authorName}
					/>
					<Button text='Create author' onClick={createAuthor} />
					<h2>Duration</h2>
					<Input
						name='duration'
						labelText='Duration'
						placeholderText='Enter duration in minutes'
						onChange={setValue}
						value={course.duration}
						type='number'
					/>
					<p>
						Duration: <PipeDuration time={course.duration} />
					</p>
				</div>
				<div className='authors-block'>
					<h2>Authors</h2>
					<div className='author'>
						{mockedAuthorsList.map((author) => {
							return (
								<div key={author.id}>
									<span>{author.name}</span>
									<Button
										text='Add author'
										onClick={(e) => addAuthorFunc(e, author.id)}
									/>
								</div>
							);
						})}
					</div>
					<h2>Course authors</h2>
					{courseAuthors.map((author) => {
						if (courseAuthors.length === 0) {
							return <p>Authors list is empty</p>;
						}
						return author.map((item) => {
							return (
								<div key={item.id}>
									<span>{item.name}</span>
									<Button
										text='Delete author'
										onClick={(e) => deleteAuthor(e, item.id)}
									/>
								</div>
							);
						});
					})}
				</div>
			</div>
		</form>
	);
}

export default CourseForm;
