import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner';

export default function ConfirmScreen({setShow, deletePost, posts, isLoading}) {

    return(
        <>
            {isLoading ? <Container><ThreeDots color="#FFFFFF" size="40" /></Container> :
            <Container>
                    <Text> Are you sure you want <br /> to delete this post?</Text>
                    <Buttons>
                        <ButtonRecuse onClick={() => setShow(false)}>No, go back</ButtonRecuse>
                        <ButtonAccept onClick={() => deletePost(posts.id)}>Yes, delete it</ButtonAccept>
                    </Buttons>
            </Container>}
            <OpacityBackground />
        </>
    );
}

const Container = styled.div`
    width: 597px;
    max-width: 100%;
    height: 262px;
    background: #333333;
    border-radius: 50px;
    margin: auto;
    gap:40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;

	@media (max-width: 675px) {
		margin-top: 146px;

		.content {
			width: 100%;
		}
		h1 {
			margin-left: 17px;
		}
		h6 {
			margin-left: 17px;
		}
	}
`;

const OpacityBackground = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
`;  

const Text = styled.span`
    font-weight: 700;
    font-size: 34px;
    line-height: 41px;
    text-align: center;
    color: #FFFFFF;

    @media (max-width: 350px) {
        font-size: 22px;
        line-height: 38px;
    }

`;

const Buttons = styled.div`
    gap: 63px;
    display: flex;

    button:hover{
        cursor: pointer;
        filter: brightness(0.85);
    }

    @media (max-width: 610px) {
        gap: 10px;
    }
`;

const ButtonAccept = styled.button`
    width: 134px;
    height: 37px;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    background: #1877F2;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`;

const ButtonRecuse = styled.button`
    width: 134px;
    height: 37px;
    font-size: 18px;
    font-weight: 700;
    color: #1877F2;
    background: #FFFFFF;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`;
