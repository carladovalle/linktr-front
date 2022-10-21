import { GlobalStyle, Reset } from '../../Common/globalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TimelinePage from '../TimelinePage/TimelanePage.js';
import LoginPage from '../LoginPage/LoginPage.js';
import RegisterPage from '../LoginPage/RegisterPage.js';
import ConfirmScreen from '../TimelinePage/ConfirmScreen.js';

export default function App() {
	return (
		<>
			<Reset />
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/sign-up" element={<RegisterPage />} />
					<Route path="/timeline" element={<TimelinePage />}></Route>
					<Route path="/confirm" element={<ConfirmScreen />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}
