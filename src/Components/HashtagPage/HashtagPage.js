import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from '../TimelinePage/PostCard';
import { getHashtagPost } from '../../services/linktrAPI';
import TopMenu from '../../Common/TopMenu';
import HashtagList from '../TimelinePage/HashtagsList';

export default function HashTagPage() {
	const { hashtag } = useParams();
	const [posts, setPosts] = useState([]);
	const [message, setMessage] = useState('Loading...');

	useEffect(() => {
		const promise = getHashtagPost(hashtag);
		promise.then((res) => {
			setPosts(res.data);
			if (posts.length < 1) {
				setMessage('There are no post yet');
			}
		});

		promise.catch((err) => {
			setMessage(
				'An error occured while trying to fetch the posts, please refresh the page'
			);
		});
	}, []);

	return (
		<>
			<TopMenu />
			<Container>
				<div className="content">
					<h1>#{hashtag}</h1>
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

	h1 {
		font-family: 'Oswald', sans-serif;
		font-style: normal;
		font-weight: 700;
		font-size: 43px;
		line-height: 64px;
		color: #ffffff;
		margin-bottom: 43px;
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

	@media (max-width: 675px) {
		.content {
			width: 100%;
		}
		h1 {
			margin-left: 17px;
		}
		h6 {
			margin-left: 17px;
		}
	}
`;
