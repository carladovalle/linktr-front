import styled from "styled-components";
import { TfiReload } from "react-icons/tfi";
import useInterval from "use-interval";
import { useState } from "react";
import { getLastPostId } from "../../services/linktrAPI";

export default function NewPostNotification({lastPostRendered}){
    const [ newPostsQt, setNewPostsQt ] = useState(0)
    let lastPostId

    useInterval(() => {
        let promise = getLastPostId()
            .then((res) => {
                lastPostId = res.data.id

                if(lastPostRendered && lastPostRendered.id < lastPostId){
                    const numberOfNewPosts = lastPostId - lastPostRendered.id
                    setNewPostsQt(numberOfNewPosts)
                }
            })
            .catch((error) => console.log(error))

    }, 5000)

    return (
        <>
            {newPostsQt !== 0 ?         
            <NewPostButton onClick={() => window.location.reload()}>
            <span> {newPostsQt} new posts! Load more! </span>
                <TfiReload/>
            </NewPostButton> : <></>}
        </>

    )
}

const NewPostButton = styled.div`
    width:610px;
    height:60px;
    margin-bottom:20px;

    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;

    display:flex;
    align-items: center;
    justify-content: center;

    color:#FFFFFF;

    span{
        margin-right: 10px;
    }
`