import styled from 'styled-components'
import { BiRepost } from 'react-icons/bi'

export default function RepostPostCard() {
    return (
        <RepostBox>
            <BiRepost style={{ color: "#FFFFFF", fontSize: 25 + "px" }} />
        </RepostBox>
    )
}

const RepostBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`