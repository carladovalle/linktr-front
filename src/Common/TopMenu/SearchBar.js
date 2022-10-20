import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchBar() {
	return (
		<BarStyle>
			<input
				type="text"
				name="searchUser"
				placeholder="Search for people"
				//onChange={handleSearch}
			></input>
			<AiOutlineSearch />
			<div></div>
		</BarStyle>
	);
}

const BarStyle = styled.nav`
	width: 45%;
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

	@media (max-width: 675px) {
		width: 95%;
		position: absolute;
		margin: 0 auto;
		top: 82px;
		left: 0;
		right: 0;
	}
`;
