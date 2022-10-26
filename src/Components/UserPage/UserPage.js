import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PostCard from '../TimelinePage/PostCard';
import { changeFollow, getLikes, getUserPosts, isFollowed } from '../../services/linktrAPI';
import HashtagList from '../TimelinePage/HashtagsList';
import Loading from '../../Common/Loading';
import { BsArrowLeftCircle } from 'react-icons/bs';
import InfiniteScroll from 'react-infinite-scroller';

export default function UserPage() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [posts, setPosts] = useState([]);
	const [message, setMessage] = useState('Loading...');
	const [name, setName] = useState('');
	const [image, setImage] = useState('');
	const [hasPost, setHasPost] = useState(false);
	const [rerender, setRerender] = useState(false);
	const [followed, setFollowed] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [more, setMore] = useState(true)


	function hasMore(offset, item) {
		if(offset !== 0 && item.length === 0){
			setMore(false)
		}
	}

	function loadData() {
		const promise2 = getLikes();
		const promise3 = isFollowed(id);
		let likes = [];
		let postsLike = [];
		let postsNoLike = [];
		const offset = posts.length

		promise3
			.then((res) => res.data ? setFollowed(true) : setFollowed(false))
			.catch((err) => console.log('follows not available'));

		promise2
			.then((res) => {
				likes = res.data;
			})
			.catch((err) => console.log('likes not available'));

		function fetchData() {
			const promise1 = getUserPosts(id, offset);
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
					hasMore(offset, res.data)
					setPosts([...posts, ...postsLike]);
					if (res.data[0].link === null) {
						setMessage("This user haven't any posts at moment");
					} else {
						setHasPost(true);
					}
					setName(res.data[0].name);
					setImage(res.data[0].image)
				})
				.catch((err) => {
					setMessage(
						'An error occured while trying to fetch the posts, please refresh the page'
					);
				});
		}
		setTimeout(fetchData, 300);
	}

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

		function fetchData(){
			postsNoLike = posts;

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
		}
		setTimeout(fetchData, 300);
	}, [id, rerender]);

	async function toFollow () {
		setDisabled(true);
		const aloka = changeFollow(id, followed);
		aloka
			.then(res => {setRerender(!rerender); setDisabled(false)})
			.catch((err) => alert("follow/unfollow unavailable")); 
	}

	return (
		<>
			<Container>
					<div className="content">
						<BsArrowLeftCircle onClick={() => navigate('/timeline')} />
						<header>
							<img src={image} alt="profile" />
							<h1>{name}'s posts</h1>
							<button onClick={toFollow} disabled={disabled} followed={followed}>{followed ? "Unfollow" : "Follow"}</button>
						</header>
						<InfiniteScroll
						loadMore={loadData}
						hasMore={more}
						>
						
						{posts.length === 0 ? (
							<h6>This user haven't any posts at moment</h6>
						) : (
							posts.map((item, index) => (
								<PostCard
									key={item.id}
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
						</InfiniteScroll>
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

	button {
		width: 112px;
		height: 31px;
		border-radius: 5px;
		border: none;
		background-color: ${props => props.followed ? "#FFFFFF" : "#1877F2"};
		font-size: 14px;
		font-weight: 700;
		color: ${props => props.followed ? "#1877F2" : "#FFFFFF"};
		float: right;
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
