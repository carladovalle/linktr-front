import styled from "styled-components"
import notImage from "../../Common/404.jpeg"

export default function PostCard({userImg, name, text, urlInfos}){

    if(!urlInfos.image){
        urlInfos.image = notImage 
    }

    return(
        <Container>
            <img src={userImg} alt="profile-img"/>
            <span className="infos">
                <h4>{name}</h4>
                <h5>{text}</h5>
                <LinkCard onClick={() => window.open(urlInfos.url)}>
                    <div>
                        <h2>{urlInfos.title}</h2>
                        <h3>{urlInfos.description}</h3>
                        <p>{urlInfos.url}</p>
                    </div>
                    <img src={urlInfos.image} alt=""/>
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

    .infos{
        width: 100%;
        margin-left: 18px;
        margin-top: 2px;
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