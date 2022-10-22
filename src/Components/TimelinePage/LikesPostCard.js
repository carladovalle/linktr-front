import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { IconContext } from "react-icons";
import { addLike, getLikesQtd, removeLike } from "../../services/linktrAPI.js";
import { useEffect, useState } from "react";

function LikesPostCard ({id, liked, rerender, setRerender}) {

    const [totalLikes, setTotalLikes] = useState([]);
    const [userId, setUserId] = useState(0);
    let tipText = "";

    useEffect(() => {

            const postId = id;
            const promise = getLikesQtd (postId)
            promise.then(res => {setTotalLikes(res.data.likes); setUserId(res.data.userId);})
    
        }, [liked])
    
    function like () {

        const postId = id;

        if (liked === true) {
            const promise = removeLike({ postId });
            promise.then(res => setRerender(!rerender))
            .catch(err => console.log("dislike not available"))
        } else {
            const promise = addLike({ postId });
            promise.then(res => setRerender(!rerender))
            .catch(err => console.log("like not available"))
        }
    }


    if (totalLikes.length !== 0) {
        if (liked === true) {
            const index = totalLikes.findIndex(element => element.userIdLike === userId);
            const totalLikesNoUser = totalLikes.slice(index, index+1);
    
            if (totalLikes.length === 1) {
                tipText = `Você`
            } else if (totalLikes.length === 2) {
                tipText = `Você e ${totalLikesNoUser[0].likerName}`
            } else if (totalLikes.length === 3) {
                tipText = `Você, ${totalLikesNoUser[0].likerName} e outra 1 pessoa`
            } else {
                tipText = `Você, ${totalLikesNoUser[0].likerName} e outras ${totalLikes.length - 2} pessoas`
            }
        } else {
            if (totalLikes.length === 1) {
                tipText = `${totalLikes[0].likerName}`
            } else if (totalLikes.length === 2) {
                tipText = `${totalLikes[0].likerName}, ${totalLikes[1].likerName}`
            } else if (totalLikes.length === 3) {
                tipText = `${totalLikes[0].likerName}, ${totalLikes[1].likerName} e outra 1 pessoa`
            } else {
                tipText = `${totalLikes[0].likerName}, ${totalLikes[1].likerName} e outras ${totalLikes.length - 2} pessoas`
            }
        }
    }

    const likeIconColor = liked ? "red" : "white";

    return (

        totalLikes.length !== 0 ? (
            <Container>
                
                <IconContext.Provider value={{ className: "likeIcon", color: likeIconColor}}>
                    {liked ? < AiTwotoneHeart onClick={() => like()}/> : < AiOutlineHeart onClick={() => like()}/>}
                </IconContext.Provider>
                {totalLikes.length > 1 ? <p data-tip={tipText}>{totalLikes.length} likes</p> : <p data-tip={tipText}>{totalLikes.length} like</p>}
                <ReactTooltip place="bottom" backgroundColor="white" textColor="#505050"/>
            </Container>
        ) : (
            <Container>
                <IconContext.Provider value={{ className: "likeIcon", color: likeIconColor}}>
                    {liked ? < AiTwotoneHeart onClick={() => like()}/> : < AiOutlineHeart onClick={() => like()}/>}
                </IconContext.Provider>
            </Container>
        )
        
    )
}

const Container = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;

    .likeIcon {
        font-size: 20px;
        margin-top: 19px;
    }

    p {
        margin-top: 6px;
        font-size: 11px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
        font-family: 'Lato', sans-serif;
    }
`
export default LikesPostCard;

