import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { searchUsers } from '../../services/linktrAPI';
import { DebounceInput } from 'react-debounce-input';
import { useNavigate } from 'react-router-dom';
import { BsFillCircleFill } from 'react-icons/bs';

export default function SearchBar() {
	const [searchResult, setSearchResult] = useState([]);
	const [userSearched, setUserSearched] = useState('');
	const [isSearching, setIsSearching] = useState(false);

	function handleSearch(e) {
		setUserSearched(e.target.value);
	}

	useEffect(() => {
		if (userSearched.length >= 3) {
			const promise = searchUsers(userSearched);
			promise
				.then((res) => {
					setSearchResult(res.data);
					setIsSearching(true);
				})
				.catch((err) => alert(err.response.data));
		}

		if (userSearched.length < 3) {
			setIsSearching(false);
			setSearchResult([]);
		}
	}, [userSearched, isSearching]);

	return (
		<BarStyle>
			<DebounceInput
				minLength={3}
				debounceTimeout={700}
				placeholder="Search for people"
				onChange={handleSearch}
			></DebounceInput>
			<AiOutlineSearch />
			<UsersContainer isSearching={isSearching}>
				{searchResult.length === 0 ? (
					<span>Sorry, there are no results for this search.</span>
				) : (
					searchResult.map(({ id, name, image, profileUserId }, index) => (
						<UserFound
							name={name}
							profileUserId={profileUserId}
							image={image}
							key={index}
							id={id}
							setIsSearching={setIsSearching}
						/>
					))
				)}
			</UsersContainer>
		</BarStyle>
	);
}

function UserFound({ id, name, image, profileUserId }) {
	const navigate = useNavigate();
	const myId = Number(localStorage.getItem('id'));

	return (
		<UserLine
			onClick={() => {
				navigate(`/user/${id}`);
				window.location.reload();
			}}
		>
			<img src={image} alt="" />
			<p>{name}</p>
			{profileUserId ? (
				<>
					<BsFillCircleFill />
					<span>following</span>
				</>
			) : myId === Number(id) ? (
				<>
					<BsFillCircleFill />
					<span>me</span>
				</>
			) : (
				''
			)}
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

	> svg {
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

	> span {
		font-size: 19px;
		font-weight: 400;
		color: #c5c5c5;
	}

	> svg {
		font-size: 8px;
		color: #c5c5c5;
		margin-top: 2px;
	}

	&:hover {
		background-color: #c6c6c6;
		cursor: pointer;
		> svg,
		> span {
			color: #e6dfdf;
		}
	}
`;
