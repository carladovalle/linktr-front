import styled from 'styled-components';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import SearchBar from './SearchBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopMenu() {
	const image = localStorage.getItem('userImage');
	const navigate = useNavigate();
	const [isClicked, setIsClicked] = useState(false);

	function openLogoutField() {
		setIsClicked(!isClicked);
	}

	return (
		<>
			<MenuStyle>
				<h1 onClick={() => navigate('/timeline')}>linkr</h1>
				<SearchBar />
				<div>
					{isClicked ? (
						<IoChevronUpOutline onClick={openLogoutField} />
					) : (
						<IoChevronDownOutline onClick={openLogoutField} />
					)}
					<img src={image} alt="profile" />
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
	z-index: 10;

	h1 {
		font-family: 'Passion One', cursive;
		font-size: 49px;
		font-weight: 700;
		color: #ffffff;

		&:hover {
			cursor: pointer;
			filter: brightness(0.9);
		}
	}

	> div {
		display: flex;
		align-items: center;
		gap: 15px;

		svg {
			color: #ffffff;
			font-size: 26px;

			&:hover {
				cursor: pointer;
			}
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
	position: fixed;
	top: ${(props) => (props.isClicked ? '72px' : '0px')};
	right: 0;
	background-color: #171717;
	color: #ffffff;
	font-size: 17px;
	font-weight: 700;
	z-index: ${(props) => (props.isClicked ? '10' : '2')};
	transition: all 0.2s ease-in;

	&:hover {
		cursor: pointer;
		background-color: #160000;
	}
`;
