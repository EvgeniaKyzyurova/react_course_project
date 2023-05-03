import React from 'react';

import SearchBar from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';

import './courses.css';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getCourses, getAuthors, getUser } from '../../store/selectors';
import { GetCourses } from '../../store/service';
import { useEffect } from 'react';

let indicator = true;
function Courses() {
	const navigate = useNavigate();

	const user = useSelector(getUser);
	useEffect(() => {
		if (!user.token) {
			navigate('/login');
		}
	}, [navigate, user]);

	const dispatch = useDispatch();

	dispatch(GetCourses(indicator));
	indicator = false;
	const courses = useSelector(getCourses);
	const authors = useSelector(getAuthors);

	const mockedCoursesList = courses;
	const mockedAuthorsList = authors;

	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [resultList, setResultList] = useState('');
	const searchRef = useRef();

	const search = (e) => {
		setSearchTerm(e.target.value);
	};
	const displayCourses = (e) => {
		e.preventDefault();
		setResultList(searchTerm);
	};
	const addCourse = () => {
		navigate('add');
	};
	useEffect(() => {
		const listTitles = [];
		mockedCoursesList.map((course) => {
			listTitles.push(course.title);
			return mockedCoursesList;
		});
		const resultTitles = listTitles.filter((title) =>
			title.toLowerCase().includes(resultList.toLowerCase())
		);
		const results = mockedCoursesList.filter((course) => {
			return course ? resultTitles.includes(course.title) : [];
		});
		setSearchResults(results);
	}, [mockedCoursesList, resultList]);
	if (mockedCoursesList.length === 0) {
		return (
			<div className='container-courses'>
				<div className='container-search'>
					<SearchBar
						searchFunc={search}
						searchValue={searchTerm}
						onClick={displayCourses}
						searchRef={searchRef}
					/>
					<Button text='Add course' onClick={addCourse} />
				</div>
				<div data-testid='courseCard-container'></div>
			</div>
		);
	} else {
		return (
			<div className='container-courses'>
				<div className='container-search'>
					<SearchBar
						searchFunc={search}
						searchValue={searchTerm}
						onClick={displayCourses}
						searchRef={searchRef}
					/>
					<Button
						text='Add course'
						onClick={addCourse}
						dataTestid='add-course'
					/>
				</div>
				<CourseCard cardList={searchResults} authorList={mockedAuthorsList} />
			</div>
		);
	}
}

export default Courses;
