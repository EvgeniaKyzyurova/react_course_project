import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const mockedState = {
	user: {
		user: {
			isAuth: true,
			name: 'Test Name',
			role: 'admin',
		},
	},
	courses: [],
	authors: [],
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};
test('header contains logo', () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Header />
			</Provider>
		</BrowserRouter>
	);
	const headerLogo = screen.getByTestId('logo');
	expect(headerLogo).toBeInTheDocument();
});
test('header contains user name', () => {
	render(
		<BrowserRouter>
			<Provider store={mockedStore}>
				<Header />
			</Provider>
		</BrowserRouter>
	);
	expect(screen.queryByText('Test Name')).toBeInTheDocument();
});
