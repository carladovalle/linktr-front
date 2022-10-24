import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from '../TimelinePage/PostCard';
import { getLikes, getUserPosts } from '../../services/linktrAPI';
import HashtagList from '../TimelinePage/HashtagsList';
import Loading from '../../Common/Loading';
import { BsArrowLeftCircle } from 'react-icons/bs';

export default function UserPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [posts, setPosts] = useState([]);
	const [message, setMessage] = useState('Loading...');
	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [hasPost, setHasPost] = useState(false);
	const [rerender, setRerender] = useState(false);

	useEffect(() => {
		const promise2 = getLikes();
		let likes = [];
		let postsLike = [];
		let postsNoLike = [];

		promise2
			.then((res) => {
				likes = res.data;
			})
			.catch((err) => console.log('likes not available'));


		const promise1 = getUserPosts(id);
		promise1.then((res) => {

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
			if (res.data[0].link === null) {
				setMessage("This user haven't any posts at moment");
			} else {
				setHasPost(true);
			}
			setName(res.data[0].name);
			setImage(res.data[0].image);
		});

		promise1.catch((err) => {
			if (err.response.status === 404) {
				setMessage(err.response.data);
				return;
			}
			setMessage(
				'An error occured while trying to fetch the posts, please refresh the page'
			);
		});
	}, [posts.length, id, rerender]);

	return (
		<>
			<Container>
				{posts.length === 0 ? (
					<Loading message={message} />
				) : (
					<div className="content">
						<BsArrowLeftCircle onClick={() => navigate('/timeline')} />
						<header>
							<img src={image} alt="profile" />
							<h1>{name}'s posts</h1>
						</header>
						{hasPost === false ? (
							<p>This user haven't posts yet</p>
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
				)}
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

		> p {
			margin-top: 50px;
			font-size: 18px;
			font-family: 'Oswald', sans-serif;
			color: #ffffff;
			text-align: center;
		}

		> svg {
			color: #ffffff;
			font-size: 30px;
			position: fixed;
			top: 18%;
			left: 5%;

			&:hover {
				cursor: pointer;
				filter: brightness(0.7);
			}
		}
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
		margin-left: 17px;
	}

	@media (max-width: 675px) {
		margin-top: 174px;

		.content {
			width: 100%;
		}
		img {
			width: 40px;
			height: 40px;
		}
		h6 {
			margin-left: 17px;
		}

		header {
			margin-left: 17px;
			margin-bottom: 23px;
		}

		h1 {
			font-size: 33px;
		}
	}
`;
