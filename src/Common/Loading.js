import gif from '../../Common/spinner.gif';
import styled from 'styled-components';

export default function Loading({ message }) {
	return (
		<LoadingStyle message={message}>
			<img src={gif} alt="" />
			<p>{message}</p>
		</LoadingStyle>
	);
}

const LoadingStyle = styled.section`
	width: 611px;
	height: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 100px;

	img {
		display: ${(props) => (props.message === 'Loading...' ? 'flex' : 'none')};
		width: 120px;
		height: 120px;
	}

	p {
		font-size: 17px;
		font-family: 'Oswald', sans-serif;
		color: #ffffff;
	}
`;
