import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import Login from './components/Login';
import Home from './components/Home';
import { refreshToken } from './redux/authSlice';
import Upload from './components/Upload';
import Alert from './components/alert/Alert'
import PrivateRouter from './customRouter/PrivateRouter';
import Header from './components/Header';
import Transactions from './components/Transactions';
import Register from './components/Register';

function App() {
	const { auth } = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(refreshToken())
	}, [dispatch]);

	return (
		<Router>
			<Alert />
			<div className='App'>
				<div className="main">
					{auth.token && <Header />}
					<Routes>
						{/* <Route exact path="/" element={!auth.token ? <Login /> : <Home />} />
						<Route exact path="/register" element={!auth.token ? <Register /> : <Home />} /> */}
						<Route exact path="/" Component={!auth.token ? Login : Home} />
						<Route exact path="/register" Component={Register} />
						

						{/* <PrivateRouter path="/upload" component={Upload} /> */}
						<Route
							path="/upload"
							element={
								<PrivateRouter>
									<Upload />
								</PrivateRouter>
							}
						/>
						<Route
							path="/transactions"
							element={
								<PrivateRouter>
									<Transactions />
								</PrivateRouter>
							}
						/>

					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
