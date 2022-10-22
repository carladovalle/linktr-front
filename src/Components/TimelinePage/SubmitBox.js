import { useState } from 'react';
import styled from 'styled-components';
import { getPost, publishPost } from '../../services/linktrAPI';

export default function SubmitBox({ setPosts, posts, setMessage }) {
	const [postContent, setPostContent] = useState({});
	const image = localStorage.getItem('userImage');
	const [isPublished, setIsPublished] = useState(false);

	function handleForm(e) {
		setPostContent({
			...postContent,
			[e.target.name]: e.target.value,
		});
	}

	async function sendForm(e) {
		e.preventDefault();
		if (isPublished) return;
		setIsPublished(true);

		const promise = publishPost(postContent);
		promise.then(() => {
			setPosts([]);
			setMessage('Loading...');
			setPostContent({});
			setIsPublished(false);
			const postsListPromise = getPost();
			postsListPromise
				.then((res) => {
					if (posts.length < 1) {
						setMessage('There are no post yet');
					}
					setPosts(res.data);
				})
				.catch(() => {
					setMessage(
						'An error occured while trying to fetch the posts, please refresh the page'
					);
				});
		});
		promise.catch(() => {
			alert(
				'There was an error publishing your link.\nPlease, review the link field and then try again.'
			);
			setIsPublished(false);
		});
	}

	return (
		<BoxStyle>
			<img src={image} alt="profile" />

			<PostForm isPublished={isPublished} onSubmit={sendForm}>
				<h2>What are you going to share today?</h2>
				<input
					type="text"
					name="link"
					placeholder="http://..."
					onChange={handleForm}
					value={postContent.link ? postContent.link : ''}
					required
					disabled={isPublished ? true : false}
				></input>
				<textarea
					type="text"
					name="content"
					placeholder="Awesome article about #javascript"
					onChange={handleForm}
					value={postContent.content ? postContent.content : ''}
					disabled={isPublished ? true : false}
				></textarea>
				{isPublished ? (
					<button>Publishing...</button>
				) : (
					<button>Publish</button>
				)}
			</PostForm>
		</BoxStyle>
	);
}

const BoxStyle = styled.div`
	width: 611px;
	height: 209px;
	background-color: #ffffff;
	border-radius: 16px;
	padding: 18px;
	display: flex;
	justify-content: space-between;
	margin-bottom: 29px;

	img {
		width: 50px;
		height: 50px;
		border-radius: 50px;
		object-fit: cover;
	}

	@media (max-width: 675px) {
		width: 100%;
		height: 164px;
		border-radius: 0;
		justify-content: center;
		padding: 10px 15px;

		img {
			display: none;
		}
	}
`;

const PostForm = styled.form`
	width: 88%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 5px;
	margin-top: 8px;

	h2 {
		font-size: 20px;
		font-weight: 300;
		color: #707070;
		width: 100%;
		margin-bottom: 8px;
	}

	input,
	textarea {
		background-color: #efefef;
		width: 100%;
		height: 30px;
		padding: 8px 13px;
		border: none;
		border-radius: 5px;
		outline: none;
		opacity: ${(props) => (props.isPublished ? '0.5' : '1')};

		&::placeholder {
			font-size: 15px;
			font-weight: 300;
			color: #949494;
		}
	}

	textarea {
		height: 66px;
		resize: none;
	}

	button {
		width: 112px;
		height: 31px;
		background-color: #1877f2;
		border: none;
		border-radius: 5px;
		color: #ffffff;
		font-size: 14px;
		font-weight: 700;
		opacity: ${(props) => (props.isPublished ? '0.5' : '1')};
	}

	@media (max-width: 675px) {
		width: 100%;
		justify-content: center;
		margin: 0;

		h2 {
			font-size: 17px;
			text-align: center;
		}

		textarea {
			height: 47px;
		}
	}
`;
