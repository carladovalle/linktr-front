import styled from 'styled-components';
import TopMenu from '../../Common/TopMenu';
import SubmitBox from './SubmitBox';

export default function MainPage() {
	return (
		<Wrapper>
			<TopMenu />
			<SubmitBox />
		</Wrapper>
	);
}

const Wrapper = styled.main`
	margin-top: 200px;
	margin-left: 100px;
`;
