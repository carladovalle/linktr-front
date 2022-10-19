import { GlobalStyle, Reset } from '../../Common/globalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../MainPage/MainPage.js';
import TimelinePage from '../TimelinePage/TimelanePage.js';
import LoginPage from '../LoginPage/LoginPage.js';

export default function App() {
	return (
		<>
			<Reset />
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginPage/>}/>
					<Route path="/main" element={<MainPage />} />
					<Route path='/timeline' element={<TimelinePage/>}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}
