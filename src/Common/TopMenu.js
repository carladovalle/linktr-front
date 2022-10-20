import styled from 'styled-components';
import { IoChevronDownOutline } from 'react-icons/io5';
import { AiOutlineSearch } from 'react-icons/ai';

export default function TopMenu() {
	return (
		<MenuStyle>
			<h1>linkr</h1>
			<SearchBar />
			<div>
				<IoChevronDownOutline />
				<img
					src="https://sempreupdate.com.br/wp-content/uploads/2019/02/qual-a-diferenca-entre-programador-e-desenvolvedor.jpg"
					alt="profile"
				/>
			</div>
		</MenuStyle>
	);
}

function SearchBar() {
	return (
		<BarStyle>
			<input
				type="text"
				name="searchUser"
				placeholder="Search for people"
				//onChange={handleSearch}
			></input>
			<AiOutlineSearch />
		</BarStyle>
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

const BarStyle = styled.nav`
	width: 563px;
	height: 45px;
	background-color: #ffffff;
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;

	input {
		width: 90%;
		height: 40px;
		border: none;
		outline: none;
		font-size: 19px;

		&::placeholder {
			color: #c6c6c6;
			font-size: 19px;
		}
	}

	svg {
		color: #c6c6c6;
		font-size: 26px;
	}
`;
