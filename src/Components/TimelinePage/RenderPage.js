import { useEffect, useState } from 'react';
import { getPost, getLikes, getFollows } from '../../services/linktrAPI';
import TimelinePage from './TimelanePage';

export default function RenderPage() {
	const [posts, setPosts] = useState([]);
	const [message, setMessage] = useState('Loading...');
	const [rerender, setRerender] = useState(false);
	const [more, setMore] = useState(true);
	const [ref, setRef] = useState(true);
	const [fIds, setFIds] = useState([]);
	const userId = localStorage.getItem("id");

	useEffect(() => {

		const promise2 = getLikes();
		const promise3 = getFollows();
		let likes = [];
		let postsLike = [];
		let postsNoLike = [];
		let followsHash = {};
		let followedPosts = [];
		let followsIds = [];
		
		promise2
			.then((res) => {
				likes = res.data;
			})
			.catch((err) => console.log('likes not available'));

		promise3
		.then((res) => {for (let i=0; i < res.data.length; i++) {
			followsHash[res.data[i].profileUserId] = true;
			followsIds = [...followsIds, res.data[i].profileUserId];
        }
			followsHash[userId] = true;
			followsIds = [...followsIds, userId]
        })
		.catch(() => console.log("follows id not available"));

		function fetchData() {

			const promise1 = getPost();
		
		promise1
			.then((res) => {
				postsNoLike = res.data;
					for (let i=0; i < postsNoLike.length; i++) {
					if (postsNoLike[i].isrepost) {
						if (followsHash[postsNoLike[i].reposterid]) {
							followedPosts.push(postsNoLike[i]);
						}
					} else if (followsHash[postsNoLike[i].userId]) {
						followedPosts.push(postsNoLike[i]);
					}
				}

					if (likes.length !== 0) {
						for (let i = 0; i < followedPosts.length; i++) {
							for (let j = 0; j < likes.length; j++) {
								if (followedPosts[i].id === likes[j].postId) {
									const newItem = { ...followedPosts[i], liked: true };
									postsLike.push(newItem);
									break;
								}

								if (j === likes.length - 1) {
									const newItem = { ...followedPosts[i], liked: false };
									postsLike.push(newItem);
								}
							}
						}
					} else {
						for (let i = 0; i < followedPosts.length; i++) {
							const newItem = { ...followedPosts[i], liked: false };
							postsLike.push(newItem);
						}
					}
					setFIds(followsIds);
					setPosts(postsLike);
					if (posts.length < 1) {
						setMessage('There are no post yet');
					}
			})
			.catch((err) => {
				setMessage(
					'An error occured while trying to fetch the posts, please refresh the page'
				);
			})
				
				}
		
			setTimeout(fetchData, 300);
	}, [rerender, ref]);

	return (
		<TimelinePage fIds={fIds}
        posts={posts}
        message={message}
        setMessage={setMessage}
        rerender={rerender}
        setRerender={setRerender}
		more={more}
		setMore={setMore}
		setPosts={setPosts}
        ></TimelinePage>
	);
}