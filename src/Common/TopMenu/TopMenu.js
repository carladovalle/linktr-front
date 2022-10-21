import styled from 'styled-components';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import SearchBar from './SearchBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopMenu() {
	const navigate = useNavigate();
	const [isClicked, setIsClicked] = useState(false);

	function openLogoutField() {
		setIsClicked(!isClicked);
	}

	return (
		<>
			<MenuStyle>
				<h1>linkr</h1>
				<SearchBar />
				<div>
					{isClicked ? (
						<IoChevronUpOutline onClick={openLogoutField} />
					) : (
						<IoChevronDownOutline onClick={openLogoutField} />
					)}
					<img
						src="https://sempreupdate.com.br/wp-content/uploads/2019/02/qual-a-diferenca-entre-programador-e-desenvolvedor.jpg"
						alt="profile"
					/>
				</div>
			</MenuStyle>
			<LogoutField isClicked={isClicked}>
				<span
					onClick={() => {
						localStorage.clear();
						navigate('/');
					}}
				>
					Logout
				</span>
			</LogoutField>
		</>
	);
}

const MenuStyle = styled.header`
	width: 100%;
	height: 72px;
	background-color: #151515;
	padding: 0 17px 0 30px;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 1;

	h1 {
		font-family: 'Passion One', cursive;
		font-size: 49px;
		font-weight: 700;
		color: #ffffff;
	}

	> div {
		display: flex;
		align-items: center;
		gap: 15px;

		svg {
			color: #ffffff;
			font-size: 26px;
		}

		img {
			width: 53px;
			height: 53px;
			border-radius: 50px;
			object-fit: cover;
		}
	}
`;

const LogoutField = styled.div`
	width: 120px;
	height: 47px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-bottom-left-radius: 20px;
	position: absolute;
	top: ${(props) => (props.isClicked ? '72px' : '0px')};
	right: 0;
	background-color: #171717;
	color: #ffffff;
	font-size: 17px;
	font-weight: 700;
	transition: all 0.3s ease-out;
`;
