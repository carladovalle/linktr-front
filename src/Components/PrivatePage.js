import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import TopMenu from '../Common/TopMenu/TopMenu.js';

export default function PrivatePage({ children }) {
	const [isAllowed, setIsAllowed] = useState(undefined);

	useEffect(() => {
		const data = localStorage.getItem('token');
    console.log(data)
		if (!data) {
			setIsAllowed(false);
			return;
		}
    console.log(data)
		const token = JSON.parse(data).token;
		async function fetchData() {
			try {
				const promise = await axios.get('http://localhost:5000/access/auth', {
					headers: { Authorization: `Bearer ${token}` },
				});
				localStorage.setItem('userImage', promise.data.image);
				setIsAllowed(true);
			} catch (error) {
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