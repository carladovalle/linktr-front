import { GlobalStyle, Reset } from '../../Common/globalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../MainPage/MainPage.js';
import TimelinePage from '../TimelinePage/TimelanePage';

export default function App() {
	return (
		<>
			<Reset />
			<GlobalStyle />
			<BrowserRouter>
				<Routes>
					<Route path="/main" element={<MainPage />} />
					<Route path='/timeline' element={<TimelinePage/>}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}
