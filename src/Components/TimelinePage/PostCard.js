import styled from 'styled-components';
import { ReactTagify } from 'react-tagify';
import notImage from '../../Common/404.jpeg';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import LikesPostCard from './LikesPostCard';
import { BiEditAlt } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deletePost, editThePost, repost } from '../../services/linktrAPI.js';
import ConfirmScreen from './ConfirmScreen.js';
import Comments from './Comments/Comments.js';
import RepostBar from './RepostBar';
import RepostPostCard from './RepostPostCard';
import CommentButton from './Comments/CommentsButton';
import ConfirmRepost from './ConfirmRepost';

export default function PostCard({
	id,
	userImg,
	name,
	text,
	urlInfos,
	liked,
	rerender,
	setRerender,
	userId,
	posts,
	isrepost,
	reposterid,
	reposterName

}) {
	const idLocalStorage = Number(localStorage.getItem('id'));
	const style = { color: 'white', fontSize: '18px', margin: '0 3px' };
	const [showConfirmScreen, setShowConfirmScreen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const inputEditText = useRef(null);
	const [newText, setNewText] = useState(text);
	const [descriptionText, setDescriptionText] = useState(text);
	const navigate = useNavigate();
	const tagStyle = {
		color: '#FFFFFF',
		fontWeight: 'bold',
		cursor: 'pointer',
	};
	const [openedComments, setOpenedComments] = useState(false);
	const [confirmRepost, setConfirmRepost] = useState(false);
	const [loading, setLoading] = useState(false);
	let isUserId = userId
	if(isrepost){
		isUserId = reposterid
	}

	function hashtag(name) {
		const params = name.slice(1);
		navigate(`/hashtag/${params}`);
	}

	function screenToDelete() {
		setShowConfirmScreen(true);
	}

	function deletePosts() {
		setIsLoading(true);
		const postId = id;

		const promise = deletePost({ postId });

		promise
			.then(() => {
				window.location.reload();
			})
			.catch(() => {
				setIsLoading(false);
				setShowConfirmScreen(false);
				alert('Could not delete post.');
			});
	}

	async function editPost() {
		await setIsEditing(true);
		inputEditText.current?.focus();
	}

	function updatePosts(e) {
		e.preventDefault();

		setIsLoading(true);

		const postId = id;

		const promise = editThePost(
			{ postId },
			{ link: urlInfos.url, content: newText }
		);

		promise
			.then(() => {
				setDescriptionText(newText);
				setIsEditing(false);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsEditing(false);
				alert('Could not edit post.');
			});
	}

	document.onkeydown = function handleKeyDown(e) {
		try {
			switch (e.key) {
				case 'Escape':
					setIsEditing(false);
					break;
				default:
			}
		} catch (error) {
			console.log(error);
		}
	};

	function repostPost() {
		setLoading(true)
        const postId = id;
        const promise = repost({ postId });
        promise.then(res => {setRerender(!rerender); setConfirmRepost(false); setLoading(false)})
        .catch(err => {console.log("repost not available")
		setConfirmRepost(false)
		setLoading(false)})
    }

	if (!urlInfos.image) {
		urlInfos.image = notImage;
	}

	return (
		<Wrapper>
			<RepostBar
			isrepost={isrepost}
			reposterid={reposterid}
			reposterName={reposterName}
			></RepostBar>
			<Container>
				{showConfirmScreen && (
					<ConfirmScreen
						posts={posts}
						deletePost={deletePosts}
						setShow={setShowConfirmScreen}
						isLoading={isLoading}
					/>
				)}
				<span className="leftSide">
					<img
						src={userImg}
						alt="profile-img"
						onClick={() => navigate(`/user/${userId}`)}
					/>
					<LikesPostCard
						id={id}
						liked={liked}
						rerender={rerender}
						setRerender={setRerender}
					/>
					<RepostPostCard 
					id={id}
					rerender={rerender}
					setRerender={setRerender}
					loading={loading}
					setLoading={setLoading}
					setConfirmRepost={setConfirmRepost}/>
					<CommentButton
						id={id}
						openedComments={openedComments}
						setOpenedComments={setOpenedComments}
					/>
				</span>

				<span className="infos">
					<div className="firstLine">
						<h4 onClick={() => navigate(`/user/${userId}`)}>{name}</h4>

						{isUserId === idLocalStorage ? (
							<div className="actions">{
								isrepost ? <></>
								:
								<Edit>
									{isEditing ? (
										<BiEditAlt
											style={style}
											onClick={() => setIsEditing(false)}
										/>
									) : (
										<BiEditAlt style={style} onClick={() => editPost()} />
									)}
								</Edit>
							}
								<AiFillDelete style={style} onClick={() => screenToDelete()} />
							</div>
						) : (
							<></>
						)}
					</div>
					{isEditing ? (
						<EditText
							disabled={isLoading}
							ref={inputEditText}
							type="text"
							value={newText}
							onChange={(e) => setNewText(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									updatePosts(e);
								}
							}}
						/>
					) : descriptionText ? (
						<ReactTagify tagStyle={tagStyle} tagClicked={(tag) => hashtag(tag)}>
							<h5>{descriptionText}</h5>
						</ReactTagify>
					) : (
						<h5>{descriptionText}</h5>
					)}

					<LinkCard onClick={() => window.open(urlInfos.url)}>
						<div>
							<h2>{urlInfos.title}</h2>
							<h3>{urlInfos.description}</h3>
							<p>{urlInfos.url}</p>
						</div>
						<img src={urlInfos.image} alt="" />
					</LinkCard>
				</span>
			</Container>
			{openedComments ? (
				<Comments id={id} userImg={userImg} whoPosted={userId} userId={userId}/>
			) : (
				''
			)}
			{confirmRepost ? 
					<ConfirmRepost
						setConfirmRepost={setConfirmRepost}
						repostPost={repostPost}
						loading={loading}
					/>
					:
					<></>
				}
		</Wrapper>
	);
}

const Wrapper = styled.section`
	margin-bottom: 32px;
	display: flex;
	flex-direction: column;
`;

const Container = styled.div`
	&& {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		width: 100%;
		background: #171717;
		border-radius: 16px;
		padding: 17px;
		margin-bottom: -15px;
	}
	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
		&:hover {
			cursor: pointer;
			filter: brightness(0.9);
		}
	}
	.leftSide {
		width: 12%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.likeIcon {
		font-size: 20px;
		margin-top: 19px;
	}
	.infos {
		width: 100%;
		margin-left: 18px;
		margin-top: 2px;
	}
	.firstLine {
		display: flex;
		justify-content: space-between;
	}
	.actions {
		display: flex;
	}
	.space {
		margin-left: 12.53px;
	}
	h4 {
		margin-bottom: 7px;
		font-style: normal;
		font-weight: 400;
		font-size: 19px;
		line-height: 23px;
		color: #ffffff;
		word-break: break-word;
		&:hover {
			cursor: pointer;
			filter: brightness(0.9);
		}
	}
	h5 {
		margin-bottom: 10px;
		font-weight: 400;
		font-size: 17px;
		line-height: 20px;
		color: #b7b7b7;
		word-break: break-word;
	}

	svg:hover{
		cursor: pointer;
		filter: brightness(0.85);
	}
	@media (max-width: 675px) {
		&& {
			border-radius: 0px;
			padding: 9px 15px 15px 15px;
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
const LinkCard = styled.div`
	&& {
		display: flex;
		justify-content: space-between;
		color: white;
		border: 1px solid #4d4d4d;
		border-radius: 11px;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
	&& img {
		min-width: 154px;
		min-height: 154px;
		border-radius: 0px 10px 10px 0px;
		object-fit: cover;
	}
	div {
		min-height: 154px;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		margin-right: 8px;
		margin-left: 20px;
	}

	h2 {
		width: 250px;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		color: #cecece;
		word-break: break-word;
		margin-bottom: 4px;
	}
	h3 {
		font-style: normal;
		font-weight: 400;
		font-size: 11px;
		line-height: 13px;
		color: #9b9595;
		word-break: break-word;
		margin-bottom: 13px;
	}
	p {
		font-weight: 400;
		font-size: 11px;
		line-height: 13px;
		word-break: break-word;
		color: #cecece;
	}
	@media (max-width: 675px) {
		&& {
			display: flex;
			justify-content: space-between;
			color: white;
			border: 1px solid #4d4d4d;
			border-radius: 11px;
			width: 100%;
			height: 100%;
			cursor: pointer;
		}
		&& img {
			min-width: 95px;
			min-height: 105px;
			border-radius: 0px 10px 10px 0px;
			object-fit: cover;
		}
		div {
			min-height: 105px;
			width: 100%;
		}

		h2 {
			width: 100%;
			font-size: 11px;
			line-height: 13px;
		}
		h3 {
			font-size: 9px;
			line-height: 11px;
		}
		p {
			font-size: 9px;
			line-height: 11px;
		}
	}
`;
const Edit = styled.div``;
const EditText = styled.textarea`
	resize: vertical;
	background: #171717;
	width: 100%;
	max-height: 150px;
	font-weight: 400;
	font-size: 17px;
	line-height: 20px;
	background: #ffffff;
	border-radius: 7px;
	&:focus {
		box-shadow: 0 0 0 0;
		border: 0 none;
		outline: 0;
	}
	@media (max-width: 610px) {
		font-size: 15px;
		line-height: 18px;
	}
`;
