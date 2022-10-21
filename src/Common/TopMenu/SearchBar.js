import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { searchUsers } from '../../services/linktrAPI';

export default function SearchBar() {
	// DADOS MOCKADOS
	// const searchResult = [
	// 	{
	// 		name: 'João Carlos',
	// 		image:
	// 			'https://f.i.uol.com.br/fotografia/2021/02/18/1613671083602eaaabe3537_1613671083_3x2_md.jpg',
	// 	},
	// 	{
	// 		name: 'Jéssica da Silva',
	// 		image:
	// 			'https://thypix.com/wp-content/uploads/2021/07/naruto-pictures-for-drawing-20-700x563.jpg',
	// 	},
	// ];

	const [searchResult, setSearchResult] = useState([]);
	const [userSearched, setUserSearched] = useState('');
	const [isSearching, setIsSearching] = useState(false);

	function handleSearch(e) {
		setUserSearched(e.target.value);
	}

	useEffect(() => {
		if (userSearched.length >= 3 && !isSearching) {
			const promise = searchUsers(userSearched);
			promise
				.then((res) => {
					setSearchResult(res.data);
					setIsSearching(true);
				})
				.catch((err) => alert(err.response.data));
		}

		if (userSearched.length < 3 && isSearching) {
			setIsSearching(false);
			setSearchResult([]);
		}
	}, [userSearched, isSearching]);

	// PARA USAR COM OS DADOS MOCKADOS
	// if (userSearched.length >= 3 && !isSearching) {
	// 	setIsSearching(true);
	// }

	// if (userSearched.length < 3 && isSearching) {
	// 	setIsSearching(false);
	// }

	return (
		<BarStyle>
			<input
				type="text"
				name="searchUser"
				placeholder="Search for people"
				onChange={handleSearch}
			></input>
			<AiOutlineSearch />
			<UsersContainer isSearching={isSearching}>
				{searchResult.length === 0 ? (
					<span>Sorry, there are no results for this search.</span>
				) : (
					searchResult.map(({ name, image }, index) => (
						<UserFound name={name} image={image} key={index} />
					))
				)}
			</UsersContainer>
		</BarStyle>
	);
}

function UserFound({ name, image }) {
	return (
		<UserLine>
			<img src={image} alt="" />
			<p>{name}</p>
		</UserLine>
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
	position: relative;

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

const UsersContainer = styled.section`
	display: ${(props) => (props.isSearching ? 'flex' : 'none')};
	flex-direction: column;
	align-items: center;
	gap: 16px;
	z-index: -1;
	width: 100%;
	height: auto;
	padding: 60px 0 23px 0;
	background-color: #e7e7e7;
	border-radius: 8px;
	position: absolute;
	top: 0;
	left: 0;
	box-shadow: 0 8px 10px 0 rgba(255, 255, 255, 0.2);

	span {
		font-size: 20px;
		font-weight: 300;
		color: #707070;
	}
`;

const UserLine = styled.div`
	height: 40px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 0 17px;
	gap: 12px;

	img {
		width: 39px;
		height: 39px;
		object-fit: cover;
		border-radius: 50px;
	}

	p {
		font-size: 19px;
		color: #515151;
	}

	&:hover {
		background-color: #c6c6c6;
		cursor: pointer;
	}
`;
