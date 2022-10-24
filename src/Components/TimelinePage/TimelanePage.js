import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import { getPost, getLikes } from '../../services/linktrAPI';
import SubmitBox from './SubmitBox';
import HashtagList from './HashtagsList';

export default function TimelinePage() {
	const [posts, setPosts] = useState([]);
	const [message, setMessage] = useState('Loading...');
	const [rerender, setRerender] = useState(false);

	useEffect(() => {
		const promise1 = getPost();
		const promise2 = getLikes();
		let likes = [];
		let postsLike = [];
		let postsNoLike = [];

		promise2
			.then((res) => {
				likes = res.data;
			})
			.catch((err) => console.log('likes not available'));

		promise1
			.then((res) => {
				postsNoLike = res.data;

				if (likes.length !== 0) {
					for (let i = 0; i < postsNoLike.length; i++) {
						for (let j = 0; j < likes.length; j++) {
							if (postsNoLike[i].id === likes[j].postId) {
								const newItem = { ...postsNoLike[i], liked: true };
								postsLike.push(newItem);
								break;
							}

							if (j === likes.length - 1) {
								const newItem = { ...postsNoLike[i], liked: false };
								postsLike.push(newItem);
							}
						}
					}
				} else {
					for (let i = 0; i < postsNoLike.length; i++) {
						const newItem = { ...postsNoLike[i], liked: false };
						postsLike.push(newItem);
					}
				}

				setPosts(postsLike);
				if (posts.length < 1) {
					setMessage('There are no post yet');
				}
			})
			.catch((err) => {
				setMessage(
					'An error occured while trying to fetch the posts, please refresh the page'
				);
			});
	}, [rerender]);

	return (
		<>
			<Container>
				<div className="content">
					<h1>timeline</h1>
					<SubmitBox
						setPosts={setPosts}
						setMessage={setMessage}
						posts={posts}
						rerender={rerender}
						setRerender={setRerender}
					/>
					{posts.length === 0 ? (
						<h6>{message}</h6>
					) : (
						posts.map((item, index) => (
							<PostCard
								key={index}
								id={item.id}
								userImg={item.image}
								name={item.name}
								text={item.content}
								urlInfos={item.urlInfos}
								liked={item.liked}
								rerender={rerender}
								setRerender={setRerender}
								posts={posts}
								setMessage={setMessage}
								userId={item.userId}
							/>
						))
					)}
				</div>
				<HashtagList/>
			</Container>
		</>
	);
}

const Container = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	margin-top: 125px;
	width: 100vw;

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
		margin-top: 146px;

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
