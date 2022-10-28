import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { addCommentPost, getCommentPost } from '../../../services/linktrAPI.js';

export default function Comments({ id, userImg, whoPosted }) {
	const style = { color: 'white', fontSize: '18px', margin: '0 3px' };
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState();

	useEffect(() => {
		const postId = id;

		const promise = getCommentPost({ postId });

		promise.then((response) => {
			setComments(response.data);
		});

		promise.catch(() => {
			alert(
				'There was an error comment post.\nPlease, review the link field and then try again.'
			);
		});
	}, []);

	async function addComment(e) {
		e.preventDefault();

		const postId = id;

		const promiseAdd = addCommentPost({ postId }, { text: comment });

		promiseAdd.then(() => {
			setComment('');
			const promiseGet = getCommentPost({ postId });
			promiseGet.then((response) => {
				setComments(response.data);
			});
		});

		promiseAdd.catch(() => {
			alert(
				'There was an error comment post.\nPlease, review the link field and then try again.'
			);
		});
	}

	return (
		<ContainerComments>
			<Scroller>
				{!comments
					? ''
					: comments.map((c) => (
							<Comment>
								<img src={c.image} />
								<div>
									<h4>
										<span>{c.author}</span>
										<p> {whoPosted === c.userId ? `• post's author` : ''} </p>
										<p> verifica se é seguir ou nao </p>
									</h4>
									<p>{c.text}</p>
								</div>
							</Comment>
					  ))}
			</Scroller>
			<WriteComment>
				<img src={userImg} />
				<input
					type="text"
					placeholder="write a comment..."
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					required
				/>
				<ButtonSend>
					<IoPaperPlaneOutline onClick={addComment} />
				</ButtonSend>
			</WriteComment>
		</ContainerComments>
	);
}

const ContainerComments = styled.div`
	&& {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: column;
		width: 100%;
		background: #1e1e1e;
		border-radius: 0 0 16px 16px;
		padding: 17px;
	}
	img {
		width: 39px;
		height: 39px;
		border-radius: 50%;
		object-fit: cover;
		&:hover {
			cursor: pointer;
			filter: brightness(0.9);
		}
	}
	input {
		background-color: #252525;
		width: 510px;
		height: 39px;
		margin-left: 14px;
		border-color: #252525;
		border-radius: 8px;

		&::placeholder {
			font-size: 14px;
			color: #575757;
		}
	}

	@media (max-width: 675px) {
		&& {
			border-radius: 0px;
			padding: 9px 15px 15px 15px;
			margin-bottom: 16px;
		}
		img {
			width: 40px;
			height: 40px;
		}
		h4 {
			font-size: 17px;
			line-height: 20px;
		}
		h5 {
			font-size: 15px;
			line-height: 18px;
		}
	}
`;
const Scroller = styled.div`
	max-height: 200px;
	overflow-y: auto;
	overflow-x: hidden;

	@media (max-width: 635px) {
		width: 100%;
	}
`;
const Comment = styled.div`
	border-bottom: 1px solid #353535;
	display: flex;
	align-items: center;
	font-size: 14px;
	line-height: 17px;
	padding: 15px 0 15px 0;
	width: 576px;

	img {
		width: 39px;
		height: 39px;
		border-radius: 50%;
		margin: 0 6px 0 33px;
	}
	h4 {
		color: #f3f3f3;
		font-weight: bold;
		max-width: 510px;
		word-break: break-word;
		cursor: pointer;
		display: flex;
		flex-direction: row;
		p {
			color: #565656;
			margin-left: 4px;
		}
	}
	span {
		color: #fff;
	}
	p {
		color: #acacac;
		max-width: 510px;
		word-break: break-word;
	}
	div {
		margin-left: 15px;
		@media (max-width: 635px) {
			width: 100%;
		}
	}
	@media (max-width: 635px) {
		width: 100%;
	}
`;
const WriteComment = styled.div`
	height: 83px;
	width: 95%;
	padding-left: 33px;
	position: relative;
	display: flex;
	align-items: center;
	input {
		width: 600px;
		padding: 0 40px 0 11px;
		height: 39px;
		background-color: #252525;
		border-radius: 8px;
		color: #acacac;
	}
	&::placeholder {
		color: #575757;
		padding-left: 10px;
	}
	img {
		width: 39px;
		height: 39px;
		border-radius: 50%;
		margin-right: 18px;
		object-fit: cover;
	}
	@media (max-width: 635px) {
		width: 95%;
	}
`;
const ButtonSend = styled.div`
	position: absolute;
	top: 32px;
	right: 5px;
`;
