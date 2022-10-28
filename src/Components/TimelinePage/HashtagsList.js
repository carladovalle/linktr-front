import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHashtags } from '../../services/linktrAPI';
import styled from 'styled-components';

function Hashtag({ name }) {
	const params = name.slice(1);
	const navigate = useNavigate();

	return (
		<li
			onClick={() => {
				navigate(`/hashtag/${params}`);
			}}
		>
			{name}
		</li>
	);
}

export default function HashtagList() {
	const [hashtags, setHashtags] = useState([]);
	const [switchRefresh, setSwitchRefresh] = useState(false);

	function refreshList() {
		if (switchRefresh) {
			setSwitchRefresh(false);
		} else {
			setSwitchRefresh(true);
		}
	}

	setInterval(refreshList, 60000);

	useEffect(() => {
		const promise = getHashtags();
		promise.then((res) => {
			setHashtags(res.data);
		});

		promise.catch((err) => {});
	}, [switchRefresh]);

	return (
		<Wrapper>
			<Container>
				<h2>trending</h2>
				<div></div>
				<ul>
					{hashtags.map((item, index) => (
						<Hashtag key={index} name={item.hashtag} />
					))}
				</ul>
			</Container>
		</Wrapper>
	);
}

const Container = styled.div`
	margin-left: 27px;
	margin-top: 104px;
	width: 300px;
	min-height: 105px;
	background: #171717;
	border-radius: 16px;
	padding-top: 9px;
	padding-bottom: 9px;
    position: fixed;

	h2 {
		margin-left: 16px;
		font-family: 'Oswald';
		font-style: normal;
		font-weight: 700;
		font-size: 27px;
		line-height: 40px;
		color: #ffffff;
	}

	div {
		margin-top: 12px;
		margin-bottom: 22px;
		width: 300px;
		border-bottom: 1px solid #484848;
	}

	ul {
		margin-left: 16px;
	}
	li {
		max-width: 290px;
		margin-bottom: 7px;
		font-weight: 700;
		font-size: 19px;
		line-height: 23px;
		letter-spacing: 0.05em;
		word-break: break-all;
		cursor: pointer;
		color: #ffffff;
	}

	@media (max-width: 990px) {
		&& {
			display: none;
		}
	}
`;

const Wrapper = styled.aside`
	margin-left: 27px;
    width: 300px;
    height: 100vh;
	min-height: 105px;
`;
