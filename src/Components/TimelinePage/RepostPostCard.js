import styled from 'styled-components'
import { BiRepost } from 'react-icons/bi'
import { useEffect, useState } from 'react';
import { repost, getRepostQtd } from '../../services/linktrAPI';

export default function RepostPostCard({id, rerender, setRerender, setConfirmRepost, loading}) {
    const [totalRepost, setTotalRepost] = useState();

    useEffect(() => {
        const postId = id;
        const promise = getRepostQtd(postId)

        promise.then(res => {setTotalRepost(res.data.count)})
    }, [loading])


    return (
        <RepostBox>
            <BiRepost style={{ color: "#FFFFFF", fontSize: 25 + "px" }} 
            onClick={()=> setConfirmRepost(true)}/>
            <p>{totalRepost} re-post</p>
        </RepostBox>
    )
}

const RepostBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    p {
        margin-top: 6px;
        font-size: 11px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
        font-family: 'Lato', sans-serif;
    }
`