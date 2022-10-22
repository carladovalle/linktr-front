import styled from "styled-components";
import { useState, useRef} from "react";
import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { BiEditAlt } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { addLike, removeLike, deletePost, editPost } from "../../services/linktrAPI.js";
import ConfirmScreen from "./ConfirmScreen.js";

export default function PostCard({id, userImg, name, text, urlInfos, liked, rerender, setRerender, posts}){
    
    const [showConfirmScreen, setShowConfirmScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const inputEditText = useRef(null);
    //const [newDescription, setNewDescription] = useState(post.description);

    function like () {

        const token = localStorage.getItem("token");
        const postId = id;
        const config = { headers: { "Authorization": `Bearer ${token}` } };

        if (liked === true) {
            const promise = removeLike({ postId }, config);
            promise.then(res => setRerender(!rerender))
            .catch(err => console.log("dislike not available"))
        } else {
            const promise = addLike({ postId }, config);
            promise.then(res => setRerender(!rerender))
            .catch(err => console.log("like not available"))
        }
    }

    function screenToDelete(){
        setShowConfirmScreen(true);
    }

    function deletePosts () {

        setIsLoading(true);
        const token = localStorage.getItem("token");
        const postId = id;
        const config = { headers: { "Authorization": `Bearer ${token}` } };

        const promise = deletePost({ postId }, config);

        promise.then(() => {
            window.location.reload();
        }).catch(() => {
            setIsLoading(false);
            setShowConfirmScreen(false);
            alert("Could not delete post.")
        });

    } 

    async function editPost() {
        await setIsEditing(true);
        inputEditText.current?.focus();
    }

    /*function editPosts () {

        const token = localStorage.getItem("token");
        const postId = id;
        const config = { headers: { "Authorization": `Bearer ${token}` } };

        const promise = editPost({ postId }, config);

        promise.then(() => {
            console.log("ok")
        }).catch(() => {
            alert("Could not edit post.")
        });

    } */

    const likeIconColor = liked ? "red" : "white";

    return(
        <Container>
                    {showConfirmScreen && (
                    <ConfirmScreen 
                        posts={posts} 
                        deletePost={deletePosts}
                        setShow={setShowConfirmScreen}
                        isLoading={isLoading}
                    />
                )}
            <span className="leftSide">
                <img src={userImg} alt="profile-img"/>
                <IconContext.Provider value={{ className: "likeIcon", color: likeIconColor}}>
                    {liked ? < AiTwotoneHeart onClick={() => like()}/> : < AiOutlineHeart onClick={() => like()}/>} 
                </IconContext.Provider>
            </span>
            
            <span className="infos">
                <div className="firstLine">
                    <h4>{name}</h4>
                        <div className="actions">
                            {isEditing? <BiEditAlt onClick={() => setIsEditing(false)} /> : <BiEditAlt onClick={editPost} />}
                            <div className="space">
                                <AiFillDelete onClick={() => screenToDelete()}/>
                            </div>
                        </div>
                </div>
                <h5>{text}</h5>
                <LinkCard onClick={() => window.open(urlInfos.url)}>
                    <div>
                        <h2>{urlInfos.title}</h2>
                        <h3>{urlInfos.description}</h3>
                        <p>{urlInfos.url}</p>
                    </div>
                    <img src={urlInfos.img} alt=""/>
                </LinkCard>
            </span>
        </Container>
    )
}

const Container = styled.div`
    &&{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        background: #171717;    
        border-radius: 16px;
        padding: 17px;
        margin-bottom: 16px;
    }

    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
    }

    .leftSide {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .likeIcon {
        font-size: 20px;
        margin-top: 19px;
    }

    .infos{
        width: 100%;
        margin-left: 18px;
        margin-top: 2px;
    }

    .firstLine {
        display: flex;
        justify-content: space-between;        
    }

    .actions {
        display: flex;
    }

    .space {
        margin-left: 12.53px;
    }

    h4{
        margin-bottom: 7px;
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #ffffff;
        word-break: break-word;
    }

    h5{
        margin-bottom: 10px;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        word-break: break-word;
    }

    @media (max-width: 675px){
        
    &&{
        border-radius: 0px;
        padding: 9px 15px 15px 15px;
        margin-bottom: 16px;
    }

    img{
        width: 40px;
        height: 40px;
    }

    h4{
        font-size: 17px;
        line-height: 20px;
    }

    h5{
        font-size: 15px;
        line-height: 18px;

    }
}
`

const LinkCard = styled.div`

    &&{
        display: flex;
        justify-content: space-between;
        color: white;
        border: 1px solid #4D4D4D;
        border-radius: 11px;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    && img{
        min-width: 154px;
        min-height: 154px;
        border-radius: 0px 10px 10px 0px;
        object-fit: cover;
    }

    div{
        min-height: 154px;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-right: 8px;
        margin-left: 20px;
    }
    
    h2{
        width: 250px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
        word-break: break-word;
        margin-bottom: 4px;
    }

    h3{
        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;

        color: #9B9595;
        word-break: break-word;
        margin-bottom: 13px;
    }

    p{
        font-weight: 400;
        font-size: 11px;
        line-height: 13px;
        word-break: break-word;
        color: #CECECE;
    }

    @media (max-width: 675px){

        &&{
        display: flex;
        justify-content: space-between;
        color: white;
        border: 1px solid #4D4D4D;
        border-radius: 11px;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    && img{
        min-width: 95px;
        min-height: 105px;
        border-radius: 0px 10px 10px 0px;
        object-fit: cover;
    }

    div{
        min-height: 105px;
        width: 100%;
    }
    
    h2{
        width: 100%;
        font-size: 11px;
        line-height: 13px;
    }

    h3{
        font-size: 9px;
        line-height: 11px;
    }

    p{
        font-size: 9px;
        line-height: 11px;
    }

    }
`