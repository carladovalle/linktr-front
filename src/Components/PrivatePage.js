import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import TopMenu from '../Common/TopMenu/TopMenu.js';

export default function PrivatePage({ children }) {
	const [isAllowed, setIsAllowed] = useState(undefined);
	const url = process.env.REACT_APP_API_BASE_URL;
	useEffect(() => {
		const data = localStorage.getItem('token');
		if (!data) {
			setIsAllowed(false);
			return;
		}
		const token = JSON.parse(data).token;
		async function fetchData() {
			try {
				const promise = await axios.get(`${url}/access/auth`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				localStorage.setItem('userImage', promise.data.image);
				localStorage.setItem('id', promise.data.id);
				setIsAllowed(true);
			} catch (error) {
				localStorage.clear()
				alert(
					'Your login credentials is expired or invalid.\nPlease, sign-in again'
				);
				setIsAllowed(false);
			}
		}
		if (data && token) {
			fetchData();
		}
	}, []);

  if(isAllowed === undefined){
    return
  }

	return isAllowed === false ? (
		<Navigate to="/" replace />
	) : (
		<>
			<TopMenu />
			{children}
		</>
	);
}