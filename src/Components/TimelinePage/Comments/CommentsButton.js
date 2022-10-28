import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineComment } from 'react-icons/ai';

export default function CommentButton({ id, userImg, whoPosted }) {
	return (
		<>
			<CommentsSection>
				<AiOutlineComment />
				<span>3 comments</span>
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
