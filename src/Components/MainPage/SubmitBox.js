import { useState } from 'react';
import styled from 'styled-components';

export default function SubmitBox() {
	const [postContent, setPostContent] = useState({});

	function handleForm(e) {
		setPostContent({
			...postContent,
			[e.target.name]: e.target.value,
		});
	}

	function sendForm(e) {
		e.preventDefault();
		console.log(postContent);
	}

	return (
		<BoxStyle>
			<img
				src="https://sempreupdate.com.br/wp-content/uploads/2019/02/qual-a-diferenca-entre-programador-e-desenvolvedor.jpg"
				alt="profile"
			/>

			<PostForm onSubmit={sendForm}>
				<h2>What are you going to share today?</h2>
				<input
					type="text"
					name="link"
					placeholder="http://..."
					onChange={handleForm}
					required
				></input>
				<textarea
					type="text"
					name="content"
					placeholder="Awesome article about #javascript"
					onChange={handleForm}
				></textarea>
				<button>Publish</button>
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

	img {
		width: 50px;
		height: 50px;
		border-radius: 50px;
		object-fit: cover;
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
	}
`;
