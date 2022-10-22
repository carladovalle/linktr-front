import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from '../TimelinePage/PostCard';
import { getUserPosts } from '../../services/linktrAPI';
import TopMenu from '../../Common/TopMenu/TopMenu';
import HashtagList from '../TimelinePage/HashtagsList';

export default function UserPage({ name }) {
	const { id } = useParams();
	const { image } = JSON.parse(localStorage.getItem('token'));
	const [posts, setPosts] = useState([]);
	const [message, setMessage] = useState('Loading...');

	useEffect(() => {
		const promise = getUserPosts(id);
		promise.then((res) => {
			setPosts(res.data.list);
			if (posts.length < 1) {
				setMessage('There are no post yet');
			}
		});

		promise.catch((err) => {
			setMessage(
				'An error occured while trying to fetch the posts, please refresh the page'
			);
		});
	}, [posts.length, id]);

	return (
		<>
			<TopMenu />
			<Container>
				<div className="content">
					<header>
						<img src={image} alt="profile" />
						<h1>{name}'s posts</h1>
					</header>

					{posts.length === 0 ? (
						<h6>{message}</h6>
					) : (
						posts.map((item, index) => (
							<PostCard
								key={index}
								userImg={item.image}
								name={item.name}
								text={item.content}
								urlInfos={item.urlInfos}
							/>
						))
					)}
				</div>
				<HashtagList />
			</Container>
		</>
	);
}

const Container = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	margin-top: 124px;
	width: 100%;

	.content {
		width: 611px;
	}

	img {
		width: 50px;
		height: 50px;
		border-radius: 50px;
		object-fit: cover;
	}

	h1 {
		font-family: 'Oswald', sans-serif;
		font-style: normal;
		font-weight: 700;
		font-size: 43px;
		line-height: 64px;
		color: #ffffff;
	}

	h6 {
		margin-bottom: 7px;
		font-style: normal;
		font-weight: 400;
		font-size: 19px;
		line-height: 23px;
		color: #ffffff;
		word-break: break-word;
	}

	header {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-bottom: 43px;
	}

	@media (max-width: 675px) {
		.content {
			width: 100%;
		}
		img {
			width: 40px;
			height: 40px;
		}
		h1 {
			margin-left: 17px;
		}
		h6 {
			margin-left: 17px;
		}
	}
`;
