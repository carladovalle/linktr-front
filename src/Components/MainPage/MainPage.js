import styled from 'styled-components';
import TopMenu from '../../Common/TopMenu';
import SubmitBox from './SubmitBox';

export default function MainPage() {
	return (
		<>
			<TopMenu />
			<Wrapper>
				<h1>timeline</h1>
				<SubmitBox />
			</Wrapper>
		</>
	);
}

const Wrapper = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 125px;

	h1 {
		width: 611px;
		font-family: 'Oswald', sans-serif;
		font-size: 43px;
		font-weight: 700;
		color: #ffffff;
		margin-bottom: 43px;
	}
`;
