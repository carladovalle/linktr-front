import { useEffect, useState } from "react"
import styled from "styled-components"
import PostCard from "./PostCard"
import {getPost, getLikes} from "../../services/linktrAPI"
import SubmitBox from "../MainPage/SubmitBox"

export default function TimelinePage(){

    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState("Loading...")
    const token = "come from localStorage";
    const config = { headers: { "Authorization": `Bearer ${token}` } };

    useEffect(() => {

        const promise1 = getPost();
        const promise2 = getLikes(config);
        let postsNoLike;
        let likes;
        let postsLike;

        promise1.then(res => {
            postsNoLike = res.data;
            if (postsNoLike.length < 1) {
                setMessage("There are no post yet")
            }
        }).catch(err =>{
            setMessage("An error occured while trying to fetch the posts, please refresh the page")
        })

        promise2.then(res => {
            likes = res.data;
        }).catch(err => console.log("likes not available"))

        for (let i = 0; i < postsNoLike.length; i++) {
            for (let j = 0; j < likes.length; i++) {
                if (postsNoLike[i].id === likes[j].postId) {
                    postsLike.push({...postsNoLike[i], liked: true});
                    break; 
                }
            }

            postsLike.push({...postsNoLike[i], liked: false});
        }

        setPosts(postsLike);

    }, [])


    return(
        <Container>

            <div className="content">
                <h1>timeline</h1>
                <SubmitBox/>
                {posts.length === 0 ? <h6>{message}</h6>
                :
                posts.map((item, index) => <PostCard
                key = {index}
                id = {item.id}
                userImg = {item.image}
                name = {item.name}
                text = {item.text}
                urlInfos = {item.urlInfos}
                />)}
                
            </div>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 78px;
    width: 100vw;
    
    .content{
        width: 611px;
    }

    h1{
        font-family: 'Oswald', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
        margin-bottom: 43px;
    }

    h6{
        margin-bottom: 7px;
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;
        color: #ffffff;
        word-break: break-word;
    }

    @media (max-width: 675px){
        
        .content{
            width: 100%;
        }
        h1{
        margin-left: 17px;
        }
        h6{
            margin-left: 17px;

        }

    }
    
`