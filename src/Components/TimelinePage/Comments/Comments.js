import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { addCommentPost, getCommentPost } from '../../../services/linktrAPI.js';
import { useNavigate } from 'react-router-dom';

export default function Comments({ id, whoPosted }) {
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState();
	const userImg = localStorage.getItem("userImage")
	const navigate = useNavigate()

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
					: comments.map((c, index) => (
							<Comment key={index}>
								<img src={c.image} alt="" onClick={() => navigate(`/user/${c.userId}`)}/>
								<div>
									<h4>
										<span onClick={() => navigate(`/user/${c.userId}`)}>{c.author}</span>
										<p> {whoPosted === c.userId ? `• post's author` : ''} </p>
										<p> {c.isFollowing ? `• following` : ''} </p>
									</h4>
									<p>{c.text}</p>
								</div>
							</Comment>
					  ))}
			</Scroller>
			<WriteComment>
				<img src={userImg} alt ="" />
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
		z-index: -1;
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
		border: none;

		&::placeholder {
			font-size: 14px;
			font-style: italic;
			font-weight: 400;
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

	&::-webkit-scrollbar{
		width: 10px;
	}

	&::-webkit-scrollbar-thumb{
		background-color: black;
		border-radius: 20px;
		border: none
	}

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
	height: 40px;
	width: 95%;
	padding-left: 33px;
	position: relative;
	display: flex;
	align-items: center;
	margin: 19px 0 8px 0;
	
	input {
		width: 600px;
		padding: 0 40px 0 11px;
		height: 39px;
		background-color: #252525;
		border-radius: 8px;
		color: #acacac;
		outline: none;
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
	@media (max-width: 675px) {
		width: 95%;
	}
`;
const ButtonSend = styled.div`
	position: absolute;
	top: calc(50% - 9px);
	font-size: 18px;
	right: 13px;
	color: #f3f3f3;

	&:hover{
		cursor: pointer;
		filter: brightness(0.85);
	}
`;
