import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
	const style = {
		textAlign: 'center',
	};
	function Index() {
		const navigate = useNavigate();

		useEffect(() => {
			setTimeout(() => {
				navigate('/login', { replace: true });
			}, 1000);
		}, [navigate]);

		return <div style={style}>Redirecting...</div>;
	}
	return (
		<Routes>
			<Route path='/' element={<Index />} />
			<Route
				path='/login'
				element={
					<>
						<Header />
						<Login />
					</>
				}
			/>
			<Route
				path='/registration'
				element={
					<>
						<Header />
						<Registration />
					</>
				}
			/>
			<Route
				path='/courses'
				element={
					<>
						<Header />
						<Courses />
					</>
				}
			/>
			<Route
				path='/courses/*'
				element={
					<>
						<Header />
						<PrivateRouter />
					</>
				}
			/>
		</Routes>
	);
}

export default App;
