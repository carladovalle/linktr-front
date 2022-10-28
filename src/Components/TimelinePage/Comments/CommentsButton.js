import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineComment } from 'react-icons/ai';
import { getCommentsQtd } from '../../../services/linktrAPI';

export default function CommentButton({
	openedComments,
	setOpenedComments,
	id,
}) {
	const [commentsAmount, setCommentsAmount] = useState(0);

	useEffect(() => {
		const promise = getCommentsQtd(id);
		promise.then((res) => setCommentsAmount(res.data));
	}, []);

	return (
		<>
			<CommentsSection>
				<AiOutlineComment onClick={() => setOpenedComments(!openedComments)} />
				<span>{commentsAmount} comments</span>
			</CommentsSection>
		</>
	);
}

const CommentsSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 15px;
	font-size: 11px;
	font-weight: 400;
	color: #ffffff;
	gap: 4px;

	svg {
		font-size: 20px;
	}
`;
