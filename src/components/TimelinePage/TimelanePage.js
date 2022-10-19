import { useEffect, useState } from "react"
import styled from "styled-components"
import PostCard from "./PostCard"
import {getPost} from "../../services/linktrAPI"

export default function TimelinePage(){

    const [posts, setPosts] = useState([])
    const [message, setMessage] = useState("Loading...")

    useEffect(() => {

        const promise = getPost()
        promise.then(res => {
            setPosts(res.data)
            if(posts.length < 1){
                setMessage("There are no post yet")
            }
        })

        promise.catch(err =>{
            setMessage("An error occured while trying to fetch the posts, please refresh the page")
        })
    }, [])


    return(
        <Container> 
            <div className="content">
                <h1>timeline</h1>
                {posts.length === 0 ? <h6>{message}</h6>
                :
                posts.map((item, index) => <PostCard
                key = {index}
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