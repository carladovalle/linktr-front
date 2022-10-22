import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoDiv from './LogoDiv.js';

export default function LoginPage() {
	const [form, setForm] = useState({});
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const navigate = useNavigate();

	function handleForm(event) {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	}

	function sendForm(event) {
		event.preventDefault();
		const url = "http://localhost:5000"
		axios
			.post(`${url}/sign-in`, form)
			.then((response) => {
				const loginSerialized = JSON.stringify(response.data);
				localStorage.setItem('token', loginSerialized);
				navigate('/timeline');
			})
			.catch((error) => {
				if (error.response.status === 401) {
					alert('E-mail ou senha incorretos');
				} else {
					alert(error.response.data);
				}
				setIsButtonDisabled(false);
			});
		setIsButtonDisabled(!isButtonDisabled);
	}
	return (
		<MainPageContent>
			<LogoDiv />
			<FormDiv>
				<form onSubmit={sendForm}>
					<input
						name="email"
						type="text"
						placeholder="E-mail"
						onChange={handleForm}
					/>
					<input
						name="password"
						type="password"
						placeholder="Password"
						onChange={handleForm}
					/>
					<button name="login" type="submit" disabled={isButtonDisabled}>
						log in
					</button>
					<Link to="/sign-up">
						<p>First time ? Create an account!</p>
					</Link>
				</form>
			</FormDiv>
		</MainPageContent>
	);
}

const MainPageContent = styled.div`
	display: flex;

	@media (max-width: 635px) {
		display: flex;
		flex-direction: column;
	}
`;

const FormDiv = styled.div`
	form {
		display: flex;
		flex-direction: column;
		margin-top: 60%;
		padding: 50px;

		@media (max-width: 635px) {
			margin-top: 10%;
			padding: 0;
			justify-content: center;
			align-items: center;
		}
	}

	input {
		all: unset;
		width: 430px;
		height: 65px;
		background: #ffffff;
		border-radius: 6px;
		margin-bottom: 13px;
		padding-left: 20px;
	}

	input::placeholder {
		font-weight: 700;
		font-size: 27px;
		line-height: 40px;
		padding-left: 20px;
	}

	button {
		all: unset;
		width: 430px;
		height: 65px;
		background: #1877f2;
		border-radius: 6px;
		margin-bottom: 13px;
		padding-left: 20px;
		font-family: 'Oswald';
		font-style: normal;
		font-weight: 700;
		font-size: 27px;
		color: #ffffff;
		text-align: center;
	}

	button:disabled {
		background: #000000;
	}

	p {
		font-family: 'Lato';
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		text-decoration: underline;
		color: #ffffff;
		text-align: center;
	}
`;
