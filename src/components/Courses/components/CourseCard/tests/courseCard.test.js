import { render, screen } from '@testing-library/react';
import CourseCard from '../CourseCard';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Moment from 'moment';

const mockedState = {
	user: {
		user: {
			isAuth: true,
			name: 'Test Name',
			role: 'admin',
		},
	},
	courses: [
		{
			id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
			title: 'JavaScript',
			description: `some description`,
			creationDate: '8/3/2021',
			duration: 160,
			authors: [
				'27cc3006-e93a-4748-8ca8-73d06aa93b6d',
				'f762978b-61eb-4096-812b-ebde22838167',
			],
		},
	],
	authors: [
		{
			id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
			name: 'Vasiliy Dobkin',
		},
		{
			id: 'f762978b-61eb-4096-812b-ebde22838167',
			name: 'Nicolas Kim',
		},
	],
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

test('course have title', () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<CourseCard
					cardList={mockedState.courses}
					authorList={mockedState.authors}
				/>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.queryByText('JavaScript')).toBeInTheDocument();
});

test('course have description', () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<CourseCard
					cardList={mockedState.courses}
					authorList={mockedState.authors}
				/>
			</Provider>
		</BrowserRouter>
	);
	expect(
		screen.queryByText(mockedState.courses[0].description)
	).toBeInTheDocument();
});

test('course have duration in correct format', () => {
	const time = mockedState.courses[0].duration;
	const hours = Math.floor(time / 60);
	const min = time - hours * 60;
	const duration = `${hours}:${min} hours`;
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<CourseCard
					cardList={mockedState.courses}
					authorList={mockedState.authors}
				/>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByTestId('course-duration').textContent.trim()).toEqual(
		duration
	);
});

test('course have authors', () => {
	const authors = 'Authors: Vasiliy Dobkin, Nicolas Kim';
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<CourseCard
					cardList={mockedState.courses}
					authorList={mockedState.authors}
				/>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByTestId('authors').textContent.trim()).toEqual(authors);
});

test('course have date in correct format', () => {
	const date = mockedState.courses[0].creationDate;
	let getDate = Moment(date, 'DD/MM/YYYY').toDate();
	let formatDate = Moment(getDate).format('DD.MM.YYYY');
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<CourseCard
					cardList={mockedState.courses}
					authorList={mockedState.authors}
				/>
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByTestId('course-date').textContent.trim()).toEqual(
		formatDate
	);
});
