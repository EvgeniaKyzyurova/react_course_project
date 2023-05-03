import { render, screen, fireEvent } from '@testing-library/react';
import Courses from '../Courses';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../../../App';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigate,
}));

test('course list without courses have empty container', () => {
	const mockedState = {
		user: {
			user: {
				isAuth: true,
				name: 'Test Name',
				role: 'admin',
			},
		},
		courses: {
			courses: [],
		},
		authors: [],
	};
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Courses />
			</Provider>
		</BrowserRouter>
	);
	expect(screen.getByTestId('courseCard-container')).toBeInTheDocument();
});

test('course list display all courses', () => {
	const mockedState = {
		user: {
			user: {
				isAuth: true,
				name: 'Test Name',
				role: 'admin',
			},
		},
		courses: {
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
				{
					id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c55145',
					title: 'JavaScript2',
					description: `some description`,
					creationDate: '8/3/2023',
					duration: 160,
					authors: ['27cc3006-e93a-4748-8ca8-73d06aa93b6d'],
				},
			],
		},
		authors: {
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
		},
	};
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Courses />
			</Provider>
		</BrowserRouter>
	);
	const courses = screen.getAllByTestId('container-card');
	expect(courses.length).toEqual(2);
});
const mockedNavigate = jest.fn();

test('courseForm opens after click', async () => {
	const mockedState = {
		user: {
			user: {
				isAuth: true,
				name: 'Test name',
				role: 'admin',
			},
		},
		courses: {
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
		},
		authors: {
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
		},
	};
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	render(
		<MemoryRouter initialEntries={['/courses']}>
			<Provider store={mockedStore}>
				<App />
			</Provider>
		</MemoryRouter>
	);
	expect(screen.getByTestId('add-course')).toBeInTheDocument();
	fireEvent.click(screen.getByTestId('add-course'));
	expect(mockedNavigate).toHaveBeenCalledWith('add');
});
